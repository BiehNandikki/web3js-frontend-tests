import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import accounts from 'web3-eth-accounts';
import Web3Component from '../components/web3';
import Web3Accounts from '../components/web3Accounts';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

declare global {
  interface Window {
    web3Accounts: any;
  }
}
if (typeof window !== "undefined") {
  window.web3Accounts = accounts;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>web3.js testing</title>
      </Head>
      <div
        className={`${styles.page}`}
      >
        Web3 front-end benchmark tests
      <Web3Component/>
      <Web3Accounts/>
      </div>
    </>
  );
}
