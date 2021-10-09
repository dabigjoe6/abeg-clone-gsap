const init = () => {
  gsap.registerPlugin(ScrollTrigger);

  const activeMap = {
    0: 0,
    0.2: 1,
    0.4: 2,
    0.6: 3,
    0.8: 4,
    1: 5,
  };

  const progressMap = {
    0: "0%",
    0.2: "17%",
    0.4: "34%",
    0.6: "51%",
    0.8: "68%",
    1: "85%",
  };

  const dots = document.querySelectorAll(".dot");
  const progressEl = document.querySelector(".footer-progress");
  const sections = document.querySelectorAll(".sections");

  let currentActiveDot = 0;

  //Jump to a section when each dot is clicked
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      window.scrollTo({
        top: ((Number(dot.innerHTML) * 10) / 2) * 633.83,
        left: 0,
        behavior: "smooth",
      });
    });
  });

  // sections.forEach((section, index) => {
  //   gsap.to(section, {
  //     scrollTrigger: {
  //       trigger: section,
  //       onEnter: () => setActiveDot(index),
  //       onLeave: () => removeActiveDot(index),
  //     },
  //   });
  // });

  gsap.from(".section-1 .section-image .image-props img", {
    height: 0,
    scale: 0,
    duration: 1.5,
    stagger: 0.1,
    ease: "elastic.inOut(1, 0.4)",
  });

  const timeline = gsap.timeline();

  const scrollAnim = timeline
    .to(".lines", { x: '-40%', ease: "none" }, 0)
    .to(".container", { x: `${-100 * (sections.length - 1)}vw`, ease: "none" }, 0);

  ScrollTrigger.create({
    trigger: ".container",
    animation: scrollAnim,
    pin: true,
    // start: "top top",
    end: `bottom+=600% bottom`,
    scrub: 2,
    markers: true,
    pinSpacing: false,
    anticipatePin: 1,
    // snap: 1 / (sections.length - 1),
    // onUpdate: (update) => {
    //   if (update.progress in activeMap) {
    //     setActiveDot(update.progress);
    //     setProgress(update.progress);
    //   }
    // },
  });

  const setActiveDot = (index) => {
    //remove active class from current dot
    // dots[currentActiveDot].classList.remove("active");
    // dots[index].classList.remove("active");

    //update active dot
    // currentActiveDot = activeMap[progress];

    //add active class to updated current dot
    // dots[currentActiveDot].classList.add("active");
    dots[index].classList.add("active");
  };

  const removeActiveDot = (index) => {
    dots[index].classList.remove("active");
  };

  const setProgress = (progress) => {
    progressEl.style.width = progressMap[progress];
  };
};

initGsap = init();
window.onload = initGsap;
