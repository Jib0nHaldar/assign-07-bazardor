import Banner from "@/components/Banner";
import MarqueeComponent from "@/components/MarqueeComponent";
import Products from "@/components/Products";

export default function Home() {
  return (
   <div>
      <MarqueeComponent />
      <Banner />
      <Products />
   </div>
  );
}
