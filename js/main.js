gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

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
  // const setActiveSection = (index) => {
  //   //add active class to updated current dot
  //   dots[index].classList.add("active");
  //   sections[index].classList.add("active");
  // };

  // const removeActiveSection = (index) => {
  //   //remove active class from current dot
  //   dots[index].classList.remove("active");
  //   sections[index].classList.remove("active");
  // };

  // const progressEl = document.querySelector(".footer-progress");

  // const setProgress = (index) => {
  //   const percent = (index / (sections.length - 1)) * 100;
  //   progressEl.style.width = percent + "%";
  // };

  const dots = document.querySelectorAll(".dot");
  const sections = document.querySelectorAll(".sections");

  let currentSection = 0;

  let lastScrollTop = 0;

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
  
  
      }
      let t = throttle(callback, 1500);
      t();
    }  );

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

  const timeline = gsap.timeline();

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
        }, 800);
      },
    });
  };

  const scrollAnim = timeline.to(".lines", { x: "-40%", ease: "none" }, 0);

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
    // snap: 1 / (sections.length - 1),
    // onUpdate: (update) => {
    //   if (update.progress in activeMap) {
    //     setActiveSection(update.progress);
    //     setProgress(update.progress);
    //   }
    // },
  });
};

initGsap = init();
window.onload = initGsap;
