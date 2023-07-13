import React from "react"
import { useTranslation } from 'react-i18next'

function PreLoader() {
  const { t } = useTranslation()
  return (
    <>
      <div id="pulseloader">
        <span style={{display: "inherit", textAlign: "center"}}>
          <span className="bg-dm-red w-3.5 h-3.5 m-0.5 rounded-full inline-block animate-pulseloader-default"></span>
          <span className="bg-dm-red w-3.5 h-3.5 m-0.5 rounded-full inline-block animate-pulseloader-delay"></span>
          <span className="bg-dm-red w-3.5 h-3.5 m-0.5 rounded-full inline-block animate-pulseloader-default"></span>
          <p className="text-dm-blue">{t("loadingMessage")}...</p>
        </span>
      </div>
    </>
  )
}

export default PreLoader
