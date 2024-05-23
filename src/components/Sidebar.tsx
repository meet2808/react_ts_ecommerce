import React, { useState, useEffect } from "react";
import { CATEGORY_LIST } from "@/utils";
import { CATEGORY_LIST_TYPES, PTYPE } from "@/types";
import { Link } from "react-router-dom";
import { getProducts } from "@/api/api";

const Sidebar = ({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<PTYPE>>;
}) => {
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(category); // Await the promise here
        setProducts(products); // Set the resolved products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, setProducts]);

  return (
    <>
      <section className="gap-4 hidden md:hidden lg:block">
        <div className="flex flex-col gap-3">
          <span className="text-sm text-neutral-500">Category</span>

          <ul className="flex flex-col gap-2">
            {CATEGORY_LIST.map((item: CATEGORY_LIST_TYPES) => (
              <Link
                to={`${item.link}`}
                key={item.label}
                onClick={() => {
                  setCategory(item.category);
                }}
              >
                <li className="text-sm text-black capitalize hover:text-black hover:underline underline-offset-4">
                  {item.label}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
