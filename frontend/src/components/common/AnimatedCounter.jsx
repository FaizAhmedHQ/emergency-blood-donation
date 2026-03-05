import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const increment = to / (duration * 50); // 50 updates per second
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= to) {
          clearInterval(timer);
          return to;
        }
        return Math.min(prev + increment, to);
      });
    }, 20);

    return () => clearInterval(timer);
  }, [to, duration]);

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      {Math.floor(count)}
    </motion.span>
  );
};

export default AnimatedCounter;