import { FormFooter } from '@lobehub/ui';
import { Button, Form, InputNumber, Select } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

const FormItem = Form.Item;

const setting = {
  i18n: 'en',
  model: 'gpt-3.5-turb',
};

interface ConfigProps {
  style?: React.CSSProperties;
  className?: string;
}

const useStyles = createStyles(({ css, token }) => ({
  config: css`
    justify-content: center;
    padding: 12px 24px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    flex: 1;
  `,
}));

const Config = (props: ConfigProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  return (
    <div style={style} className={classNames(styles.config, className)}>
      <Form initialValues={setting} onFinish={console.table} layout="vertical">
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
          />
        </FormItem>
        <FormItem label={'语言'} name="language">
          <Select
            options={[
              {
                label: 'Microsoft Speech API',
                value: 'MicroSoft',
              },
              {
                label: 'Azure Speech API',
                value: 'Azure',
              },
              {
                label: 'Edge Speech API',
                value: 'Edge',
              },
            ]}
          />
        </FormItem>
        <FormItem label={'Default Width'} name="sidebarWidth">
          <InputNumber />
        </FormItem>
        <FormFooter>
          <Button htmlType="button">Reset</Button>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </FormFooter>
      </Form>
    </div>
  );
};

export default Config;
