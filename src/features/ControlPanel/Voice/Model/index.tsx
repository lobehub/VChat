import { TextArea } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import Config from './Config';

const useStyles = createStyles(({ css }) => ({
  container: css`
    position: relative;
    display: flex;
    width: 100%;
    height: auto;
    min-height: 500px;
  `,
}));

interface ModelProps {
  style?: React.CSSProperties;
  className?: string;
}

const Model = (props: ModelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <TextArea placeholder="请输入要转换的文字" style={{ flex: 2, marginRight: 12 }} />
      <Config />
    </div>
  );
};

export default Model;
