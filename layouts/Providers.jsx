import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { FavProvider } from "../store/fav/fav.context.jsx"
import { CompareProvider } from "../store/compare/compare.context.jsx"
import { CartProvider } from "../store/cart/cart.context.jsx"
import { SessionProvider } from "next-auth/react"

function Providers({ children }) {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={children.session}>
      <CompareProvider>
        <FavProvider>
          <CartProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </CartProvider>
        </FavProvider>
      </CompareProvider>
    </SessionProvider>
  )
}

export default Providers
