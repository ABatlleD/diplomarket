import React, { useState, useEffect } from "react"
import resources from "../restapi/resources"
import {
  FormControlLabel,
  Pagination,
  TextField,
  Autocomplete,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import useWindowSize from "../hooks/WindowSize"
import { useSession } from "next-auth/react"
import { useAllCarousel, useFilterProducts } from "../restapi/query"
import { useRouter } from "next/router"
// eslint-disable-next-line no-unused-vars
import Image from "next/image"
// eslint-disable-next-line no-unused-vars
import storeAltImg from "../public/assets/store.png"
import useScrollY from "../hooks/Scroll"
import dynamic from "next/dynamic"
import InfiniteScroll from "react-infinite-scroll-component"
import { CarouselProvider, Slider, Slide } from "pure-react-carousel"
import { useAtom } from "jotai"
import { municipalityAtom } from "../store/place"
import PreLoader from "../components/PreLoader"
const MainCarousel = dynamic(() => import("../components/home/MainCarousel"))
/* const StoreMallDirectoryIcon = dynamic(() =>
  import("@mui/icons-material/StoreMallDirectory")
) */
const RemoveShoppingCartIcon = dynamic(() =>
  import("@mui/icons-material/RemoveShoppingCart")
)
const PriceCheckIcon = dynamic(() => import("@mui/icons-material/PriceCheck"))
const LocalShippingOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/LocalShippingOutlined")
)
const CreditCardOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/CreditCardOutlined")
)
const FilterAltOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/FilterAltOutlined")
)
const SentimentSatisfiedOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/SentimentSatisfiedOutlined")
)
const MainLayout = dynamic(() => import("../layouts/MainLayout"))
const AppHeader = dynamic(() => import("../components/layouts/AppHeader"))
const ListProducts = dynamic(() =>
  import("../components/products/ListProducts")
)
const Img = dynamic(() => import("../components/Img"))
const CategoriesAccordion = dynamic(() =>
  import("../components/categories/CategoriesAccordion")
)
const FilterBar = dynamic(() =>
  import("../components/layouts/sidebar/FilterBar")
)
const ProductItem = dynamic(() => import("../components/products/ProductItem"))
const AllProductsLoader = dynamic(() =>
  import("../components/loaders/AllProducts")
)
const HorizontalProductItem = dynamic(() =>
  import("../components/products/HorizontalProductItem")
)

const NotificationsTip = dynamic(
  () => import("../components/modals/NotificationsTip"),
  {
    loading: () => "Loading...",
  }
)

function Home() {
  const [municipality] = useAtom(municipalityAtom)
  const router = useRouter()
  const { id, categoryId, subcategoryId, brandId } = router.query
  const { carousel, carouselCount, carouselIsLoading } = useAllCarousel()
  const size = useWindowSize()
  const { t, i18n } = useTranslation()
  const [listView, setListView] = useState(true)
  const [filterBar, setFilterBar] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [categories, setCategories] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [suppliers, setSuppliers] = useState([])
  const [brands, setBrands] = useState([])
  const [promotions, setPromotions] = useState(false)
  const [recommendations, setRecommendations] = useState(false)
  const [exist, setExist] = useState(false)
  const [providerDisplay, setProviderDisplay] = useState(undefined)
  // eslint-disable-next-line no-unused-vars
  const [storeImg, setStoreImg] = useState("")
  const [loading, setLoading] = useState(false)

  const [category, setCategory] = useState(undefined)
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const [offset, setOffset] = useState(0)
  const [banners, setBanners] = useState([])
  const [subcategory, setSubcategory] = useState(undefined)
  const [brand, setBrand] = useState({ label: "", id: 0 })
  const [provider, setProvider] = useState({ label: "", id: 0 })
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100000)
  const [extra, setExtra] = useState(undefined)
  const [order, setOrder] = React.useState("recent")
  const { status, data } = useSession()
  const [openNotificationsTip, setOpenNotificationsTip] = useState(false)
  const { products, productsTotal, productsIsLoading } = useFilterProducts({
    offset,
    municipality_id: municipality?.id,
    limit: 15,
    category,
    subcategory,
    brand,
    provider,
    min,
    max,
    extra,
    ordering: order,
  })

  const scrollY = useScrollY()

  const [mobileList, setMobileList] = useState(products)

  const handleChange = (event) => {
    setOrder(event.target.value)
  }

  const getMorePost = async () => {
    setOffset(offset + 15)
  }

  useEffect(() => {
    resources.brands.all().then((response) => {
      const answer = []
      response.data.results.map((item) => {
        const el = {
          label: item.nombre,
          id: item.id,
        }
        return answer.push(el)
      })
      return setBrands(answer)
    })
    resources.suppliers.all().then((response) => {
      const answer = []
      response.data.results.map((item) => {
        const el = {
          label: item.nombre,
          id: item.pk,
        }
        return answer.push(el)
      })
      return setSuppliers(answer)
    })
    resources.banner.all().then((response) => setBanners(response.data))
    resources.categories
      .all()
      .then((response) => setCategories(response.data.results))
  }, [])

  useEffect(() => {
    if (status !== "unauthenticated" && data && !data.rss && municipality) {
      setOpenNotificationsTip(true)
    }
  }, [status])

  useEffect(() => {
    if (providerDisplay) {
      setStoreImg(`${process.env.NEXT_PUBLIC_BACKEND}${providerDisplay?.img}`)
    }
  }, [providerDisplay])

  const handlePriceFilter = (prices) => {
    setMin(prices[0])
    setMax(prices[1])
  }

  const handleSubcategoryFilter = (subcategory) => {
    setFilterBar(false)
    setCategory(undefined)
    setSelectedCategory(subcategory)
    setSubcategory(subcategory.pk)
  }

  const handleCategoryFilter = (category) => {
    setFilterBar(false)
    setSubcategory(undefined)
    setSelectedCategory(category)
    setCategory(category.id)
  }

  const handleAllClick = () => {
    setProviderDisplay(undefined)
    setProvider({ label: "", id: 0 })
    setBrand({ label: "", id: 0 })
    setCategory(undefined)
    setSubcategory(undefined)
    setSelectedCategory(undefined)
    setExist(undefined)
    setPromotions(false)
    setRecommendations(false)
    setExtra(undefined)
    setExist(false)
    setMin(0)
    setMax(100000)
  }

  const handleMobileFilter = (mobileFilter) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    setProviderDisplay(mobileFilter.providerDisplay)
    setBrand(mobileFilter.brand)
    setProvider(mobileFilter.provider)
    setMin(mobileFilter.min)
    setMax(mobileFilter.max)
    setExtra(mobileFilter.extra)
  }

  useEffect(() => {
    if (size.width > 768) {
      const element = document.getElementById("title")
      element?.scrollIntoView()
    }
  }, [
    offset,
    products,
    category,
    subcategory,
    brand,
    provider,
    min,
    max,
    extra,
    order,
  ])

  useEffect(() => {
    if (size.width <= 768) {
      setMobileList([])
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [category, subcategory, brand, provider, min, max, extra, order])

  useEffect(() => {
    setMobileList((mobileList) => [...mobileList, ...products])
  }, [products])

  useEffect(() => {
    setOffset(0)
    setPage(1)
  }, [category, subcategory, brand, provider, min, max, extra, order])

  const handlePaginationChange = async (event, value) => {
    setOffset((value - 1) * 15)
    setPage(value)
  }

  useEffect(() => {
    if (productsTotal % 15 !== 0) {
      setPages(Math.floor(productsTotal / 15) + 1)
    } else {
      setPages(productsTotal / 15)
    }
  }, [productsTotal])

  const getCategory = (id) => {
    for (const item of categories) {
      if (item.id === parseInt(id)) {
        return item
      }
    }
  }

  const getSubcategory = (id) => {
    for (const item of categories) {
      for (const element of item?.subcategorias) {
        if (element.pk === parseInt(id)) {
          return element
        }
      }
    }
  }

  useEffect(() => {
    if (id) {
      setLoading(true)
      resources.suppliers.one(id).then((response) => {
        setProvider({ label: response.data.nombre, id: response.data.pk })
        setProviderDisplay(response.data)
        setLoading(false)
      })
    }
    if (brandId) {
      setLoading(true)
      resources.brands.one(brandId).then((response) => {
        setBrand({ label: response.data.nombre, id: response.data.id })
        setLoading(false)
      })
    }
    if (categoryId) {
      setCategory(categoryId)
      setSelectedCategory(getCategory(categoryId))
    }
    if (subcategoryId) {
      setSubcategory(subcategoryId)
      setSelectedCategory(getSubcategory(subcategoryId))
    }
  }, [id, brandId, categoryId, subcategoryId])

  const handleChangeType = (type) => {
    setExtra(undefined)
    switch (type) {
      case "promotions":
        if (promotions) {
          setExist(false)
          setPromotions(false)
          setRecommendations(false)
        } else {
          setPromotions(true)
          setExist(false)
          setRecommendations(false)
          setExtra("rebajados")
        }
        break
      case "recommendations":
        if (recommendations) {
          setExist(false)
          setPromotions(false)
          setRecommendations(false)
        } else {
          setRecommendations(true)
          setExist(false)
          setPromotions(false)
          setExtra("recomendados")
        }
        break
      case "exist":
        if (exist) {
          setExist(false)
          setPromotions(false)
          setRecommendations(false)
        } else {
          setExist(true)
          setPromotions(false)
          setRecommendations(false)
          setExtra("disponibles")
        }
        break
    }
  }

  return (
    <>
      <AppHeader title={t("pages.products")} />
      <div className="flex flex-col dark:bg-background-100">
        <div className="mb-3 md:mb-0">
          {!carouselIsLoading && (
            <MainCarousel carousel={carousel} count={carouselCount} />
          )}
        </div>
        <div className="dark:text-[black] flex md:flex-row flex-col w-full md:w-[95%] md:mx-auto mb-3 md:my-5">
          <div className="md:mx-3 flex md:hidden text-base mt-1 flex-row justify-between md:mb-3 mx-2">
            {selectedCategory && (
              <div className="font-bold mt-2">
                {i18n.language === "es"
                  ? selectedCategory.nombre
                  : selectedCategory.nombre_ingles}
              </div>
            )}
            {!selectedCategory && (
              <div className="font-bold mt-2">{t("filter.categories")}</div>
            )}
            <div className="flex flex-row items-center">
              {/* <div className="mr-3 mt-2" onClick={() => setListView(!listView)}>
                <Link href={"/providers"}>
                  <StoreMallDirectoryIcon />
                </Link>
              </div> */}
              <div className="mr-3 mt-2" onClick={() => setListView(!listView)}>
                {listView && (
                  <Img
                    src={"/assets/icons/grid-view.svg"}
                    alt="Rows Fill Icon"
                    className="relative w-6 h-6"
                  />
                )}
                {!listView && (
                  <Img
                    src={"/assets/icons/rows-fill.svg"}
                    alt="Rows Fill Icon"
                    className="relative w-6 h-6"
                  />
                )}
              </div>
              <div className="flex w-28">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t("filter.order.title")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order}
                    label="Order"
                    size="small"
                    onChange={handleChange}
                  >
                    <MenuItem value={"recent"}>
                      {t("filter.order.recent")}
                    </MenuItem>
                    <MenuItem
                      value={
                        data && data.mayorista ? "precio_b2b_dsc" : "precio_dsc"
                      }
                    >
                      {t("filter.order.asc_price")}
                    </MenuItem>
                    <MenuItem
                      value={
                        data && data.mayorista ? "precio_b2b_asc" : "precio_asc"
                      }
                    >
                      {t("filter.order.desc_price")}
                    </MenuItem>
                    <MenuItem value={"descuento_dsc"}>
                      {t("filter.order.asc_discount")}
                    </MenuItem>
                    <MenuItem value={"descuento_asc"}>
                      {t("filter.order.desc_discount")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="md:flex hidden mr-1 flex-col w-1/6">
            <div className="flex flex-col">
              <div className="flex flex-row mb-2 justify-between">
                <p className="font-bold">{t("filter.category")}</p>
                <div
                  className="bg-footer-background-300 text-background-300 px-2 rounded-full hover:cursor-pointer mr-6"
                  onClick={handleAllClick}
                >
                  {t("filter.all")}
                </div>
              </div>
              <div>
                {categories.map((item) => (
                  <div key={item.id} className="border-2 border-background-100">
                    <CategoriesAccordion
                      category={item}
                      items={item.subcategorias}
                      {...{
                        handleCategoryFilter,
                        handleSubcategoryFilter,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col mt-2 mb-4 mr-4">
              <CarouselProvider
                naturalSlideWidth={50}
                naturalSlideHeight={50}
                totalSlides={banners.count}
                isPlaying={true}
                interval={6000}
                infinite={true}
              >
                <Slider>
                  {banners?.results?.map((result) => {
                    return (
                      <a key={result.imagen} href={result.enlace}>
                        <Slide index={result.imagen}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND}${result.imagen}`}
                            className="w-full hover:cursor-pointer h-full"
                            alt="..."
                          />
                        </Slide>
                      </a>
                    )
                  })}
                </Slider>
              </CarouselProvider>
            </div>
            <div className="flex flex-col my-4">
              <FormControlLabel
                value={promotions}
                onChange={() => handleChangeType("promotions")}
                control={<Checkbox size="small" checked={promotions} />}
                label={t("filter.promotions")}
              />
              <FormControlLabel
                value={recommendations}
                onChange={() => handleChangeType("recommendations")}
                control={<Checkbox size="small" checked={recommendations} />}
                label={t("filter.recommendations")}
              />
              <FormControlLabel
                value={exist}
                onChange={() => handleChangeType("exist")}
                control={<Checkbox size="small" checked={exist} />}
                label={t("filter.exist")}
              />
            </div>
            <div className="flex flex-col mt-2 mb-4">
              <p className="font-bold mb-2">{t("filter.price")}</p>
              <div className="w-[92%]">
                <div
                  className="hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button"
                  onClick={() => handlePriceFilter([0, 25])}
                >
                  US$0 {t("filter.to")} US$25
                </div>
                <div
                  className="hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button"
                  onClick={() => handlePriceFilter([25, 50])}
                >
                  US$25 {t("filter.to")} US$50
                </div>
                <div
                  className="hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button"
                  onClick={() => handlePriceFilter([50, 100])}
                >
                  US$50 {t("filter.to")} US$100
                </div>
                <div
                  className="hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button"
                  onClick={() => handlePriceFilter([100, 200])}
                >
                  US$100 {t("filter.to")} US$200
                </div>
                <div
                  className="hover:cursor-pointer text-footer-background-300 hover:underline hover:text-button"
                  onClick={() => handlePriceFilter([200, 100000])}
                >
                  {t("filter.more")} US$200
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-4 w-[95%]">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={brand}
                options={brands}
                onChange={(event, newValue, reason) => {
                  return reason === "clear"
                    ? setBrand({ label: "", id: 0 })
                    : setBrand({ label: newValue?.label, id: newValue?.id })
                }}
                renderInput={(params) => (
                  <TextField {...params} label={t("filter.brand")} />
                )}
                size="small"
              />
            </div>
            {/* <div className="flex flex-col mb-4 w-[95%]">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={provider}
                options={suppliers}
                onChange={(event, newValue, reason) => {
                  if (reason === "clear") {
                    setProvider({ label: "", id: 0 })
                    setProviderDisplay(undefined)
                  } else {
                    setProvider({ label: newValue?.label, id: newValue?.id })
                    resources.suppliers.one(newValue?.id).then((response) => {
                      setProviderDisplay(response.data)
                    })
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label={t("filter.provider")} />
                )}
                size="small"
              />
            </div> */}
          </div>
          <div className="flex flex-row w-full md:w-5/6">
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-row justify-between w-full md:w-[98%] mb-1 md:mb-3">
                {selectedCategory && (
                  <div
                    id="title"
                    className="font-bold w-1/2 ml-4 mb-2 text-xl hidden md:flex"
                  >
                    {i18n.language === "es"
                      ? selectedCategory.nombre
                      : selectedCategory.nombre_ingles}
                  </div>
                )}
                {!selectedCategory && (
                  <div
                    id="title"
                    className="font-bold w-1/2 mb-2 text-xl hidden md:flex"
                  >
                    {t("filter.categories")}
                  </div>
                )}
                <div className="hidden md:flex w-[25%]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("filter.order.title")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={order}
                      label="Order"
                      size="small"
                      onChange={handleChange}
                    >
                      <MenuItem value={"recent"}>
                        {t("filter.order.recent")}
                      </MenuItem>
                      <MenuItem
                        value={
                          data && data.mayorista
                            ? "precio_b2b_dsc"
                            : "precio_dsc"
                        }
                      >
                        {t("filter.order.asc_price")}
                      </MenuItem>
                      <MenuItem
                        value={
                          data && data.mayorista
                            ? "precio_b2b_asc"
                            : "precio_asc"
                        }
                      >
                        {t("filter.order.desc_price")}
                      </MenuItem>
                      <MenuItem value={"descuento_dsc"}>
                        {t("filter.order.asc_discount")}
                      </MenuItem>
                      <MenuItem value={"descuento_asc"}>
                        {t("filter.order.desc_discount")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* {providerDisplay && (
                <div className="flex flex-row items-center h-24 w-[98%] bg-background-200 mb-1 md:mb-3 rounded-lg">
                  <div className="flex ml-4 relative items-center justify-center h-20 w-20 rounded-full">
                    <Image
                      src={storeImg}
                      layout="fill"
                      alt="Diplomarket product"
                      placeholder="blur"
                      onError={() => setStoreImg(storeAltImg)}
                      blurDataURL="/loading.gif"
                      className="hover:cursor-pointer rounded-t-lg"
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <p className="font-bold text-lg">
                      {providerDisplay.nombre}
                    </p>
                  </div>
                </div>
              )} */}
              {size.width <= 768 && loading && (
                <div className="flex flex-row w-full justify-center my-6 text-text-blue">
                  <PreLoader />
                </div>
              )}
              {size.width <= 768 && municipality && !loading && (
                <InfiniteScroll
                  dataLength={mobileList.length}
                  next={getMorePost}
                  hasMore={
                    mobileList.length < productsTotal || productsIsLoading
                  }
                  loader={
                    <div className="flex flex-row w-full justify-center my-6 text-text-blue">
                      <PreLoader />
                    </div>
                  }
                  endMessage={
                    <div className="flex flex-col my-6 items-center w-full">
                      {mobileList.length <= 0 && !productsIsLoading && (
                        <RemoveShoppingCartIcon
                          sx={{
                            fontSize: "10rem",
                            color: "#6e717a",
                            marginBottom: "1rem",
                          }}
                        />
                      )}
                      <h4 className="font-bold text-[#6e717a]">
                        {t("no-more-products")}
                      </h4>
                    </div>
                  }
                >
                  <div className="flex flex-wrap justify-evenly w-full">
                    {mobileList.map((data) => (
                      <div
                        className={
                          listView
                            ? "w-full mx-2 my-2"
                            : "w-[30%] md:w-1/4 xl:w-[19%] mb-4"
                        }
                        key={data.id}
                      >
                        {!listView && <ProductItem product={data} />}
                        {listView && <HorizontalProductItem product={data} />}
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              )}
              {size.width > 768 && (productsIsLoading || loading) && (
                <div className="ml-4">
                  <AllProductsLoader />
                </div>
              )}
              {size.width > 768 && (
                <ListProducts products={products} loading={productsIsLoading} />
              )}
              {size.width > 768 &&
                productsTotal === 0 &&
                !productsIsLoading && (
                  <div className="flex flex-col my-6 items-center w-full">
                    <RemoveShoppingCartIcon
                      sx={{
                        fontSize: "30rem",
                        color: "#6e717a",
                        marginBottom: "1rem",
                      }}
                    />
                    <h4 className="font-bold text-[#6e717a] text-[2rem]">
                      {t("no-more-products")}
                    </h4>
                  </div>
                )}
              {size.width > 768 && productsTotal > 0 && (
                <div className="mt-2">
                  <Pagination
                    count={pages}
                    showFirstButton
                    size="medium"
                    showLastButton
                    page={page}
                    onChange={handlePaginationChange}
                  />
                </div>
              )}
            </div>
          </div>
          <FilterBar
            {...{
              filterBar,
              setFilterBar,
              handleMobileFilter,
              handleCategoryFilter,
              setCategory,
              setSubcategory,
              handleSubcategoryFilter,
              setSelectedCategory,
            }}
          />
        </div>
        <div className="flex md:flex-row flex-wrap justify-around text-footer-background-300 md:w-[95%] md:mx-auto md:my-28">
          <div className="flex flex-col items-center w-1/2 md:w-auto">
            <LocalShippingOutlinedIcon sx={{ fontSize: "3rem" }} />
            <p className="text-footer-background-300 md:text-xl text-base">
              {t("home.delivery.title")}
            </p>
            <p className="text-text-100 md:text-lg text-xs">
              {t("home.delivery.description")}
            </p>
          </div>
          <div className="flex flex-col  items-center w-1/2 md:w-auto">
            <PriceCheckIcon sx={{ fontSize: "3rem" }} />
            <p className="text-footer-background-300 md:text-xl text-base">
              {t("home.prices.title")}
            </p>
            <p className="text-text-100 md:text-lg text-xs">
              {t("home.prices.description")}
            </p>
          </div>
          <div className="flex flex-col items-center my-12 md:my-0 w-1/2 md:w-auto">
            <SentimentSatisfiedOutlinedIcon sx={{ fontSize: "3rem" }} />
            <p className="text-footer-background-300 md:text-xl text-base">
              {t("home.customer.title")}
            </p>
            <p className="text-text-100 md:text-lg text-xs">
              {t("home.customer.description")}
            </p>
          </div>
          <div className="flex flex-col items-center my-12 md:my-0  w-1/2 md:w-auto">
            <CreditCardOutlinedIcon sx={{ fontSize: "3rem" }} />
            <p className="text-footer-background-300 md:text-xl text-base">
              {t("home.payments.title")}
            </p>
            <p className="text-text-100 md:text-lg text-xs">
              {t("home.payments.description")}
            </p>
          </div>
        </div>
        <NotificationsTip
          {...{ openNotificationsTip, setOpenNotificationsTip }}
        />
      </div>
      {size.width <= 768 && (
        <div
          className={`fixed overflow-hidden p-2 rounded-full ${
            scrollY !== 0 ? "bottom-24" : "bottom-8"
          } right-3 bg-text-blue text-background-100 flex flex-row 
          justify-center items-center shadow-2xl hover:cursor-pointer`}
          onClick={() => window.scrollTo(0, 0)}
        >
          <div onClick={() => setFilterBar(true)}>
            <FilterAltOutlinedIcon fontSize="large" />
          </div>
        </div>
      )}
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout pageProps={page} filterBar={true}>
      {page}
    </MainLayout>
  )
}

export default Home
