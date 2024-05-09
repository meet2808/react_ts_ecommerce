import { useParams } from "react-router-dom";
import { Sidebar, ProductCard } from "@/components";
import img from "@/assets/images/laptop.png";

const Category = () => {
  let { categoryName } = useParams();

  return (
    <section className="flex flex-col lg:flex-row md:flex-col sm:flex-col p-4 gap-14">
      <Sidebar />

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 md:grid-cols-2">
          <ProductCard title={"Hello"} img={img} price={1000} productId={123} />
          <ProductCard title={"Hello"} img={img} price={1000} productId={123} />
          <ProductCard title={"Hello"} img={img} price={1000} productId={123} />
        </div>
      </div>
    </section>
  );
};

export default Category;
