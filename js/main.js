gsap.registerPlugin(ScrollTrigger);

const init = () => {
  let currentActiveSection = 0;

  const setActiveSection = (index) => {
    //remove active class from current dot
    dots[currentActiveSection].classList.remove("active");
    sections[currentActiveSection].classList.remove('active');

    //update active dot
    currentActiveSection = index;
    

    //add active class to updated current dot
    dots[currentActiveSection].classList.add("active");
    sections[currentActiveSection].classList.add("active");
  };


  const progressEl = document.querySelector(".footer-progress");

  const setProgress = (index) => {
    const percent = (index / (sections.length - 1)) * 100;
    progressEl.style.width = percent + "%";
  };

  const dots = document.querySelectorAll(".dot");
  const sections = document.querySelectorAll(".sections");

  const timeline = gsap.timeline();

  const scrollAnim = timeline
    .to(".lines", { x: "-40%", ease: "none" }, 0)
    .to(
      ".container",
      { x: () => `${-100 * (sections.length - 1)}vw`, ease: "none" },
      0
    );

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

  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      onEnter: () => {
        setActiveSection(index);
        setActiveSection(index);
        setProgress(index);
      },
      onEnterBack: () => {
        setActiveSection(index);
        setActiveSection(index);
        setProgress(index);
      },
      containerAnimation: scrollAnim,
      start: "top-=50px top",
      end: "bottom bottom",
      markers: true,
    });
  });

  gsap.from(".section-1 .section-image .image-props img", {
    height: 0,
    scale: 0,
    duration: 1.5,
    stagger: 0.1,
    ease: "elastic.inOut(1, 0.4)",
  });

  ScrollTrigger.create({
    trigger: ".container",
    animation: scrollAnim,
    pin: true,
    // start: "top top",
    end: `bottom+=600% bottom`,
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
