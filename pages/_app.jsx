import "@/styles/globals.css";
import '@/styles/home.css'
import { AuthProvider } from "@/contexts/AuthContext";
import { UnheadProvider, createHead } from '@unhead/react/client';
import { useHead, useSeoMeta } from "@unhead/react";

const head = createHead();

function GlobalSEO() {
  useHead({
    meta: [
      { name: "robots", content: "index, follow" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  });

  useSeoMeta({
    ogSiteName: "LUMINI School",
    ogLocale: "fr_MG",
    ogType: "website",
    ogImage: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`,
    twitterCard: "summary_large_image",
    twitterImage: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/images/lumini-school-logo.png`
  });

  return null;
}

export default function App({ Component, pageProps }) {
  return (
    <UnheadProvider head={head}>
      <GlobalSEO />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </UnheadProvider>
  );
}