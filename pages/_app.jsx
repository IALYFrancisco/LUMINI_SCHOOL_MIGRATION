import "@/styles/globals.css";
import '@/styles/home.css'
import { AuthProvider } from "@/contexts/AuthContext";
import Head from "next/head"

// function GlobalSEO() {

//   useSeoMeta({
//     ogSiteName: "LUMINI School",
//     ogLocale: "fr_MG",
//     ogType: "website",
//     ogImage: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`,
//     twitterCard: "summary_large_image",
//     twitterImage: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`
//   });

//   return null;
// }

export default function App({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="/images/logo-de-lumini-school.png"/>
          <meta name="robots" content="index, follow" />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} />
          <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
  );
}