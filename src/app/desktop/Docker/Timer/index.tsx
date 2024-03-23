'use client';

import { useInterval } from 'ahooks';
import { useState } from 'react';
import { useStyles } from './style';

const Timer = () => {
  const { styles } = useStyles();
  const [time, setTime] = useState(Date.now());
  const [date, setDate] = useState(new Date().getFullYear());

  useInterval(() => {
    setTime(Date.now());
    setDate(new Date().getFullYear());
  }, 1000);

  return (
    <div className={styles.timer}>
      <div className={styles.time}>{time}</div>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

export default Timer;
