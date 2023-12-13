import { downloadAgentModel } from '@/services/agent';
import { useRequest } from 'ahooks';
import { Button } from 'antd';

interface DownloadButtonProps {
  url: string;
}

const DownloadButton = (props: DownloadButtonProps) => {
  const { url } = props;

  const { loading: downloading, run } = useRequest((url) => downloadAgentModel(url), {
    manual: true,
    onSuccess: (blob) => {
      const agentModelUrl = window.URL.createObjectURL(blob);
    },
  });

  return (
    <Button
      key="list-download"
      disabled={downloading}
      loading={downloading}
      onClick={() => {
        run(url);
      }}
    >
      下载
    </Button>
  );
};

export default DownloadButton;
