import { voicesApi } from '@/services/tts';
import { FormFooter } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Form, Input, Select } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { voices } from './voices';

const FormItem = Form.Item;

const setting = {
  type: 'MicroSoft',
  language: 'zh-CN',
  voice: 'zh-CN-XiaoyiNeural',
  text: '正在为你准备我的整个世界',
};

interface ConfigProps {
  style?: React.CSSProperties;
  className?: string;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
  `,
  text: css`
    flex: 2;
    margin-right: 12px;
  `,
  config: css`
    padding: 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
  `,
}));

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = Form.useForm();

  const { loading, data: list, run: getVoiceList } = useRequest(voicesApi, { manual: true });

  return (
    <Form initialValues={setting} onFinish={console.table} layout="vertical" form={form}>
      <div style={style} className={classNames(className, styles.container)}>
        <div className={styles.text}>
          <FormItem name="text" noStyle>
            <Input.TextArea placeholder="请输入要转换的文字" rows={20} />
          </FormItem>
        </div>
        <div style={style} className={classNames(styles.config)}>
          <FormItem label={'接口'} name="type">
            <Select
              options={[
                {
                  label: 'MicroSoft 语音接口',
                  value: 'MicroSoft',
                },
                {
                  label: 'Azure 语音接口',
                  value: 'Azure',
                },
              ]}
              defaultValue={'MicroSoft'}
            />
          </FormItem>
          <FormItem label={'语言'} name="language">
            <Select
              options={[
                {
                  label: '中文',
                  value: 'zh-CN',
                },
                {
                  label: '日语(日本)',
                  value: 'ja-JP',
                },
                {
                  label: '英语(美国)',
                  value: 'en-US',
                },
              ]}
            />
          </FormItem>
          <FormItem noStyle dependencies={['language']}>
            {() => {
              const language = form.getFieldValue('language');

              return (
                <FormItem label={'语音'} name="voice">
                  <Select
                    options={voices
                      .filter((voice) => voice.locale === language)
                      .map((item) => ({
                        label: `${item.properties.DisplayName}-${item.properties.LocalName}`,
                        value: item.shortName,
                      }))}
                  />
                </FormItem>
              );
            }}
          </FormItem>
          <FormFooter>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              重置
            </Button>
            <Button htmlType="submit" type="primary">
              转换
            </Button>
            <Button type="primary" onClick={() => getVoiceList()} loading={loading}>
              获取语音列表
            </Button>
          </FormFooter>
        </div>
      </div>
    </Form>
  );
};

export default Config;
