import '../styles/globals.css'

import { Provider } from 'mobx-react'

import stores from '../stores'
import Layout from "../components/Layout"

export default function App({ Component, pageProps }) {

  return (
    <Provider stores={stores}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </Provider>
  )
}