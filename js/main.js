gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(CSSRulePlugin);

//TODO: Tie image wrapper to timeline animations and not scroll trigger

let lastTime = 0;

function throttle(func, timeFrame) {
  return function () {
    var now = Date.now();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}

const init = () => {
  const sections = document.querySelectorAll(".sections");

  const circles = document.querySelectorAll(".section-2 .image-wrapper span");

  let currentSection = 0;
  let prevSection = 0;

  const timeline = gsap.timeline();


  const scrollAnim = timeline.to(".lines", { x: "-40%", ease: "none" }, 0);

  const circleTimeline = gsap.timeline({
    delay: 5
  });



  gsap.set(sections[currentSection], {
    opacity: 1,
  });

  gsap.set(sections[currentSection].querySelectorAll("h1"), {
    y: 0,
  });
  gsap.set(sections[currentSection].querySelector("p"), {
    y: 0,
    opacity: 1,
  });

  circles.forEach((circle, index) => {
    gsap.set(circle, {
      height: 105,
      width: 105,
      borderRadius: 105 / 2,
      borderWidth: "0.5px",
      opacity: index === 0 ? 1 : 1 / (index + 0.5),
      borderStyle: "solid",
      scale: 1,
    });
  });

  const toggleContentBackground = (state) => {
    if (state !== 'prev') {
      gsap.to('.section-5 .content-background', {
        width: '80%',
        duration: 0.5
      });
    } else {
      gsap.to('.section-5 .content-background', {
        width: '0%',
        duration: 0.5
      })
    }
  
  }

  const toggleImageProps = (state) => {
    const imgPropsAnim = gsap.to(".section-1 .section-image .image-props img", {
      height: 160,
      scale: state === 'prev' ? 0.1 : 1,
      opacity: state === 'prev' ? 0 : 1,
      duration: 2,
      stagger: 0.1,
      ease: "elastic.inOut(1.75, 0.3)",
      paused: true,
      delay: state !== 'prev' && 1.5
    })

    imgPropsAnim.restart(true);
  }

  const toggleCircles = (state) => {
    circleTimeline.clear();
    if (state !== 'prev') {
      circles.forEach((circle, index) => {
        let circleAnim = gsap.to(circle, {
          scale: 0.5 + index,
          stagger: true,
          duration: 2,
          opacity: 1,
          ease: "elastic.out(1.2, 0.75)",
          // paused: true
        });
  
        circleTimeline.add(circleAnim, "<0.1");
  
    
      });
    } else {
      for (let index = circles.length - 1; index > 0; --index) {
        let circleAnim = gsap.to(circles[index], {
          scale:0,
          stagger: true,
          duration: 2,
          opacity: 1,
          ease: "elastic.out(1.2, 0.75)",
          // paused: true
        });
  
        circleTimeline.add(circleAnim, "<0.1");
      }
    }
   

    circleTimeline.play();
  }
  const setActiveSection = (index) => {
    const timeline = gsap.timeline();

    //add active class to updated current dot
    dots[prevSection].classList.remove("active");
    dots[index].classList.add("active");

    if (prevSection === 0 || currentSection === 0) {
      toggleImageProps(prevSection === 0 ? 'prev' : 'current');
    }

    timeline
      .to(
        sections[prevSection].querySelectorAll("h1"),
        {
          y: 100,
          duration: 0.1,
          onComplete: () => {
            toggleContentBackground('prev')
          }
        },
        0
      )
      .to(
        sections[prevSection].querySelector("p"),
        {
          y: 100,
          opacity: 0,
          duration: 0.1,
        },
        0
      )
      .to(sections[prevSection].querySelector('.image-wrapper .hand-and-phone'), {
        rotate: 0,
        duration: 0.5,
        onComplete: () => {
          toggleCircles('prev');
        }
      }, 0.5)
      .to(
        sections[prevSection].querySelector(".image-wrapper"),
        {
          y: 100,
          opacity: 0,
          ease: 'power4.out',
          duration: 1,
          
        },
        0.5
      )
      .to(
        sections[prevSection],
        {
          opacity: 0,
          duration: 0.1,
        },
        '>'
      )
      .to(
        sections[currentSection],
        {
          opacity: 1,
          duration: 0.1,
        },
        ">+0.5"
      )
      .to(
        sections[currentSection].querySelectorAll("h1"),
        {
          y: 0,
          duration: 0.1,
          onStart: () => {
            if (currentSection === 4) {
              toggleContentBackground('curr');
            }
          }
        },
        ">"
      )
      .to(
        sections[currentSection].querySelector("p"),
        {
          y: 0,
          duration: 0.1,
        },
        ">"
      )
      .to(
        sections[currentSection].querySelector("p"),
        {
          opacity: 1,
          duration: 0.1,
        },
        ">-0.1"
      )
      .to(
        sections[currentSection].querySelector(".image-wrapper"),
        {
          opacity: 1,
          y: 0,
          ease: 'power4.out',
          // opacity: 1,
          duration: 1,
          onStart: () => {
            // if (prevSection === 1 || currentSection === 1) {
              toggleCircles('current');
            // }
          },
          onComplete: () => {
            prevSection = currentSection;
          },
        },
        ">"
      ).to(sections[currentSection].querySelector('.image-wrapper .hand-and-phone'), {
        rotate: -15,
        duration: 0.5,
      }, '>-1')

    // sections[prevSection].classList.remove('active');
    // sections[index].classList.add("active");
  };

  const progressEl = document.querySelector(".footer-progress");

  const setProgress = (index) => {
    const percent = (index / (sections.length - 1)) * 100;
    progressEl.style.width = percent + "%";
  };

  const dots = document.querySelectorAll(".dot");

  window.addEventListener("wheel", (e) => {
    const callback = () => {
      let delta = e.deltaY;

      if (delta > 0) {
        if (currentSection < 6) {
          currentSection += 1;
          jumpToSection(currentSection);
        }
      } else {
        if (currentSection > 0) {
          currentSection -= 1;
          jumpToSection(currentSection);
        }
      }
    };
    let t = throttle(callback, 1500);
    t();
  });

  const disableScroll = () => {
    // Get the current page scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  };

  disableScroll();

  const enableScroll = () => {
    window.onscroll = () => {};
  };


  const jumpToSection = (index) => {
    gsap.to(window, {
      duration: 2.5,
      scrollTo: {
        y: 100 * index,
      },
      ease: "elastic.out(1.75, 0.3)",
      onStart: () => {
        enableScroll();
        setTimeout(() => {
          disableScroll();
          setActiveSection(currentSection);
          setProgress(currentSection);
        }, 800);
      },
    });
  };


  //Jump to a section when each dot is clicked
  dots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      currentSection = index;
      jumpToSection(index);
    });
  });

  ScrollTrigger.create({
    trigger: ".container",
    animation: scrollAnim,
    pin: true,
    start: "top top",
    end: `bottom+=700% bottom`,
    scrub: 1,
    markers: true,
    pinSpacing: false,
    anticipatePin: 1,
  });
};

initGsap = init();
window.onload = initGsap;
