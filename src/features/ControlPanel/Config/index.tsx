import { useConfigStore } from '@/store/config';
import { Form, FormFooter, FormGroup, FormItem } from '@lobehub/ui';
import { Button, Input, Select } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import { BotIcon } from 'lucide-react';

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
  const { setSetting, setting } = useConfigStore();
  return (
    <div style={style} className={classNames(styles.config, className)}>
      <Form
        initialValues={setting}
        onValuesChange={debounce(setSetting, 100)}
        style={{ display: 'flex', flexGrow: 1 }}
      >
        {/* @ts-ignore */}
        <FormGroup icon={BotIcon} title={'OpenAI 模型设置'}>
          <FormItem desc={'Chat GPT 模型'} label={'模型'} name="model">
            <Select
              style={{ width: 140 }}
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
          <FormItem desc={'请使用自己的 OpenAI Key'} divider label={'API Key'} name="apikey">
            <Input placeholder="sk-" style={{ width: 240 }} />
          </FormItem>
          <FormItem desc={'http(s)://'} divider label={'接口代理地址'} name="endpoint">
            <Input placeholder="" style={{ width: 240 }} />
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
