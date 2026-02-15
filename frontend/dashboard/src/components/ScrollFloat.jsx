import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const getTextFromChildren = (children) => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getTextFromChildren).join('');
  if (children && typeof children === 'object' && children.props?.children) {
    return getTextFromChildren(children.props.children);
  }
  return '';
};

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  scrub = true
}) => {
  const containerRef = useRef(null);

const splitText = useMemo(() => {
  const text = getTextFromChildren(children);
  return text.split('').map((char, index) => (
    <span className="inline-block word" key={index}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
}, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.inline-block');

    const scrollTrigger = {
      trigger: el,
      scroller,
      start: scrollStart,
      end: scrollEnd,
      scrub
    };

    if (!scrub) {
      scrollTrigger.toggleActions = 'play none none reverse';
    }

    const tween = gsap.fromTo(charElements, {
      willChange: 'opacity, transform',
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%'
    }, {
      duration: animationDuration,
      ease: ease,
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      stagger: stagger,
      scrollTrigger
    });

    return () => tween.kill();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2
      ref={containerRef}
      className={`my-5 overflow-hidden ${containerClassName}`}>
      <span
        className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
