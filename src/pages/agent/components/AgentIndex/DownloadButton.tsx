import { downloadGithubAgent } from '@/services/agent';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';

interface DownloadButtonProps {
  url: string;
  reloadAgentList: () => void;
}

const DownloadButton = (props: DownloadButtonProps) => {
  const { url, reloadAgentList } = props;

  const { loading: downloading, run } = useRequest((url) => downloadGithubAgent(url), {
    manual: true,
    onSuccess: (data) => {
      const { success, errorMessage } = data;
      if (success) {
        message.success('下载成功');
        reloadAgentList();
      } else {
        message.error(errorMessage);
      }
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
