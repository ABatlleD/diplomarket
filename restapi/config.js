/* eslint-disable indent */
import resources from './resources'
import { useEffect, useState } from 'react'
const DEFAULT_CONFIG = {
  phones: [],
  emails: [],
  social_media: [],
  zelle_email: '',
  zelle_time: null,
  descuento_zelle: 0,
  directo_email: '',
  moneda: false
}

export function useConfig() {
  const [loading, setLoading] = useState(true)
  const [configuration, setConfiguration] = useState(undefined)
  const [paypal, setPaypal] = useState(false)
  const [tropipay, setTropipay] = useState(false)
  const [zelle, setZelle] = useState(false)
  const [directo, setDirecto] = useState(false)
  const [banco, setBanco] = useState(false)
  const [zelle_email, setZelleEmail] = useState(DEFAULT_CONFIG.zelle_email)
  const [zelle_time, setZelleTime] = useState(DEFAULT_CONFIG.zelle_time)
  const [descuento_zelle, setDescuentoZelle] = useState(DEFAULT_CONFIG.descuento_zelle)
  const [directo_email, setDirectoEmail] = useState(DEFAULT_CONFIG.directo_email)
  const [moneda, setMoneda] = useState(DEFAULT_CONFIG.moneda)

  useEffect(() => {
    resources.configuration.get()
      .then(res => {
        setConfiguration(res?.data?.results[0])
      })
  }, [])
  useEffect(() => {
    if (configuration) {
      setPaypal(configuration?.pasarelas[0]?.pasarela_paypal ?? false)
      setTropipay(configuration?.pasarelas[0]?.pasarela_tropipay ?? false)
      setZelle(configuration?.pasarelas[0]?.pasarela_zelle ?? false)
      setDirecto(configuration?.pasarelas[0]?.pasarela_directo ?? false)
      setBanco(configuration?.pasarelas[0]?.pasarela_bofa ?? false)
      setZelleEmail(configuration?.correo_zelle ?? DEFAULT_CONFIG.zelle_email)
      setZelleTime(configuration?.tiempo_espera_zelle ?? DEFAULT_CONFIG.zelle_time)
      setDescuentoZelle(configuration?.descuento_zelle ?? DEFAULT_CONFIG.descuento_zelle)
      setDirectoEmail(configuration?.correo_pago_directo ?? DEFAULT_CONFIG.directo_email)
      setMoneda(configuration?.moneda ?? DEFAULT_CONFIG.moneda)
      setLoading(false)
    }
  }, [configuration])

  return {
    pasarelas: {
      paypal,
      tropipay,
      zelle,
      directo,
      banco
    },
    zelle: {
      zelle_email,
      zelle_time,
      descuento_zelle
    },
    directo_email,
    moneda,
    loading
  }
}
