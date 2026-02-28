import { Header } from "@/components/header";
import { Formations } from "@/components/formations";
import Head from  'next/head'

export function Home() {
  return (
    <>
      <Head>
        <title>Accueil | LUMINI School - Plateforme de formation en informatique</title>
        <link rel="canonical" href="https://luminischool.onrender.com" />

        {/* OG */}
        <meta property="og:title" content="Accueil | LUMINI School - Plateforme de formation en informatique" />
        <meta property="og:url" content="https://luminischool.onrender.com" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} />

        {/* Twitter */}
        <meta name="twitter:title" content="Accueil | LUMINI School - Plateforme de formation en informatique" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} />
      </Head>
      <Header />
      <Formations />
    </>
  );
}