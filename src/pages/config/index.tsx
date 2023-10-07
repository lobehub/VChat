import { Form, FormFooter, FormGroup, FormItem } from '@lobehub/ui';
import { Button, Input, InputNumber, Segmented, Select } from 'antd';
import { BotIcon, Monitor } from 'lucide-react';

const setting = {
  i18n: 'en',
  model: 'gpt-3.5-turb',
};

const Config = () => {
  return (
    <div style={{ padding: 24 }}>
      <Form initialValues={setting} onFinish={console.table}>
        {/* @ts-ignore */}
        <FormGroup icon={Monitor} title={'Common Settings'}>
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
          <FormItem desc={'Please use your own GPT Key'} divider label={'API Key'} name="apikey">
            <Input placeholder="sk-" style={{ width: 480 }} />
          </FormItem>
        </FormGroup>
        {/* @ts-ignore */}
        <FormGroup icon={BotIcon} title={'Model Setting'}>
          <FormItem desc={'which gpt model you are using'} label={'GPT Model'} name="model">
            <Select
              options={[
                {
                  label: 'gpt-3.5-turb',
                  value: 'gpt-3.5-turb',
                },
                {
                  label: 'gpt-4',
                  value: 'gpt-4',
                },
              ]}
            />
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
