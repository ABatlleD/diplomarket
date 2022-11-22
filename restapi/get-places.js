import { isEmpty } from '../libs/serialize'
import resources from './resources'

export const getCountries = async (active) => {
  let activeId = false
  if (!isEmpty(active) && active.activo !== false) { activeId = active.pais }

  const country = await resources.place.country.all()
  const country_response = country.data.results
  return country_response.reduce(function (filtered, option) {
    const countries = { name: option.nombre, isActive: activeId === option.id || option.nombre === 'Cuba', id: option.id }
    filtered.push(countries)
    return filtered
  }, [])
}

export const getProvinces = async (active) => {
  let activeId = false
  if (!isEmpty(active) && active.activo !== false) { activeId = active.provincia }

  const province = await resources.place.city.all()
  const province_response = province.data.results
  return province_response.reduce(function (filtered, option) {
    const provinces = { name: option.nombre, isActive: activeId === option.id, id: option.id }
    filtered.push(provinces)
    return filtered
  }, [])
}

export const getMunicipalities = async (active) => {
  let activeId = false
  if (!isEmpty(active) && active.activo !== false) { activeId = active.municipio }
  const municipality = await resources.place.district.all()
  const municipality_response = municipality.data.results
  return municipality_response.reduce(function (filtered, option) {
    const municipalities = { name: option.nombre, isActive: activeId === option.id, id: option.id, /*  deliveryPrice: option.precio_entrega, */ provinceId: option.provincia }
    filtered.push(municipalities)
    return filtered
  }, [])
}

export const getCountriesId = async (id) => {
  if (id) {
    const countriesId = await resources.place.country.one(id)
    const { nombre } = countriesId.data
    return nombre ?? ''
  }
}

export const getProvincesId = async (id) => {
  if (id) {
    const provincesId = await resources.place.city.one(id)
    const { nombre } = provincesId.data
    return nombre ?? ''
  }
}

export const getMunicipalitiesId = async (id) => {
  if (id) {
    const municipalitiesId = await resources.place.district.one(id)
    const { nombre } = municipalitiesId.data
    return nombre ?? ''
  }
}
