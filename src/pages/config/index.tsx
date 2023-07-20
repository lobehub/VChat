import { Form, FormFooter, FormGroup, FormItem } from '@lobehub/ui';
import { Button, InputNumber, Segmented, Select, Switch } from 'antd';
import { Palette, PanelLeftClose } from 'lucide-react';

const setting = {
  i18n: 'en',
  liteAnimation: false,
  sidebarExpand: true,
  sidebarFixedMode: 'float',
  sidebarWidth: 300,
};

const Config = () => {
  return (
    <div style={{ padding: 24 }}>
      <Form initialValues={setting} onFinish={console.table}>
        <FormGroup icon={Palette} title={'Theme Settings'}>
          <FormItem desc={'Editor language'} label={'Language'} name="i18n">
            <Select
              options={[
                {
                  label: 'English',
                  value: 'en',
                },
                {
                  label: '简体中文',
                  value: 'zh_CN',
                },
              ]}
            />
          </FormItem>
          <FormItem
            desc={
              'Reduce the blur effect and background flow color, which can improve smoothness and save CPU usage'
            }
            divider
            label={'Reduce Animation'}
            name="liteAnimation"
            valuePropName="checked"
          >
            <Switch />
          </FormItem>
        </FormGroup>
        <FormGroup icon={PanelLeftClose} title={'Quick Setting Sidebar'}>
          <FormItem
            desc={'Whether to expand the sidebar by default when starting'}
            label={'Default Expand'}
            name="sidebarExpand"
            valuePropName="checked"
          >
            <Switch />
          </FormItem>
          <FormItem
            desc={
              'Fixed as grid mode for constant display, auto-expand when the mouse moves to the side in floating mode'
            }
            divider
            label={'Display Mode'}
            name="sidebarFixedMode"
          >
            <Segmented
              options={[
                {
                  label: 'Fixed',
                  value: 'fixed',
                },
                {
                  label: 'Float',
                  value: 'float',
                },
              ]}
            />
          </FormItem>
          <FormItem
            desc={'Default width of the sidebar when starting'}
            divider
            label={'Default Width'}
            name="sidebarWidth"
          >
            <InputNumber />
          </FormItem>
        </FormGroup>
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
