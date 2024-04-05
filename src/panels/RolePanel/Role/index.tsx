import { sessionSelectors, useSessionStore } from '@/store/session';
import { FormFooter } from '@lobehub/ui';
import { Button, Form, Input, message } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

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
  const [currentAgent, updateAgentConfig] = useSessionStore((s) => [
    sessionSelectors.currentAgent(s),
    s.updateAgentConfig,
  ]);

  return (
    <Form
      onFinish={(values) => {
        form.validateFields().then((values) => {
          updateAgentConfig(values);
          message.success('保存成功');
        });
      }}
      layout="horizontal"
      requiredMark={false}
      form={form}
      initialValues={currentAgent}
    >
      <div style={style} className={classNames(className, styles.container)}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem
              label={'系统设定'}
              name="systemRole"
              rules={[{ required: true, message: '请输入角色的系统设定' }]}
            >
              <Input.TextArea
                placeholder="请输入角色的系统设定"
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
