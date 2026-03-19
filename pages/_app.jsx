import "@/styles/globals.css";
import '@/styles/home.css';
import '@/styles/login.css';
import '@/styles/formationsPage.css';
import '@/styles/dashboard/dashboard.css';
import '@/styles/registrations.css';
import '@/styles/articleView.css';
import '@/styles/notFound.css';
import '@/styles/dashboard/formation.css';
import '@/styles/dashboard/article.css';
import "react-quill-new/dist/quill.snow.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Head from "next/head"
import { Toaster } from "sonner"

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/images/logo-de-lumini-school.png"/>
        <meta name="robots" content="index, follow" key="robots" />
        <meta property="og:site_name" content="LUMINI School"/>
        <meta property="og:locale" content="fr_MG"/>
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} key="og:image" />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`} key="twitter:image" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Toaster position='top-center' richColors/>
      <Component {...pageProps} />
    </AuthProvider>
  );
}