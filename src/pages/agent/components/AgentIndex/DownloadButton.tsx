import { downloadGithubAgent } from '@/services/agent';
import { useRequest } from 'ahooks';
import { Button } from 'antd';

interface DownloadButtonProps {
  url: string;
}

const DownloadButton = (props: DownloadButtonProps) => {
  const { url } = props;
  const { loading: downloading } = useRequest(downloadGithubAgent);

  return (
    <Button
      key="list-download"
      disabled={downloading}
      loading={downloading}
      onClick={() => {
        downloadGithubAgent(url);
      }}
    >
      下载
    </Button>
  );
};

export default DownloadButton;
