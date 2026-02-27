import "@/styles/globals.css";
import '@/styles/home.css'
import { AuthProvider } from "@/contexts/AuthContext";
import { UnheadProvider, createHead } from '@unhead/react/client'
import { useHead } from "@unhead/react";

export default function App({ Component, pageProps }) {

  const head = createHead()

  useHead({
    meta: [
      { name: 'robots', content: 'index, follow' }
    ]
  })

  useSeoMeta({

    ogSiteName: 'LUMINI School',
    ogLocale: 'fr_MG',
    ogType: 'website',
    ogImage: 'https://raw.githubusercontent.com/IALYFrancisco/ASSETS/refs/heads/main/LUMINI%20School/IMAGES/lumini-school-logo.png',

    twitterCard: 'summary_large_image',
    twitterImage: 'https://raw.githubusercontent.com/IALYFrancisco/ASSETS/refs/heads/main/LUMINI%20School/IMAGES/lumini-school-logo.png'

  })

  return (
    <UnheadProvider head={head}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </UnheadProvider>
  );
}
