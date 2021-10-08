gsap.registerPlugin(ScrollTrigger);

const activeMap = {
  0: 0,
  0.2: 1,
  0.4: 2,
  0.6: 3,
  0.8: 4,
  1: 5
}

const dots = document.querySelectorAll('.dot');
let currentActiveDot = 0;


gsap.from(".section-1 .section-image .image-props img", {
  height: 0,
  scale: 0,
  duration: 1.5,
  stagger: 0.1,
  ease: "elastic.inOut(1, 0.4)",
});

const timeline = gsap.timeline();

timeline.fromTo('.lines', {x: '0%'}, {x: '-40%', ease: "bounce.out" })



ScrollTrigger.create({
  trigger: '.container',
  animation: timeline,
  pin: true,
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  markers: true,
  pinSpacing: false,
  anticipatePin: 1,
  snap: 1 / (6 - 1),
  onUpdate: (update) => {
    if (update.progress in activeMap) {
      setActiveDot(update.progress)
    }
  }
})



const setActiveDot = (progress) => {
  //remove active class from current dot
  dots[currentActiveDot].classList.remove('active');
  //update active dot
  currentActiveDot = activeMap[progress];
  //add active class to updated current dot
  dots[currentActiveDot].classList.add('active');
}