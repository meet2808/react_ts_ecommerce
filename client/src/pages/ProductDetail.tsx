import { useParams, useNavigate } from "react-router-dom";
import conf from "@/conf/conf";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/useAuthanticate";
import { useCart } from "@/context/useCart";
import { useToast } from "@/components/ui/use-toast";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

const ProductDetail = () => {
  const { toast } = useToast();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addOrUpdateCartItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${conf.productApi}/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    if (
      !isAuthenticated ||
      isAuthenticated == null ||
      isAuthenticated == undefined
    ) {
      toast({ title: "You are not logged in. Please Sign in" });
      navigate("/auth/sign-in");
    } else if (isAuthenticated) {
      let obj = {
        id: product?.id,
        title: product?.title,
        quantity: 1,
        price: product?.price,
        thumbnail: product?.thumbnail,
      };
      addOrUpdateCartItem(obj, "add")
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    product && (
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="lg:flex lg:items-center">
            <div className="lg:flex-shrink-0">
              <img
                className="w-full lg:w-96 h-auto object-cover rounded"
                src={product.images[0]}
                alt={product.title}
              />
            </div>
            <div className="p-6 lg:flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                {product.description}
              </p>
              <div className="mb-4">
                <span className="text-xl font-bold text-blue-600">
                  ${product.price}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Category:{" "}
                </span>
                <span className="text-sm text-gray-700">
                  {product.category}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Brand:{" "}
                </span>
                <span className="text-sm text-gray-700">{product.brand}</span>
              </div>
              <button
                onClick={() => {
                  addToCart();
                }}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  src={image}
                  alt={`Product image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetail;
