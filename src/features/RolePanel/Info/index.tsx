import { Voice, speechApi, voiceApi } from '@/services/tts';
import { FormFooter } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Form, Input, Select, Slider, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { useRef, useState } from 'react';

const FormItem = Form.Item;

interface Setting {
  type: string;
  language: string;
  voice?: string;
  text: string;
  speed: number;
  pitch: number;
}

const setting: Setting = {
  type: 'edge',
  language: 'zh-CN',
  voice: 'zh-CN-XiaoyiNeural',
  text: '正在为你准备我的整个世界',
  speed: 1,
  pitch: 1,
};

interface InfoProps {
  style?: React.CSSProperties;
  className?: string;
}

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    display: flex;
    flex-direction: column;
  `,
  form: css`
    display: flex;
  `,
  text: css`
    flex: 5;
    margin-right: 12px;
  `,
  config: css`
    padding: 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    flex: 3;
  `,
  footer: css`
    margin-top: 20px;
  `,
}));

const Info = (props: InfoProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const ref = useRef<HTMLAudioElement>(null);
  const [form] = Form.useForm();
  const [voices, setVoices] = useState<Voice[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);

  const { loading, run: speek } = useRequest(speechApi, {
    manual: true,
    onSuccess: (res) => {
      message.success('转换成功');
      const adUrl = URL.createObjectURL(res);
      setAudioUrl(adUrl);
    },
    onError: (err) => {
      message.error(err.message);
      ref.current && ref.current.pause();
      ref.current && (ref.current.currentTime = 0);
      ref.current && (ref.current.src = '');
      setAudioUrl(undefined);
    },
  });

  const { loading: voiceLoading } = useRequest(
    () => {
      const type = form.getFieldValue('type');
      return voiceApi(type);
    },
    {
      onSuccess: (res) => {
        setVoices(res.data);
      },
      refreshDeps: [form.getFieldValue('type')],
    },
  );

  return (
    <Form
      initialValues={setting}
      onFinish={(values) => {}}
      layout="horizontal"
      requiredMark={false}
      form={form}
    >
      <div style={style} className={classNames(className, styles.container)}>
        <div className={styles.form}>
          <div className={styles.text}>
            <FormItem name="text" noStyle>
              <Input.TextArea
                placeholder="请输入要转换的文字"
                showCount
                maxLength={800}
                autoSize={{ maxRows: 21, minRows: 21 }}
              />
            </FormItem>
          </div>
          <div className={styles.config}>
            <FormItem label={'接口'} name="type">
              <Select
                options={[
                  {
                    label: 'Edge 语音接口',
                    value: 'edge',
                  },
                  {
                    label: 'MicroSoft 语音接口（不稳定）',
                    value: 'microsoft',
                  },
                ]}
              />
            </FormItem>
            <FormItem label={'语言'} name="language">
              <Select
                options={[
                  {
                    label: '中文(普通话)',
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
                  {
                    label: '韩语(韩国)',
                    value: 'ko-KR',
                  },
                  {
                    label: '中文(粤语)',
                    value: 'zh-HK',
                  },
                ]}
              />
            </FormItem>
            <FormItem
              label={'语音'}
              name="voice"
              rules={[{ required: true, message: '请选择语音' }]}
            >
              <Select
                loading={voiceLoading}
                disabled={voiceLoading}
                defaultActiveFirstOption
                options={voices
                  .filter((voice) => voice.locale === form.getFieldValue('language'))
                  .map((item) => ({
                    label: `${item.DisplayName}-${item.LocalName}`,
                    value: item.ShortName,
                  }))}
              />
            </FormItem>
            <FormItem label={'语速'} name="speed">
              <Slider max={3} min={0} step={0.01} />
            </FormItem>
            <FormItem label={'音调'} name="pitch">
              <Slider max={2} min={0} step={0.01} />
            </FormItem>
          </div>
        </div>
        <div className={styles.footer}>
          <FormFooter>
            <Button htmlType="button" onClick={() => {}}>
              取消
            </Button>
            <Button htmlType="submit" type="primary" loading={loading}>
              应用
            </Button>
          </FormFooter>
        </div>
      </div>
    </Form>
  );
};

export default Info;
