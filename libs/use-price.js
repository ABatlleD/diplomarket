import { useMemo } from 'react'
import { useRouter } from 'next/router'

export function formatPrice({
  amount,
  currencyCode
}) {
  const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  })

  return formatCurrency.format(amount)
}

export function formatVariantPrice({
  amount,
  baseAmount,
  currencyCode,
  locale
}) {
  const hasDiscount = baseAmount > amount
  const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' })
  const discount = hasDiscount
    ? formatDiscount.format((baseAmount - amount) / baseAmount)
    : null

  const price = formatPrice({ amount, currencyCode, locale })
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null

  return { price, basePrice, discount }
}

export default function usePrice(
  data
) {
  const {
    settings: { currency }
  } = { settings: { currency: 'USD' } }
  const { amount, baseAmount, currencyCode = currency ?? 'USD' } = data ?? {}
  const { locale } = useRouter()
  const value = useMemo(() => {
    if (typeof amount !== 'number' || !currencyCode) return ''
    const currentLocale = locale || 'en'
    return baseAmount
      ? formatVariantPrice({
        amount,
        baseAmount,
        currencyCode,
        locale: currentLocale
      })
      : formatPrice({ amount, currencyCode, locale: currentLocale })
  }, [amount, baseAmount, currencyCode, locale])

  return typeof value === 'string'
    ? { price: value, basePrice: null, discount: null }
    : value
}
