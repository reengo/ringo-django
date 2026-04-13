import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

function Section({ id, className, children, bg }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const y = useSpring(rawY, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section id={id} className={className} ref={ref}>
      {bg && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-15%',
            left: 0,
            right: 0,
            bottom: '-15%',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
            y,
          }}
        />
      )}
      {bg ? <div style={{ position: 'relative' }}>{children}</div> : children}
    </section>
  );
}

export default Section;
