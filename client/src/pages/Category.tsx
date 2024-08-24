import React, { useState, useEffect, useCallback, ComponentState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sidebar, ProductCard } from "@/components";
import { PTYPE } from "@/types";
import { getProducts } from "@/api/api";
import { Loader, Loader2 } from "lucide-react";

const Category = () => {
  let { categoryName } = useParams<string>();
  const [category, setCategory] = useState<string>("all");
  const [prevCategory, setPrevCategory] = useState<string>('');
  const [products, setProducts] = useState<PTYPE>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getProducts(category);
      setProducts(products);
      setPrevCategory(category); // Update previous category after successful fetch
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [category, prevCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // useEffect(() => {
  //   const handleBeforeUnload = (event : any) => {
  //     event.preventDefault();
  //     // Custom logic to handle the refresh
  //     // Display a confirmation message or perform necessary actions
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   console.log("after the page refresh");
  //   setCategory(categoryName!)
    
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  // useEffect(() => {
  //   if(categoryName)
  //     setCategory(categoryName || "all")
  // }, [categoryName])

  return (
    <section className="flex flex-col lg:flex-row md:flex-col sm:flex-col p-4 gap-14">
      <Sidebar setCategory={setCategory} category={category} />

      {loading ? (
        <div
          className="m-auto flex flex-row items-center justify-between gap-3 font-bold"
        >
          <Loader2 className="animate-spin" width={30} height={30} />Loading...
        </div>
      ) : (
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
      )}
    </section>
  );
};

export default Category;
