import { useEffect, useRef, useState } from "react";
import productDatas from "../../data/products.json";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedProducts } from "../../redux/action/categories";
import { errorRequestHandel } from "../../utils.js/helper";
import { _searchedCategories } from "../../https/categories";
import { useLocation, useParams } from "react-router-dom";

export default function AllProductPage() {
  const [filters, setFilter] = useState({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });
  const dispatch = useDispatch();
  const { searchedProducts } = useSelector((state) => state.searchedProducts);
  const searchParams  = useSelector((state) => state.searchParams.searchParams);
  const [filterProductsIds, setFilterProductsIds] = useState([]);
  const [categoryToggle1, setToggle1] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Price");
  const [elementsSize, setSize] = useState("0px");
  const [productList,setProductList]=useState([])
  const dropdownRef = useRef(null);
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');
  const string = query.get('string');
  

  const checkboxHandler = (e) => {
    const { id, checked } = e.target;
    const numericId = Number(id); // Convert the id to a number

    setFilterProductsIds((prevIds) => {
      const updatedIds = checked
        ? [...prevIds, numericId]
        : prevIds.filter((itemId) => itemId !== numericId);

      // Send the updated array to your payload function here
      sendPayload(updatedIds);
      return updatedIds;
    });
  };

  // const {search }=searchParams;
  const sendPayload = async (updatedIds) => {
    const payload = {
      search: searchParams?.search,
      category_id: updatedIds
    }
    try {
      const response = await _searchedCategories(payload);
      if (response.status === 200) {
      
        dispatch(getSearchedProducts(response.data));
      }
    } catch (error) {
      errorRequestHandel({ error: error });
    } finally {
      // setLoading(false);
    }
  };
  const [volume, setVolume] = useState({ min: 0, max: 5000 });
  const [search, setSearch] = useState(true);

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);

  // const { products } = productDatas;
  const { products, categories } = searchedProducts;

// toggle products by ascending or descending code 
  const handler = () => {
    setToggle1(!categoryToggle1);
  };

  useEffect(() => {

    if (categoryToggle1) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle1]);

  useEffect(() => {
    searchSelectedCategory();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle1(false);
        // alert("hhh")
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchSelectedCategory = async () => {
    const payload={
      search: string,
      category_id: id
    }
    try {
      const response = await _searchedCategories(payload);
      if (response.status === 200) {
        dispatch(getSearchedProducts(response.data));
      }
    } catch (error) {
      errorRequestHandel({ error: error });
    } finally {
      // setLoading(false);
    }
  };
  // console.log(searchedProducts,"check");
  useEffect(() => {
    if(products && products.length > 0){
      products?.forEach(product => {
    const minPrice = Math.min(...product.product_stock.map(stock => stock.price_per_unit));
    product.price = minPrice;
  });
  setProductList(products)
  // console.log(products,"check");
}else{
  setProductList([])
}
}, [products]);
  
  

  const handleProductSort = (order) => {
    setSelectedCategory(order)
    setToggle1(false)
    const sortedProducts = products?.sort((a, b) => {
        if (order === 'ascending') {
            return a.price - b.price;
        } else if (order === 'descending') {
            return b.price - a.price;
        }
    });

    dispatch(getSearchedProducts({ categories: categories, products: sortedProducts}));
};

const pricRangeHandler=(value)=>{
  console.log(value,"hhhh");
  
  setVolume({min:value[0],max:value[1]})
  // const { min, max }=volume;
  const filteredItems = productList.filter(item => item.price >= volume.min && item.price <= volume.max);
  dispatch(getSearchedProducts({ categories: categories, products: filteredItems}))
  setProductList(filteredItems)
}

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ProductsFilter
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
                  checkboxHandler={checkboxHandler}
                  volume={volume}
                  volumeHandler={(value) => pricRangeHandler(value)}
                  storage={storage}
                  filterstorage={filterStorage}
                  className="mb-[30px]"
                  categoriesList={categories}
                />
                {/* ads */}
                {/* <div className="w-full hidden lg:block h-[295px]">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_URL
                      }/assets/images/ads-5.png`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div> */}
              </div>

              <div className="flex-1">
                <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Showing</span> 1–6 of {products?.length}
                      results
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center relative cursor-pointer">
                    <span className="font-400 text-[13px]">Sort by:</span>
                    <div className="flex space-x-3 items-center border-b border-b-qgray" onClick={handler}>
                      <span className="font-400 text-[13px] text-qgray">
                        {selectedCategory}
                      </span>
                      <span>
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                        </svg>
                      </span>
                    </div>
                    {categoryToggle1 && (
                      <div
                        className="fixed top-0 left-0 w-full h-full"
                        onClick={handler}
                      ></div>
                    )}
                    <div
                      className="category-dropdown absolute top-[20px] left-[40px]  overflow-hidden z-40"
                      style={{ height: `${elementsSize} ` }}
                      ref={dropdownRef}
                    >
                      <ul className="categories-list w-[160px]">
                        <li
                          className="category-item border-t border-qgray-border"
                          onClick={() =>
                            handleProductSort("ascending")
                          }
                        >
                          <div
                            className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                          >
                            <div className="flex items-center space-x-6">
                              <span className="text-xs font-400">Ascending by Price</span>
                            </div>
                          </div>
                        </li>
                        <li
                          className="category-item border-t border-qgray-border"
                          onClick={() =>
                            handleProductSort("descending")
                          }
                        >
                          <div
                            className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                          >
                            <div className="flex items-center space-x-6">
                              <span className="text-xs font-400">Descending by Price</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggle(!filterToggle)}
                    type="button"
                    className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration datas={productList} startLength={0} endLength={productList?.length}>
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} search={search} />
                      </div>
                    )}
                  </DataIteration>
                </div>

                {/* <div className="w-full h-[164px] overflow-hidden mb-[40px]">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_URL
                      }/assets/images/ads-6.png`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div> */}
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={products}
                    startLength={6}
                    endLength={15}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
