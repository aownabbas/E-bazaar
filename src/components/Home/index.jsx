import datas from "../../data/products.json";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";
import { _getCategories } from "../../https/categories";
import _getCategoriesList from "../../redux/action/categories";

export default function Home() {
  const { products } = datas;
  const brands = [];
  products.forEach((product) => {
    brands.push(product.brand);
  });

  return (
    <>
      <Layout>
        {/* {ads && <Ads handler={adsHandle} />} */}
        <div className="btn w-5 h-5"></div>
        <Banner className="banner-wrapper mb-[60px]" />
        <SectionStyleThree
          products={products}
          sectionTitle="Top Selling Products"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
        <ProductsAds
          sectionHeight="164"
          ads={[`${import.meta.env.VITE_PUBLIC_URL}assets/images/ads-4.png`]}
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOne
          products={products}
          brands={brands}
          categoryTitle="Popular Store"
          sectionTitle="Electronic Accessories"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <BrandSection
          sectionTitle="Shop by Brand"
          className="brand-section-wrapper mb-[60px]"
        />
        <CampaignCountDown
          className="mb-[60px]"
          lastDate="2023-10-04 4:00:00"
        />
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Men's Fashion"
        >
          <SectionStyleTwo products={products.slice(3, products.length)} />
        </ViewMoreTitle>
        <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Best Saller"
        >
          <BestSellers />
        </ViewMoreTitle>
        <ProductsAds
          ads={[
            `${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-1.png`,
            `${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-2.png`,
          ]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOne
          categoryBackground={`${
            import.meta.env.VITE_PUBLIC_URL
          }/assets/images/women-fashion.png`}
          products={products.slice(4, products.length)}
          brands={brands}
          categoryTitle=""
          sectionTitle="Women's Fashion"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <ProductsAds
          ads={[`${import.meta.env.VITE_PUBLIC_URL}/assets/images/ads-3.png`]}
          className="products-ads-section mb-[60px]"
        />
        
        {/* <SectionStyleFour
          products={products}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        /> */}
      </Layout>
    </>
  );
}
