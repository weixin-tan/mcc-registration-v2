import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MCC Registration V2</title>
        <meta
          name="description"
          content="MCC Registration V2 built on NextJS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Building things, one line at a time</h1>
      </main>
    </div>
  );
}
