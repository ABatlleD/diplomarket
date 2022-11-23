import { useMutation } from '@tanstack/react-query'
import resources from './resources'

export function useDelivery({ items, municipio }) {
  const { mutateAsync, data, isLoading, error } = useMutation(
    ['/api/checkout/checkdelivery/'],
    () => resources.delivery.get(items, municipio)
  )

  return {
    totalDelivery: data,
    isLoading,
    error,
    calculateDelivery: mutateAsync
  }
}
