gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

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
  // const sections = document.querySelectorAll(".sections");

  // const container = document.querySelector(".container");

  const timeline = gsap.timeline();

  // let scrollTween;

  // const jumpToSection = (index) => {
  //   console.log("I was called", index);
  //   scrollTween = gsap.to(window, {
  //     // scrollTo: { x: index * innerWidth, autoKill: false },
  //     scrollTo: { x: -100 },
  //     duration: 1,
  //     onComplete: () => (scrollTween = null),
  //     overwrite: true,
  //   });
  // };

  const scrollAnim = timeline
    .to(".lines", { x: "-40%", ease: "none" }, 0)

  //Jump to a section when each dot is clicked
  dots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
      console.log("i got here", e.target.getAttribute("href"));
      console.log('width', innerWidth * (index / 2))
      e.preventDefault();
      gsap.to(window, {
        duration: 2.5,
        scrollTo: {
          y: 100 * index,
          autoKill: true,
        },
        ease: 'elastic.out(1.75, 0.3)'
      });
    });
  });

  // console.log('sectiln', sections[0].querySelector('h1'))
  // gsap.set(sections[0].querySelector('h1'), {yPercent: 0});
  // gsap.set(sections[0].querySelector('p'), {yPercent: 0, opacity: 1});
  // gsap.set(sections[0].querySelectorAll('img'), {height: 160, scale: 1});
  // sections.forEach((section, index) => {
  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: section,
  //       scrub: true,
  //       // onEnter: () => {
  //       //   setActiveSection(index);
  //       //   setActiveSection(index);
  //       //   setProgress(index);
  //       // },
  //       // onEnterBack: () => {
  //       //   setActiveSection(index);
  //       //   setActiveSection(index);
  //       //   setProgress(index);
  //       // },
  //       // containerAnimation: scrollAnim,
  //       // toggleActions: "play reverse play play",
  //       // start: "center bottom",
  //       // end: "center center-=100px",
  //       markers: true,
  //       onToggle: (self) => {
  //         console.log("toggle", index, self.isActive);
  //         if (self.isActive) {
  //           setActiveSection(index);
  //           setProgress(index);
  //           // if (!scrollTween) {
  //           //   jumpToSection(index);
  //           // }
  //         } else {
  //           removeActiveSection(index);
  //         }
  //       },
  //     },
  //   });
  //   // .fromTo(
  //   //   section.querySelectorAll("h1"),
  //   //   { yPercent: 100 },
  //   //   {
  //   //     yPercent: 0,
  //   //     duration: 0.5,
  //   //   },
  //   //   0
  //   // )
  //   // .fromTo(
  //   //   section.querySelector("p"),
  //   //   { opacity: 0 },
  //   //   { duration: 0.1, opacity: 1 },

  //   // )
  //   // .fromTo(
  //   //   section.querySelector("p"),
  //   //   { yPercent: 100, },
  //   //   { yPercent: -10, duration: 0.1 }
  //   // );

  //   if (index === 0) {
  //     gsap.to(".section-1 .section-image .image-props img", {
  //       height: 160,
  //       scale: 1,
  //       duration: 1.5,
  //       stagger: 0.1,
  //       ease: "elastic.inOut(1, 0.4)",
  //       scrollTrigger: {
  //         trigger: section,
  //         toggleActions: "play reverse play play",
  //         containerAnimation: scrollAnim,
  //         start: "top-=10px end",
  //         end: "bottom center+=400px",
  //       },
  //     });
  //   }
  // });

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
