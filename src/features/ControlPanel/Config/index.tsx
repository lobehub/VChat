import { Form, FormFooter, FormGroup, FormItem } from '@lobehub/ui';
import { Button, Input, InputNumber, Segmented, Select } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { BotIcon, Monitor } from 'lucide-react';

const setting = {
  i18n: 'en',
  model: 'gpt-3.5-turb',
};

interface ConfigProps {
  style?: React.CSSProperties;
  className?: string;
}

const useStyles = createStyles(({ css }) => ({
  config: css`
    justify-content: center;
    padding: 24px;
    display: flex;
    flex-grow: 1;
  `,
}));

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  return (
    <div style={style} className={classNames(styles.config, className)}>
      <Form
        initialValues={setting}
        onFinish={console.table}
        style={{ display: 'flex', flexGrow: 1 }}
      >
        {/* @ts-ignore */}
        <FormGroup icon={Monitor} title={'Common Settings'}>
          <FormItem desc={'Editor language'} label={'Language'} name="i18n">
            <Select
              options={[
                {
                  label: 'English',
                  value: 'en',
                },
                {
                  label: '简体中文',
                  value: 'zh_CN',
                },
              ]}
              style={{ width: 180 }}
            />
          </FormItem>
          <FormItem
            desc={
              'Fixed as grid mode for constant display, auto-expand when the mouse moves to the side in floating mode'
            }
            divider
            label={'Display Mode'}
            name="sidebarFixedMode"
          >
            <Segmented
              options={[
                {
                  label: 'Fixed',
                  value: 'fixed',
                },
                {
                  label: 'Float',
                  value: 'float',
                },
              ]}
            />
          </FormItem>
          <FormItem
            desc={'Default width of the sidebar when starting'}
            divider
            label={'Default Width'}
            name="sidebarWidth"
          >
            <InputNumber />
          </FormItem>
        </FormGroup>
        {/* @ts-ignore */}
        <FormGroup icon={BotIcon} title={'Model Setting'}>
          <FormItem desc={'which gpt model you are using'} label={'GPT Model'} name="model">
            <Select
              options={[
                {
                  label: 'gpt-3.5-turb',
                  value: 'gpt-3.5-turb',
                },
                {
                  label: 'gpt-4',
                  value: 'gpt-4',
                },
              ]}
            />
          </FormItem>
          <FormItem desc={'Please use your own GPT Key'} divider label={'API Key'} name="apikey">
            <Input placeholder="sk-" style={{ width: 480 }} />
          </FormItem>
        </FormGroup>
        <FormFooter>
          <Button htmlType="button">Reset</Button>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </FormFooter>
      </Form>
    </div>
  );
};

export default Config;
