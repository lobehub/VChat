import { sessionSelectors, useSessionStore } from '@/store/session';
import { FormFooter } from '@lobehub/ui';
import { Button, Form, Input } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { useEffect } from 'react';

const FormItem = Form.Item;

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
  more: css`
    flex: 2;
    padding: 12px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
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
  const currentAgent = useSessionStore((s) => sessionSelectors.currentAgent(s));

  useEffect(() => {
    form.setFieldsValue(currentAgent);
  }, [currentAgent, form]);

  return (
    <Form onFinish={(values) => {}} layout="horizontal" requiredMark={false} form={form}>
      <div style={style} className={classNames(className, styles.container)}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem label={'系统设定'} name="systemRole">
              <Input.TextArea
                placeholder="请输入要转换的文字"
                showCount
                autoSize={{ maxRows: 18, minRows: 18 }}
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
