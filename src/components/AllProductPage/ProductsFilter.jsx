import Checkbox from "../Helpers/Checkbox";
import { React, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

// function valuetext(value) {
//   return `${value}%`;
// }

export default function ProductsFilter({
  checkboxHandler,
  className,
  filterToggle,
  filterToggleHandler,
  categoriesList,
  setProductList,
}) {
  const { searchedProducts } = useSelector((state) => state.searchedProducts);
  const { products } = searchedProducts;

  // const classes = useStyles();
  const [value, setValue] = useState([0, 5000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const filteredItems = products.filter(
      (item) => item.price >= newValue[0] && item.price <= newValue[1]
    );
    setProductList(filteredItems);
  };

  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ""
        }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Product categories
            </h1>
          </div>
          <div className="filter-items">
            <ul>
              {categoriesList?.map((item) => (
                <li className="item flex justify-between items-center mb-5">
                  <div className="flex space-x-[14px] items-center">
                    <div>
                      <Checkbox
                        id={item.id}
                        name={item.title}
                        handleChange={checkboxHandler}
                        // checked={filterProductsIds.includes(item.id)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={item.id}
                        className="text-xs font-black font-400 capitalize"
                      >
                        {item.title}
                      </label>
                    </div>
                  </div>
                  <div>
                    <span className="cursor-pointer">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect y="4" width="10" height="2" fill="#C4C4C4" />
                        <rect
                          x="6"
                          width="10"
                          height="2"
                          transform="rotate(90 6 0)"
                          fill="#C4C4C4"
                        />
                      </svg>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Price Range</h1>
          </div>
          <div className="price-range mb-5">
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              // getAriaValueText={valuetext}
              min={0}
              max={5000}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Price: Rs{value[0]}- Rs{value[1]}
          </p>
        </div>
      </div>
    </>
  );
}
