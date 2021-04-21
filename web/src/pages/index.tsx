import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { PageHeader } from 'antd';
import Nav from '../components/header/index'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Downtown</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <Nav />

      <main className={styles.main}>
        <img style={{width: '620px', height: '437px'}} src='/logo.jpg' />
      </main>


    </div>
  );
}
