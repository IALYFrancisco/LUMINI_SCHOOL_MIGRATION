import { Header } from "@/components/header";
import { Formations } from "@/components/formations";
import { useHead, useSeoMeta } from "@unhead/react";
import Head from  'next/head'

export function Home() {
  <Head>
        <title>Accueil | LUMINI School - Plateforme de formation en informatique</title>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://luminischool.onrender.com" />

        {/* OG */}
        <meta property="og:title" content="Accueil | LUMINI School" />
        <meta property="og:url" content="https://luminischool.onrender.com" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} />

        {/* Twitter */}
        <meta name="twitter:title" content="Accueil | LUMINI School" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} />
      </Head>

  return (
    <>
      <Header />
      <Formations />
    </>
  );
}