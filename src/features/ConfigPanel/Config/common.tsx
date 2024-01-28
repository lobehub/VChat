import { useConfigStore } from '@/store/config';
import { CheckCard } from '@ant-design/pro-card';
import {
  Form,
  FormGroup,
  FormItem,
  PrimaryColors,
  Swatches,
  findCustomThemeName,
} from '@lobehub/ui';
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
  effect: css`
    margin-bottom: 0;
    width: 120px;
  `,
}));

const CommonConfig = (props: CommonConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [primaryColor, backgroundEffect] = useConfigStore((s) => [
    s.config.primaryColor,
    s.config.backgroundEffect,
  ]);
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
                const name = findCustomThemeName('primary', color) as PrimaryColors;
                setConfig({ primaryColor: name || '' });
              }}
            />
          </FormItem>
          <FormItem
            desc={'自定义桌面粒子效果'}
            divider
            label={'粒子特效'}
            name={'backgroundEffect'}
          >
            <CheckCard.Group
              size="small"
              value={backgroundEffect}
              onChange={(value) => {
                setConfig({ backgroundEffect: value || 'none' });
              }}
            >
              <CheckCard title="🌸 落樱缤纷" value="sakura" className={styles.effect} />
              <CheckCard title="❄️ 冰雪王国" value="snow" className={styles.effect} />
              <CheckCard title="✨ 仰望星空" value="star" className={styles.effect} />
              <CheckCard title="🙌 无效果" value="none" className={styles.effect} />
            </CheckCard.Group>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommonConfig;
