import axios from "axios";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { Link } from "react-router-dom";

interface search_result_type {
  id: number;
  thumbnail: string;
  title: string;
  price: string;
  category: string;
}

const ALLOWED_CATEGORIES = [
  "mens-shirts",
  "laptops",
  "womens-bags",
  "mens-shoes",
  "mens-watches",
  "sunglasses",
];

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<search_result_type[]>([]);
 
  const cancelSearch = () => {
    setResults([]);
    setQuery("");
  };

  const handleSearch = () => {
    const handler = setTimeout(async () => {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
      console.log(response);
      if (response.status === 200) {
        const filteredResults = response.data.products.filter(
          (product: search_result_type) =>
            ALLOWED_CATEGORIES.includes(product.category)
        );
        setResults(filteredResults);
      }
    }, 500); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  };

  useEffect(() => {
    if (query.length > 0) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [query]);
  return (
    <div className="relative w-max-[550px] w-full lg:w-80 md:w-60 xl:w-full">
      <div>
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md h-10 p-4 border text-sm text-black placeholder:text-neutral-500"
        />

        <div className="absolute flex items-center gap-4 top-0 right-4">
        {query.length > 0 && <BsX className="cursor-pointer" size={24} onClick={() => cancelSearch()} />}
          <BiSearch className="h-10" />
        </div>
      </div>

      {results.length > 0 && (
        <div className="absolute bg-white border border-gray-300 mt-1 w-full rounded max-h-60 overflow-y-scroll">
          {results.map((product) => (
            <Link
              to={`/detail/${product.id}`}
              key={product.id}
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <div
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-10 h-10 mr-2"
                />
                <div>
                  <div className="font-bold">{product.title}</div>
                  <div className="text-sm text-gray-600">{`₹${product.price}`}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default Search;
