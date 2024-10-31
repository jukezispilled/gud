import React from 'react';
import { motion } from 'framer-motion';

const MoneyRain = () => {
  const totalDuration = 7; // Total time for one complete cycle
  const rainElements = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: Math.random() * 100,
    // Evenly space out the delays across the total duration
    delay: (index * totalDuration) / 20,
    duration: 5, // Fixed duration for consistency
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {rainElements.map(({ id, initialX, duration, delay }) => (
        <motion.div
          key={id}
          className="absolute size-20 md:size-32"
          initial={{ 
            x: `${initialX}vw`,
            y: -100
          }}
          animate={{
            y: '120vh'
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <img 
            src="money.gif" 
            alt="money"
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MoneyRain;