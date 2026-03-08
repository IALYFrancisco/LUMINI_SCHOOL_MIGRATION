import Sidebar from "@/components/dashboard/sidebar"
import Head from "next/head"
import IsAuthenticated from "@/components/isAuthenticated"

export default function Dashboard({ children }) {
  return (
    <IsAuthenticated>
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" key="robots" />
        </Head>

        <section id="dashboard-view">
          <Sidebar />

          <section className="sections-container">
            {children}
          </section>
        </section>
      </>
    </IsAuthenticated>
  )
}