gsap.registerPlugin(ScrollTrigger);

gsap.from(".section-1 .section-image .image-props img", {
  height: 0,
  scale: 0,
  duration: 1.5,
  stagger: 0.1,
  ease: "elastic.inOut(1, 0.4)",
});

const timeline = gsap.timeline();

timeline.fromTo('.lines', {x: 0}, {x: '-60%', ease: "bounce.out" })



ScrollTrigger.create({
  trigger: '.container',
  animation: timeline,
  pin: true,
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  markers: true,
  pinSpacing: false,
  snap: 1 / (6 - 1)
})

