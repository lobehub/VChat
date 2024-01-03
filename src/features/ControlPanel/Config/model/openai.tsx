import { OPENAI_MODEL_LIST } from '@/constants/openai';
import { chatCompletion } from '@/services/chat';
import { configSelectors, useConfigStore } from '@/store/config';
import { Form, FormGroup, FormItem } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Form as AForm, Button, Input, Select, Tag, message } from 'antd';
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
    display: flex;
    flex-grow: 1;
  `,
}));

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = AForm.useForm();
  const openAIConfig = useConfigStore((s) => configSelectors.currentOpenAIConfig(s), isEqual);
  const setOpenAIConfig = useConfigStore((s) => s.setOpenAIConfig);

  useEffect(() => {
    form.setFieldsValue(openAIConfig);
  }, [openAIConfig, form]);

  const { loading, run: checkConnect } = useRequest(chatCompletion, {
    manual: true,
    onSuccess: (res) => {
      if (!res.ok) {
        message.error('调用接口失败，请检查 APIKey 和接口代理地址是否设置正确');
        return;
      }
      message.success('检查通过');
    },
  });

  return (
    <div style={style} className={classNames(styles.config, className)}>
      <Form
        form={form}
        onValuesChange={debounce(setOpenAIConfig, 100)}
        style={{ display: 'flex', flexGrow: 1 }}
      >
        {/* @ts-ignore */}
        <FormGroup icon={BotIcon} title={'OpenAI 语言模型'}>
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
          <FormItem desc={'检查 APIKey 和接口代理地址是否设置正确'} divider label={'连通性检查'}>
            <Button
              loading={loading}
              onClick={() =>
                checkConnect({
                  messages: [
                    {
                      content: 'Hi',
                      role: 'user',
                    },
                  ],
                })
              }
            >
              检查
            </Button>
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Config;
