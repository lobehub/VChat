import { sessionSelectors, useSessionStore } from '@/store/session';
import { Avatar, FormFooter } from '@lobehub/ui';
import { Button, Form, Input, Upload, message } from 'antd';
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

  const { cover, avatar } = currentAgent?.meta || {};

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <Form
      onFinish={() => {
        form.validateFields().then((values) => {
          updateAgentConfig(values);
          message.success('保存成功');
        });
      }}
      initialValues={currentAgent}
      layout="horizontal"
      requiredMark={false}
      form={form}
    >
      <div style={style} className={classNames(className, styles.container)}>
        <div className={styles.form}>
          <div className={styles.config}>
            <FormItem
              label={'名称'}
              name={['meta', 'name']}
              required
              rules={[{ required: true, message: '请输入角色名称' }]}
            >
              <Input placeholder="请输入角色名称" />
            </FormItem>
            <FormItem
              label={'描述'}
              name={['meta', 'description']}
              rules={[{ required: true, message: '请输入角色描述' }]}
            >
              <Input placeholder="请输入角色描述" />
            </FormItem>
            <FormItem
              label={'说明'}
              name={['meta', 'readme']}
              rules={[{ required: true, message: '请输入角色说明' }]}
            >
              <Input.TextArea
                placeholder="请输入角色说明"
                showCount
                autoSize={{ maxRows: 11, minRows: 11 }}
              />
            </FormItem>
          </div>
          <div className={styles.more}>
            <FormItem label={'头像'} name={['meta', 'avatar']}>
              <Upload
                showUploadList={false}
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
              >
                <Avatar src={avatar} size={96} shape="circle" />
              </Upload>
            </FormItem>
            <FormItem label={'封面'} name={['meta', 'cover']}>
              <Upload
                showUploadList={false}
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
              >
                <img alt="example" src={cover} width={200} />
              </Upload>
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
