import { useConfigStore } from '@/store/config';
import { Form, FormGroup, FormItem, Swatches } from '@lobehub/ui';
import { createStyles, useTheme } from 'antd-style';
import classNames from 'classnames';
import { Settings2 } from 'lucide-react';

interface CommonConfigProps {
  style?: React.CSSProperties;
  className?: string;
}

const useStyles = createStyles(({ css }) => ({
  config: css`
    justify-content: center;
    display: flex;
    flex-grow: 1;
  `,
}));

const CommonConfig = (props: CommonConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [primaryColor] = useConfigStore((s) => [s.config.primaryColor]);
  const setConfig = useConfigStore((s) => s.setConfig);
  const theme = useTheme();

  return (
    <div style={style} className={classNames(styles.config, className)}>
      <Form style={{ display: 'flex', flexGrow: 1 }}>
        <FormGroup icon={Settings2} title={'主题设置'}>
          <FormItem desc={'主题色'} divider label={'自定义主题色'} name={'primaryColor'}>
            <Swatches
              activeColor={primaryColor}
              colors={[
                theme.red,
                theme.orange,
                theme.gold,
                theme.yellow,
                theme.lime,
                theme.green,
                theme.cyan,
                theme.blue,
                theme.geekblue,
                theme.purple,
                theme.magenta,
                theme.volcano,
              ]}
              onSelect={(color: any) => {
                setConfig({ primaryColor: color });
              }}
            />
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommonConfig;
