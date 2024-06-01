import { BiCart } from "react-icons/bi";

type PropType = {
    quantity : number
}

const OpenCart = ({ quantity } : PropType) => {
    return (
        <div>
            <BiCart className="text-md" size={25} />
            {quantity ? (
                <div className="absolute top-4 right-14  h-4 w-4 rounded-full bg-blue-600 text-[11px] font-medium text-white">
                    {quantity}
                </div>
            ) : null}
        </div>
    )
}

export default OpenCart;