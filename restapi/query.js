import { useQuery } from "@tanstack/react-query";
import resources from "./resources";

export function useFilterProducts(options) {
  if (options.municipality_id) {
    const { data, isLoading, error } = useQuery(
      [`/filter-products`, options],
      () => resources.products.all(options)
    );
    return {
      products: data?.data?.results ?? [],
      productsTotal: data?.data?.total ?? 0,
      productsTotalPages: data?.data?.total_pages ?? 1,
      productsCount: data?.data?.count ?? 0,
      productsIsLoading: isLoading,
      productsError: error,
    };
  } else {
    return {
      products: [],
      productsTotal: 0,
      productsTotalPages: 1,
      productsCount: 0,
      productsIsLoading: false,
      productsError: false,
    };
  }
}

export function useOneProduct(id) {
  const { data, isLoading, error } = useQuery(
    [`/one-product`, id],
    () => resources.products.one(id)
  );
  return {
    product: data?.data,
    productIsLoading: isLoading,
    productError: error,
  };
}

export function useOneProvider(id) {
  const { data, isLoading, error } = useQuery(
    [`/one-provider`, id],
    () => resources.suppliers.one(id)
  );
  return {
    provider: data,
    providerIsLoading: isLoading,
    providerError: error,
  };
}

export function useAllCarousel() {
  const { data, isLoading, error } = useQuery(
    [`/all-carousel`],
    async () => await resources.carousel.all()
  );
  return {
    carousel: data?.data?.results ?? [],
    carouselCount: data?.data?.count ?? 0,
    carouselIsLoading: isLoading,
    carouselError: error,
  };
}
