import axios from "axios";
import { getDefaultResultOrder } from "dns/promises";
import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

interface search_result_type {
  id: number;
  thumbnail: string;
  title: string;
  price: string;
}

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const handleSearch = () => {
    const handler = setTimeout(async () => {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
      console.log(response);
      if (response.status === 200) {
        setResults(response?.data.products);
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

        <div className="absolute top-0 right-4">
          <BiSearch className="h-10" />
        </div>
      </div>

      {results.length > 0 && (
        <div className="absolute bg-white border border-gray-300 mt-1 w-full rounded max-h-60 overflow-y-scroll">
          {results.map((product) => (
            <Link to={`/detail/${product.id}`} key={product.id} onClick={() => { setQuery(''); setResults([])}}>
              <div
                //   key={product.id}
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-10 h-10 mr-2"
                />
                <div>
                  <div className="font-bold">{product.title}</div>
                  <div className="text-sm text-gray-600">{`$${product.price}`}</div>
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
