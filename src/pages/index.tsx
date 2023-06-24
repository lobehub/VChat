import { Layout } from '@lobehub/ui';
import VrmViewer from '@/components/vrmViewer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <Layout footer={<Footer />} header={<Header />} sidebar={<VrmViewer />}>
      123
    </Layout>
  );
}
