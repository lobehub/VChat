import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { useConfigStore } from '@/store/config';
import { Form, FormGroup, FormItem } from '@lobehub/ui';
import { Form as AForm, Input, Select, Tag } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { debounce, isEqual } from 'lodash-es';
import { BotIcon } from 'lucide-react';
import { useEffect } from 'react';

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
  const [form] = AForm.useForm();
  const setting = useConfigStore((s) => s.setting, isEqual);
  const setSetting = useConfigStore((s) => s.setSetting);

  useEffect(() => {
    form.setFieldsValue(setting);
  }, [setting, form]);

  return (
    <div style={style} className={classNames(styles.config, className)}>
      <Form
        form={form}
        onValuesChange={debounce(setSetting, 100)}
        style={{ display: 'flex', flexGrow: 1 }}
      >
        {/* @ts-ignore */}
        <FormGroup icon={BotIcon} title={'语言模型'}>
          <FormItem desc={'Chat GPT 模型'} label={'模型'} name="model">
            <Select
              style={{ width: 280 }}
              options={OPENAI_MODEL_LIST.map((model) => ({
                label: (
                  <>
                    {model.name} <Tag color="green">{model.maxToken}</Tag>
                  </>
                ),
                value: model.name,
              }))}
            />
          </FormItem>
          <FormItem desc={'请使用自己的 OpenAI Key'} divider label={'API Key'} name="apikey">
            <Input placeholder="sk-" style={{ width: 440 }} />
          </FormItem>
          <FormItem desc={'http(s)://'} divider label={'接口代理地址'} name="endpoint">
            <Input placeholder="" style={{ width: 320 }} />
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Config;
