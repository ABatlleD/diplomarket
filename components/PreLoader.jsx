import React from "react"

function PreLoader() {
  return (
    <>
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="animatedText">Cargando...</p>
      </div>
    </>
  )
}

export default PreLoader
