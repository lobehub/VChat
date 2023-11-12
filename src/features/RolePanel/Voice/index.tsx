import { speechApi, voiceListApi } from '@/services/tts';
import { TTS, Voice } from '@/store/type';
import { FormFooter } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Form, Input, Select, Slider, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { useRef, useState } from 'react';

const FormItem = Form.Item;

const setting: TTS = {
  engine: 'edge',
  locale: 'zh-CN',
  voice: 'zh-CN-XiaoyiNeural',
  text: '正在为你准备我的整个世界',
  speed: 1,
  pitch: 1,
};

interface ConfigProps {
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
  audio: css`
    margin-top: 20px;
  `,
}));

const Config = (props: ConfigProps) => {
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
      const adUrl = URL.createObjectURL(new Blob([res]));
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
      return voiceListApi(type);
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
      onFinish={(values) => {
        speek(values);
      }}
      onValuesChange={(changedValues) => {
        if (changedValues.language || changedValues.type) {
          form.setFieldsValue({ voice: undefined });
        }
      }}
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
            <FormItem label={'语音引擎'} name="engine">
              <Select
                options={[
                  {
                    label: 'Edge',
                    value: 'edge',
                  },
                  {
                    label: 'MicroSoft（不稳定）',
                    value: 'microsoft',
                  },
                ]}
              />
            </FormItem>
            <FormItem label={'语言'} name="locale">
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
            <FormFooter>
              <Button
                disabled={!audioUrl}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = audioUrl!;
                  link.download = 'audio.mp3';

                  link.dispatchEvent(
                    new MouseEvent('click', {
                      bubbles: true,
                      cancelable: true,
                      view: window,
                    }),
                  );
                }}
              >
                下载
              </Button>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                保存
              </Button>
              <Button htmlType="submit" type="primary" loading={loading}>
                转换
              </Button>
            </FormFooter>
          </div>
        </div>
        <div className={styles.audio}>
          <audio
            src={audioUrl}
            controls
            controlsList="nodownload"
            style={{ width: '100%' }}
            ref={ref}
          />
        </div>
      </div>
    </Form>
  );
};

export default Config;
