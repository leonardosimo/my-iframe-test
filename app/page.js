import styles from "./page.module.css";
import { ComponenteScript } from "../components/ComponenteScript";

export default function Home() {
  return (
    <main className={styles.main} >
      <ComponenteScript />
    </main>
  );
}
