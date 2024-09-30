import '../styles/globals.css'

//import stores from '../stores'
import { Toaster } from "@/components/ui/toaster"

import Layout from '../components/Layout'

export const metadata = {
  title: 'Prayer Notifier',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
          <Toaster />
        </Layout>
      </body>
    </html>
  )
}
