import React, { useState, useEffect } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined"
import { useTranslation } from "react-i18next"
import resources from "../restapi/resources"
import useWindowSize from "../hooks/WindowSize"
import { Search } from "@mui/icons-material"
import dynamic from "next/dynamic"
import { useAtom } from "jotai"
import { municipalityAtom } from "../store/place"

const AppButton = dynamic(() => import("./AppButton"))
const SearchResult = dynamic(() => import("./products/SearchResult"))

const theme = createTheme({
  palette: {
    error: {
      main: "#b12024",
      contrastText: "#fff",
    },
  },
})

const CssOutlinedInput = styled(OutlinedInput)({
  "& .MuiInputBase-input": {
    padding: 3,
  },
  "& .MuiInputBase-focused": {
    padding: 3,
  },
})

function SearchBar({ setOpenSelectPlace }) {
  const size = useWindowSize()
  const { t } = useTranslation()
  const [municipality] = useAtom(municipalityAtom)
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (inputValue.length > 2) {
      resources.products
        .search(municipality?.id, inputValue)
        .then((response) => setOptions(response.data))
    } else {
      setOptions([])
    }
  }, [inputValue])

  const searchSubmit = (e, value) => {
    e.preventDefault()
    if (value && value !== "undefined") {
      setInputValue(value)
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="hidden md:flex md:flex-none mr-1">
          <button
            type="button"
            className="flex mx-1"
            onClick={() => setOpenSelectPlace(true)}
          >
            <div className="flex justify-center items-center">
              <div className="h-5 w-5 flex justify-center items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" width="32" height="32" aria-hidden="true" role="presentation" focusable="false" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4Zm6 3c0 2.874-3.097 6.016-4.841 7.558a1.74 1.74 0 0 1-2.318 0C5.097 13.016 2 9.874 2 7a6 6 0 1 1 12 0Zm-1 0A5 5 0 0 0 3 7c0 1.108.615 2.395 1.57 3.683c.934 1.258 2.087 2.377 2.933 3.126a.74.74 0 0 0 .994 0c.846-.749 2-1.867 2.933-3.126C12.385 9.395 13 8.108 13 7Z"/>
                </svg>
              </div>
              <div className="flex flex-col text-sm leading-tight text-left">
                <p className="text-gray-700 font-bold tracking-tight">
                  Hello, select
                </p>
                <p className="font-bold text-sm leading-4">Your delivery city</p>
              </div>
            </div>
          </button>
        </div>
        <Autocomplete
          id="search-in-site"
          options={options}
          onInputChange={searchSubmit}
          // @ts-ignore
          getOptionLabel={(option) => {
            if (option.nombre) {
              return option.nombre
            }
            return inputValue
          }}
          noOptionsText={<p>{t("no_options")}</p>}
          style={{
            width: "100%",
          }}
          freeSolo
          renderInput={(params) => {
            return (
              <div className="relative hidden xl:flex rounded-md shadow-sm" ref={params.InputProps.ref}>
                <input
                  {...params.inputProps}
                  type="text"
                  className="py-2.5 px-4 pr-11 block w-full border border-gray-300 shadow-sm rounded-md text-sm md:text-base outline-none focus:z-10 focus:ring-1 focus:border-dm-red focus:ring-dm-red"
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none z-20 pr-4">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                  </svg>
                </div>
              </div>
            )
          }}
          renderOption={(props, option) => (
            <SearchResult info={option} {...{ setInputValue }} />
          )}
        />
      </ThemeProvider>
    </>
  )
}

export default SearchBar
