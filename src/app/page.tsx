"use client";
import BasicTable from "@/components/BasicTable";
import CryptoTable from "@/pages/CryptoTable";
// import styles from "./page.module.css";

export default function Home() {
  return (
    // <div className={styles.page}>
    //   <main className={styles.main}>
    <div>
      {/* <BasicTable /> */}
      <CryptoTable />
    </div>
    //   </main>
    // </div>
  );
}
