import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sidebar, ProductCard } from "@/components";
import { PTYPE } from "@/types";

const Category = () => {
  let { categoryName } = useParams();
  const [products, setProducts] = useState<PTYPE>([]);

  return (
    <section className="flex flex-col lg:flex-row md:flex-col sm:flex-col p-4 gap-14">
      <Sidebar setProducts={setProducts} />

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 md:grid-cols-2">
          {products?.map((product) => (
            <Link key={product.id} to={`/detail/${product.id}`}>
              <ProductCard
                key={product.id}
                title={product.title}
                img={product.thumbnail}
                price={product.price}
                productId={product.id}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
