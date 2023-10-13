import React, { useState, useEffect } from "react"
import {
  Button,
  Modal,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import resources from "../../restapi/resources"
import { useTranslation } from "react-i18next"
import { useCart } from "../../store/cart/cart.context"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import localFont from "@next/font/local"
import { useAtom } from "jotai"
import { municipalityAtom, provinceAtom } from "../../store/place"

const arial = localFont({ src: "../../public/assets/font/arial/Arial.ttf" })

function SelectPlace({
  openSelectPlace = false,
  setOpenSelectPlace = () => {},
}) {
  const [prov, setProv] = useState(null)
  const [mun, setMun] = useState(null)
  const [province, setProvince] = useAtom(provinceAtom)
  const [municipality, setMunicipality] = useAtom(municipalityAtom)
  const { t } = useTranslation()
  const [cities, setCities] = useState({})
  const [districts, setDistricts] = useState([])
  const [pivots, setPivots] = useState({})

  const { resetCart } = useCart()

  useEffect(() => {
    resources.place.city.all().then((response) => setCities(response.data))
    resources.place.district.all().then((response) => setPivots(response.data))
  }, [])

  useEffect(() => {
    setMun(municipality)
    setProv(province)
  }, [province, municipality])

  const handleStateChange = (event) => {
    setProv(event.target.value)
    const _arr = []
    for (const item of pivots.results) {
      if (event.target.value.id === item.provincia) {
        _arr.push(item)
      }
    }
    setDistricts(_arr)
  }

  const handleDistrictChange = (event) => {
    setMun(event.target.value)
  }

  const handleClose = () => {
    if (municipality && province) {
      setOpenSelectPlace(false)
    } else {
      toast.error("Debe seleccionar una ubicación")
    }
  }

  const handleSubmit = () => {
    if (prov && mun) {
      console.log("🚀 ~ file: SelectPlace.jsx:76 ~ handleSubmit ~ mun:", mun)
      console.log("🚀 ~ file: SelectPlace.jsx:76 ~ handleSubmit ~ prov:", prov)
      setMunicipality(mun)
      setProvince(prov)
      resetCart()
      return window.location.reload()
    } else {
      toast.error("Debe seleccionar una ubicación")
    }
  }

  return (
    <>
      <ToastContainer />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openSelectPlace}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ overflowY: "scroll" }}
      >
        <Fade in={openSelectPlace}>
          <div className={arial.className}>
            <div className="flex flex-col shadow-2xl h-screen md:h-auto md:rounded-xl bg-background-100 w-full md:w-[25%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-2">
              <div className="flex flex-row justify-end">
                <HighlightOffIcon
                  className="hover:cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <div className="flex flex-row justify-center mt-4">
                <p className="font-bold text-xl text-footer-background-100">
                  {t("place.title")}
                </p>
              </div>
              <div className="flex flex-row justify-center mt-4">
                <img
                  src="/delivery-top.png"
                  className="max-w-max h-44 hover:cursor-pointer"
                  alt="..."
                />
              </div>
              <div className="flex flex-row justify-center mt-4 mx-2">
                <p className="font-semibold text-footer-background-100 text-justify">
                  {t("place.subtitle")}
                </p>
              </div>
              <div className="flex flex-col md:flex-row justify-between mx-2 mt-8">
                <div className="md:w-[49%] mb-4 md:mb-0">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-prov-label">
                      {t("place.state")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-prov-label"
                      id="demo-simple-select-prov"
                      value={prov}
                      label={t("place.state")}
                      onChange={handleStateChange}
                    >
                      {cities?.results?.map((item) => (
                        <MenuItem key={item.id} value={item}>
                          {item.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="md:w-[49%]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-mun-label">
                      {t("place.district")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-mun-label"
                      id="demo-simple-select-mun"
                      value={mun}
                      label={t("place.district")}
                      onChange={handleDistrictChange}
                    >
                      {districts?.map((item) => (
                        <MenuItem key={item.id} value={item}>
                          {item.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="mx-2 my-4">
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    backgroundColor: "#b12024 !important",
                  }}
                  onClick={handleSubmit}
                >
                  {t("place.accept")}
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default SelectPlace
