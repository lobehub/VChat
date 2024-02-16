import { useStyles } from './style';

const Background = () => {
  const { styles } = useStyles();
  return <div className={styles.canvas}></div>;
};

export default Background;
