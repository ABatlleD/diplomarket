import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta
            name="description"
            content="Diplomarket™ is an online store developed by CUSPINERA SURL, in order to satisfy your purchases and deliveries, both for you and dearest. We are pleased to bring you the BEST! .... ALWAYS!!!"
          />
          <meta
            name="keywords"
            content="Diplomarket,diplomarket,Diplomático,diplomático,embajada,Embajada,importar,franquicia,franquicia diplomática,import from USA,servicio a diplomáticos,sector diplomático,office supplies,appliances,purchases in USA,Embassy,embassies,import,franchise,without customs payments,diplomats purchase office supplies,appliances,purchases in USA,ventas sector diplomático,ventas a diplomáticos,Sales to diplomats,offers,promotions,ofertas,promociones"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
