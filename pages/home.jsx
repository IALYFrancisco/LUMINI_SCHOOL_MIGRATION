import { Header } from "@/components/header";
import { Formations } from "@/components/formations";
import { Articles } from "@/components/articles";
import Head from  'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Accueil | LUMINI School - Plateforme de formation en informatique</title>
        <link rel="canonical" href="https://luminischool.onrender.com" />

        <meta property="og:title" content="Accueil | LUMINI School - Plateforme de formation en informatique" />
        <meta property="og:url" content="https://luminischool.onrender.com" />

        <meta name="twitter:title" content="Accueil | LUMINI School - Plateforme de formation en informatique" />
      </Head>
      <Header />
      <Formations />
      <Articles/>
    </>
  );
}