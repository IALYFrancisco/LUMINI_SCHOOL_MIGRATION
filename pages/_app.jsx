import "@/styles/globals.css";
import '@/styles/home.css';
import '@/styles/formationsPage.css';
import '@/styles/login.css';
import '@/styles/registrations.css';
import { AuthProvider } from "@/contexts/AuthContext";
import Head from "next/head"
import { Toaster } from "sonner"

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/images/logo-de-lumini-school.png"/>
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="LUMINI School"/>
        <meta property="og:locale" content="fr_MG"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Toaster position='top-center' richColors/>
      <Component {...pageProps} />
    </AuthProvider>
  );
}