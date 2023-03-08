import React from "react"
import Image from "next/image"

function Img({ src, alt, ...rest }) {
  return (
    <div {...rest}>
      <Image src={src} alt={alt} fill />
    </div>
  )
}

export default Img
