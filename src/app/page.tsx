import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import LowProducts from "@/components/LowProducts";
import MarqueeComponent from "@/components/MarqueeComponent";
import Products from "@/components/TopProducts";

export default function Home() {
  return (
   <div>
      <MarqueeComponent />
      <Banner />
      <Products />
      <LowProducts />
      <AllProducts/>
   </div>
  );
}
