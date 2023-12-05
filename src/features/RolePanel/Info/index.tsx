import { agentListSelectors, useAgentStore } from '@/store/agent';
import { Avatar, FormFooter } from '@lobehub/ui';
import { Button, Card, Form, Input, Upload } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { UploadIcon } from 'lucide-react';
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
  const currentAgent = useAgentStore((s) => agentListSelectors.currentAgentItem(s));

  useEffect(() => {
    form.setFieldsValue(currentAgent);
  }, [currentAgent, form]);

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

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
          <div className={styles.more}>
            <FormItem label={'头像'} name="avatar">
              <Upload
                name="avatar"
                showUploadList={false}
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
              >
                <Avatar src={currentAgent?.avatar} size={96} shape="circle" />
              </Upload>
            </FormItem>
            <FormItem label={'封面'} name="cover">
              <Upload
                name="cover"
                showUploadList={false}
                // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
              >
                <Card
                  /* eslint-disable-next-line @next/next/no-img-element */
                  cover={<img alt="example" src={currentAgent?.cover} />}
                  style={{ width: 200, cursor: 'pointer' }}
                />
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
