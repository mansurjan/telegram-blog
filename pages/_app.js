import React, { useState, useEffect } from 'react'

import '../styles/globals.scss'
import { Layout} from '../components'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

