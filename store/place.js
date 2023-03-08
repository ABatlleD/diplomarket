import { PLACE } from "../libs/constants"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const defaultPlace = {
  province: null,
  municipality: null,
}
// Original atom.
export const placeAtom = atomWithStorage(PLACE, defaultPlace)

export const clearPlaceAtom = atom(null, (_get, set, _data) => {
  return set(placeAtom, defaultPlace)
})
export const provinceAtom = atom(
  (get) => get(placeAtom).province,
  (get, set, data) => {
    const prev = get(placeAtom)
    return set(placeAtom, { ...prev, province: data })
  }
)

export const municipalityAtom = atom(
  (get) => get(placeAtom).municipality,
  (get, set, data) => {
    const prev = get(placeAtom)
    return set(placeAtom, { ...prev, municipality: data })
  }
)
