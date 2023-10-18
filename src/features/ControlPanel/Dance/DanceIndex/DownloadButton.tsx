import { downloadGithubDance } from '@/services/dance';
import { useDanceStore } from '@/store/dance';
import { useRequest } from 'ahooks';
import { Button, message } from 'antd';

interface DownloadButtonProps {
  url: string;
}

const DownloadButton = (props: DownloadButtonProps) => {
  const { url } = props;
  const { fetchDanceList } = useDanceStore();
  const { loading: downloading, run } = useRequest((url) => downloadGithubDance(url), {
    manual: true,
    onSuccess: (data) => {
      const { success, errorMessage } = data;
      if (success) {
        message.success('下载成功');
        fetchDanceList();
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
