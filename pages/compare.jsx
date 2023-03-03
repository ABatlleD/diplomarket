import React, { useEffect, useState } from "react"
import { useCompare } from "../store/compare/compare.context"
import { useTranslation } from "react-i18next"
import LayersClearIcon from "@mui/icons-material/LayersClear"
import dynamic from "next/dynamic"

const MainLayout = dynamic(() => import("../layouts/MainLayout"))
const AppHeader = dynamic(() => import("../components/layouts/AppHeader"))
const CompareItem = dynamic(() => import("../components/compare/CompareItem"))

function Compare() {
  const { items } = useCompare()
  const [emptySlots, setEmptySlots] = useState([])

  const { t } = useTranslation()

  useEffect(() => {
    const empty = 5 - items.length
    const slots = []
    setEmptySlots([])
    if (empty !== 0) {
      for (let i = 0; i < empty; i++) {
        slots.push(i)
      }
      setEmptySlots(slots)
    }
  }, [items])

  return (
    <>
      <AppHeader title={t("pages.compare")} />
      <div className="flex flex-row justify-center text-footer-background-300 w-full font-bold text-2xl my-4">
        Comparar Productos
      </div>
      <div className="flex flex-row mx-5 mb-5">
        {items.map((item) => (
          <div key={item.id} className="flex w-1/5">
            <CompareItem id={item.id} />
          </div>
        ))}
        {emptySlots.map((slot) => (
          <div
            key={slot}
            className="flex flex-row h-[41rem] text-footer-background-300 border items-center justify-center w-1/5"
          >
            <LayersClearIcon sx={{ fontSize: "8rem" }} />
          </div>
        ))}
      </div>
    </>
  )
}

Compare.getLayout = function getLayout(page) {
  return <MainLayout pageProps={page}>{page}</MainLayout>
}

export default Compare
