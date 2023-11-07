import { agentListSelectors, useAgentStore } from '@/store/agent';
import { FormFooter } from '@lobehub/ui';
import { Button, Form, Input, Upload } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { UploadIcon } from 'lucide-react';
import { useEffect } from 'react';

const FormItem = Form.Item;

interface Setting {
  type: string;
  language: string;
  voice?: string;
  text: string;
  speed: number;
  pitch: number;
}
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
    flex: 2;
  `,
  config: css`
    padding: 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    flex: 3;
    margin-right: 12px;
  `,
  footer: css`
    margin-top: 20px;
  `,
}));

const Info = (props: InfoProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));

  useEffect(() => {
    form.setFieldsValue(currentAgent);
  }, [currentAgent, form]);

  return (
    <Form onFinish={(values) => {}} layout="horizontal" requiredMark={false} form={form}>
      <div style={style} className={classNames(className, styles.container)}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem label={'名称'} name="name">
              <Input placeholder="请输入角色名称" />
            </FormItem>
            <FormItem label={'描述'} name="description">
              <Input placeholder="请输入角色描述" />
            </FormItem>
            <FormItem label={'模型'} name="model">
              <Upload>
                <Button icon={<UploadIcon size={16} />}>上传模型</Button>
              </Upload>
            </FormItem>
            <FormItem label={'说明'} name="readme">
              <Input.TextArea
                placeholder="请输入要转换的文字"
                showCount
                maxLength={800}
                autoSize={{ maxRows: 11, minRows: 11 }}
              />
            </FormItem>
          </div>
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
        </div>
        <div className={styles.footer}>
          <FormFooter>
            <Button htmlType="button" onClick={() => {}}>
              取消
            </Button>
            <Button htmlType="submit" type="primary">
              应用
            </Button>
          </FormFooter>
        </div>
      </div>
    </Form>
  );
};

export default Info;
