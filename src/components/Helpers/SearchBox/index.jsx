import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { _searchedCategories } from "../../../https/categories";
import { getSearchedProducts } from "../../../redux/action/categories";
import { errorRequestHandel } from "../../../utils.js/helper";

export default function SearchBox({ className, type }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [selectedCategory, setSelectedCategory] = useState({
    title: "All Categories",
    id: 0,
  });
  const [searchString, setSearchString] = useState();
  const { categoriesList } = useSelector((state) => state.categoriesList);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handler = () => {
    setToggle(!categoryToggle);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory({ title: category.title, id: category.id });
    setToggle(false);
  };

  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchSelectedCategory = async () => {
    const payload={
      search: searchString,
      category_id: selectedCategory.id
    }
    try {
      const response = await _searchedCategories(payload);
      if (response.status === 200) {
        dispatch(getSearchedProducts(response.data));
        navigate("/all-products");
      }
    } catch (error) {
      errorRequestHandel({ error: error });
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`w-full h-full flex items-center border border-qgray-border bg-white ${
          className || ""
        }`}
      >
        <div className="flex-1 bg-red-500 h-full">
          <form action="#" className="h-full">
            <input
              type="text"
              className="search-input"
              placeholder="Search Product..."
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </form>
        </div>
        <div className="w-[1px] h-[22px] bg-qgray-border"></div>
        <div className="flex-1 flex items-center w-[200px] px-4 relative cursor-pointer">
          <button
            type="button"
            onClick={handler}
            className="w-full text-xs font-500 text-qgray flex justify-between items-center cursor-pointer"
          >
            <span>{selectedCategory.title}</span>
            <span>
              <svg
                width="10"
                height="5"
                viewBox="0 0 10 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="9.18359"
                  y="0.90918"
                  width="5.78538"
                  height="1.28564"
                  transform="rotate(135 9.18359 0.90918)"
                  fill="#8E8E8E"
                />
                <rect
                  x="5.08984"
                  y="5"
                  width="5.78538"
                  height="1.28564"
                  transform="rotate(-135 5.08984 5)"
                  fill="#8E8E8E"
                />
              </svg>
            </span>
          </button>
          {categoryToggle && (
            <div
              className="fixed top-0 left-0 w-full h-full"
              onClick={handler}
            ></div>
          )}
          <div
            className="category-dropdown absolute top-[30px] overflow-hidden z-40"
            style={{ height: `${elementsSize} ` }}
            ref={dropdownRef}
          >
            <ul className="categories-list w-[196px]">
              <li
                className="category-item border-t border-qgray-border"
                onClick={() =>
                  handleCategoryClick({ title: "All Categories", id: 0 })
                }
              >
                <div
                  className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                >
                  <div className="flex items-center space-x-6">
                    <span className="text-xs font-400">All</span>
                  </div>
                </div>
              </li>
              {categoriesList &&
                categoriesList.length > 0 &&
                categoriesList?.map((item) => (
                  <li
                    className="category-item border-t border-qgray-border"
                    onClick={() => handleCategoryClick(item)}
                  >
                    <div
                      className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                    >
                      <div className="flex items-center space-x-6">
                        <span className="text-xs font-400">{item.title}</span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <button
          onClick={searchSelectedCategory}
          className={`w-[93px] h-full text-sm font-600 ${
            type === 3 ? "bg-qh3-blue text-white" : "search-btn"
          }`}
          type="button"
        >
          Search
        </button>
      </div>
    </>
  );
}
