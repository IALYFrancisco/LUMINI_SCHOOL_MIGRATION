import "@/styles/globals.css";
import '@/styles/home.css'
import { AuthProvider } from "@/contexts/AuthContext";
import { UnheadProvider, createHead } from '@unhead/react/client'

export default function App({ Component, pageProps }) {

  const head = createHead()

  return (
    <UnheadProvider head={head}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </UnheadProvider>
  );
}
