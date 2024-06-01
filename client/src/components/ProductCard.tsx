import { PRODUCT_CARD_PROP_TYPES } from "../types";

const ProductCard = ({
  productId,
  title,
  img,
  price,
}: PRODUCT_CARD_PROP_TYPES) => {
  return (
    <>
      <div className="flex flex-col md:h-[300px] md:[400px]-full h-full w-full sm:p-5 p-5 overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black aspect-ratio-16-9">
        <img
          src={img}
          alt={title}
          className="object-cover"
          height={200}
          width={200}
        />
        <div className="md:mt-2 sm:mt-7 flex-col item-center justify-center">
          <p className="text-xl text-black-500 text-center">{title}</p>
          <p className="font-bold text-center">₹{price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
