import React, { useState } from "react"
import { useFav } from "../store/fav/fav.context"
import { useTranslation } from "react-i18next"
import LayersClearIcon from "@mui/icons-material/LayersClear"
import MainLayout from "../layouts/MainLayout"
import AppHeader from "../components/layouts/AppHeader"
import FavList from "../components/fav/FavList"

function Wishlist() {
  const { items } = useFav()
  const [loading] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <AppHeader title={t("pages.wishlist")} />
      <div className="flex flex-col items-center my-10">
        <div className="flex mb-4 flex-row justify-center">
          <div className="font-bold text-2xl md:text-3xl text-footer-background-300">
            {t("wishlist.title")}
          </div>
        </div>
        {items.length > 0 ? (
          <FavList products={items} loading={loading} />
        ) : (
          <div className="text-footer-background-300 mt-10 mb-20">
            <LayersClearIcon sx={{ fontSize: "16rem" }} />
          </div>
        )}
      </div>
    </>
  )
}

Wishlist.getLayout = function getLayout(page) {
  return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default Wishlist
