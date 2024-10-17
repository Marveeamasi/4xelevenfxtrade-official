'use client'
import React, { useState, useEffect, useRef } from 'react';

function CountUp({ endValue, duration = 2000 , sign, isAdmin }) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentCount = Math.round(progress * endValue);
      setCount(currentCount);

      if (elapsedTime >= duration) {
        clearInterval(intervalId);
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [endValue, duration]);

  const formattedCount = count.toLocaleString('en-US');

  return (
    <div className={isAdmin? 'font-extrabold text-[#ddd] text-center': 'text-3xl max-sm:text-5xl max-xsm:text-3xl font-extrabold text-[#ddd] text-center'}>{sign+formattedCount}</div>
  );
}

export default CountUp;
