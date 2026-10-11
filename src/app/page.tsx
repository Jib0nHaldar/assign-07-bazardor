import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import LowProducts from "@/components/LowProducts";
import Products from "@/components/TopProducts";

export default function Home() {
  return (
   <div>
      
      <Banner />
      <Products />
      <LowProducts />
      <AllProducts/>
   </div>
  );
}
