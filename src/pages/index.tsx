import styles from "./page.module.css";
import VrmViewer from "@/components/vrmViewer";

export default function Home() {
  return (
    <main className={styles.main}>
      <VrmViewer />
    </main>
  );
}
