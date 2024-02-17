import { useConfigStore } from '@/store/config';
import { useThemeStore } from '@/store/theme';
import { CheckCard } from '@ant-design/pro-card';
import {
  Form,
  FormGroup,
  FormItem,
  PrimaryColors,
  Swatches,
  findCustomThemeName,
} from '@lobehub/ui';
import { ThemeMode, createStyles, useTheme } from 'antd-style';
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
    width: 160px;
  `,
}));

const CommonConfig = (props: CommonConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [primaryColor] = useConfigStore((s) => [s.config.primaryColor]);
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
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
          <FormItem desc={'自定义主题模式'} divider label={'主题模式'} name={'themeMode'}>
            <CheckCard.Group
              size="small"
              value={themeMode}
              onChange={(value) => {
                setThemeMode(value as ThemeMode);
              }}
            >
              <CheckCard title="🔆 亮色模式" value="light" className={styles.effect} />
              <CheckCard title="🌙 暗色模式" value="dark" className={styles.effect} />
              <CheckCard title="💻 跟随系统" value="auto" className={styles.effect} />
            </CheckCard.Group>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default CommonConfig;
