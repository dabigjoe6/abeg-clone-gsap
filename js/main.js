gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const init = () => {
  const ELEMENT_DURATION = 0.05;
  window.scrollTo({ top: 0 });

  // Elements
  const sections = document.querySelectorAll(".sections");
  const circles = document.querySelectorAll(".section-2 .image-wrapper span");
  const progressEl = document.querySelector(".footer-progress");
  const dots = document.querySelectorAll(".dot");

  // Timelines
  const circleTimeline = gsap.timeline({
    delay: 3,
  });

  // Swaps the current and next/prev section on the viewport
  let currentSection = 0;
  let prevSection = 0;

  // Set properties of section in viewport using GSAP on first page load
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

  gsap.set(sections[currentSection].querySelector(".image-wrapper"), {
    y: "100px",
  });

  Array.from(sections)
    .slice(1)
    .forEach((section) => {
      gsap.set(section.querySelectorAll("h1"), {
        y: 100,
      });

      gsap.set(section.querySelector("p"), {
        y: 100,
        opacity: 0,
      });
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

  // Animations
  const toggleContentBackground = (state) => {
    if (state !== "prev") {
      gsap.to(".section-5 .content-background", {
        width: "80%",
        duration: 0.5,
      });
    } else {
      gsap.to(".section-5 .content-background", {
        width: "0%",
        duration: 0.5,
      });
    }
  };

  const toggleImageProps = (state) => {
    const imgPropsAnim = gsap.to(".section-1 .section-image .image-props img", {
      height: 160,
      scale: state === "prev" ? ELEMENT_DURATION : 1,
      opacity: state === "prev" ? 0 : 1,
      duration: 1,
      stagger: ELEMENT_DURATION,
      ease: "elastic.inOut(1.2, 0.75)",
      paused: true,
      delay: state !== "prev" && 1,
    });

    imgPropsAnim.restart(true);
  };

  const toggleCircles = (state) => {
    circleTimeline.clear();
    if (state !== "prev") {
      circles.forEach((circle, index) => {
        let circleAnim = gsap.to(circle, {
          scale: 0.5 + index,
          stagger: true,
          duration: 2,
          opacity: 1,
          ease: "elastic.out(1.2, 0.75)",
        });

        circleTimeline.add(circleAnim, `<${ELEMENT_DURATION}`);
      });
    } else {
      for (let index = circles.length - 1; index > 0; --index) {
        let circleAnim = gsap.to(circles[index], {
          scale: 0,
          stagger: true,
          duration: 2,
          opacity: 1,
          ease: "elastic.out(1.2, 0.75)",
        });

        circleTimeline.add(circleAnim, `<${ELEMENT_DURATION}`);
      }
    }

    circleTimeline.play();
  };

  const sectionOutAnim = (sectionIndex) => {
    return gsap
      .timeline()
      .to(
        sections[sectionIndex].querySelectorAll("h1"),
        {
          y: 100,
          duration: ELEMENT_DURATION,
          onComplete: () => {
            if (sectionIndex === 4) {
              toggleContentBackground("prev");
            }
          },
        },
        0
      )
      .to(
        sections[sectionIndex].querySelector("p"),
        {
          y: 100,
          opacity: 0,
          duration: ELEMENT_DURATION,
        },
        0
      )
      .to(
        sections[sectionIndex].querySelector(".image-wrapper .hand-and-phone"),
        {
          rotate: 0,
          duration: 0.5,
          onComplete: () => {
            if (sectionIndex === 1) {
              toggleCircles("prev");
            }
          },
        },
        0.5
      )
      .to(
        sections[sectionIndex].querySelector(".image-wrapper"),
        {
          y: 100,
          opacity: 0,
          ease: "power4.out",
          duration: 1,
        },
        0.5
      )
      .to(
        sections[sectionIndex],
        {
          opacity: 0,
          duration: ELEMENT_DURATION,
        },
        ">"
      );
  };

  const sectionInAnim = (sectionIndex) => {
    return gsap
      .timeline()
      .to(
        sections[sectionIndex],
        {
          opacity: 1,
          duration: ELEMENT_DURATION,
        },
        ">+0.5"
      )
      .to(
        sections[sectionIndex].querySelectorAll("h1"),
        {
          y: 0,
          duration: ELEMENT_DURATION,
          onStart: () => {
            if (sectionIndex === 4) {
              toggleContentBackground("curr");
            }
          },
        },
        ">"
      )
      .to(
        sections[sectionIndex].querySelector("p"),
        {
          keyframes: [
            { y: 0, duration: ELEMENT_DURATION },
            {
              opacity: 1,
              duration: ELEMENT_DURATION,
              delay: -ELEMENT_DURATION,
            },
          ],
        },
        ">"
      )
      .to(
        sections[sectionIndex].querySelector(".image-wrapper"),
        {
          opacity: 1,
          y: 0,
          ease: "power4.out",
          // opacity: 1,
          duration: 1,
          onStart: () => {
            if (sectionIndex === 1) {
              toggleCircles("current");
            }
          },
        },
        ">"
      )
      .to(
        sections[sectionIndex].querySelector(".image-wrapper .hand-and-phone"),
        {
          rotate: -15,
          duration: 0.5,
        },
        ">-1"
      );
  };

  const animateSections = () => {
    const timeline = gsap.timeline();

    timeline.timeScale(2);

    const prevTimeline = gsap.timeline();
    const currentTimeline = gsap.timeline();

    dots[prevSection].classList.remove("active");
    dots[currentSection].classList.add("active");

    if (prevSection === 0 || currentSection === 0) {
      toggleImageProps(prevSection === 0 ? "prev" : "current");
    }

    tempPrevSection = prevSection;

    prevSection = currentSection;

    timeline
      .add(sectionOutAnim(tempPrevSection))
      .add(sectionInAnim(currentSection));
  };

  const setProgress = () => {
    const percent = (currentSection / (sections.length - 1)) * 100;
    progressEl.style.width = percent + "%";
  };

  //Jump to next/prev section when user scrolls
  window.addEventListener("wheel", (e) => {
    const callback = () => {
      let delta = e.deltaY;

      if (delta > 0) {
        if (currentSection < sections.length) {
          currentSection += 1;
          jumpToSection();
        }
      } else {
        if (currentSection > 0) {
          currentSection -= 1;
          jumpToSection();
        }
      }
    };
    let t = throttle(callback, 2000);
    t();
  });

  disableScroll();

  const jumpToSection = () => {
    setProgress(currentSection);
    gsap.to(window, {
      duration: 2.5,
      scrollTo: {
        y: 100 * currentSection,
      },
      ease: "elastic.out(1.75, 0.3)",
      onStart: () => {
        enableScroll(); // Enable scroll on animation start
        setTimeout(() => {
          disableScroll();
          animateSections();
        }, 850);
      },
    });
  };

  //Jump to a section when each dot is clicked
  dots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      currentSection = index;
      jumpToSection();
    });
  });

  gsap.set(".lines", { x: "-5%" });
  const scrollAnim = gsap.to(".lines", { x: "-50%", ease: "none" });

  ScrollTrigger.create({
    trigger: ".container",
    animation: scrollAnim,
    pin: true,
    scrub: 1,
    pinSpacing: false,
    anticipatePin: 1,
  });
};

initGsap = init();
window.onload = initGsap;
