import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function SearchBox({ className, type }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const {categoriesList} = useSelector((state) => state.categoriesList);
  const dropdownRef = useRef(null);

  const handler = () => {
    setToggle(!categoryToggle);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
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

  const categoriesArray=[{text:"category 1"},{text:"category 2"},{text:"category 3"}]

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
            <span>{selectedCategory}</span>
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
            <div className="fixed top-0 left-0 w-full h-full" onClick={handler}></div>
          )}
          <div
            className="category-dropdown absolute top-[30px] overflow-hidden z-40"
            style={{ height: `${elementsSize} ` }}
            ref={dropdownRef}
          >
            <ul className="categories-list w-[196px]">
            <li className="category-item border-t border-qgray-border">
                <a href="#" onClick={() => handleCategoryClick("All categories")}>
                  <div
                    className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                  >
                    <div className="flex items-center space-x-6">
                      <span className="text-xs font-400">All categories</span>
                    </div>
                  </div>
                </a>
              </li>
            {categoriesList && categoriesList.length > 0 && categoriesList?.map((item)=>(
              <li className="category-item border-t border-qgray-border">
                <a href="#" onClick={() => handleCategoryClick(item.title)}>
                  <div
                    className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-qyellow`}
                  >
                    <div className="flex items-center space-x-6">
                      <span className="text-xs font-400">{item.title}</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
            </ul>
          </div>
        </div>
        <button
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
