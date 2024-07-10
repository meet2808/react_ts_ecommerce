import { Input, Dropdown } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import laptop from "@/assets/images/laptop.png"

const Checkout = () => {
    const items = [
        { id : 1, name : "Item 1"},
        { id : 2, name : "Item 2"},
        { id : 3, name : "Item 3"},
    ]

    return(
        <>
            {/* Main Div which conatins product list details and shipping form side by side */}
            <div className="flex flex-row justify-evenly">

                {/* div which contains product list details */}
                <div className="flex flex-col flex-3 justify-between p-1 h-full overflow-hidden">
                    <ul className="flex-grow overflow-auto py-4">
                        <li className="mx-2">
                            <div className="flex flex-row gap-3 px-2 py-2 item-center">
                                <div>
                                    <img src={laptop} className="w-[150px] h-[140px]" />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <span className="text-lg">How to win friends and Influence people</span>
                                    <div className="flex flex-row items-center justify-between text-neutral-500">
                                        <span>₹100</span>
                                        <span>Qty 1</span>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="mx-2">
                            <div className="flex flex-row gap-3 px-2 py-2 item-center">
                                <div>
                                    <img src={laptop} className="w-[150px] h-[140px]" />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <span className="text-lg">How to win friends and Influence people</span>
                                    <div className="flex flex-row items-center justify-between text-neutral-500">
                                        <span>₹100</span>
                                        <span>Qty 1</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="flex flex-col gap-2 py-5 px-10">
                        <div className="flex flex-row">
                            <span>Total</span>
                            <span>₹400</span>
                        </div>
                    </div>
                </div>

                {/* div which contains shipping form */}
                <div className="w-96 pt-3">
                    <h1 className="text-[30px] font-bold">Shipping Details</h1>
                    <Input type={"text"} name="fullname" label="Full Name" errors={"Please enter your name"} value={""} placeholder={"Full Name"} hasError={false} />

                    <Input type={"text"} name="mobile" label="Mobile" errors={"Please enter your mobile"} value={""} placeholder={"Mobile"} hasError={false} />

                    <Input type={"text"} name={"address"} label={"Address"} errors={"Please enter your address"} value={""} placeholder={"Address"} hasError={false} fullWidth />

                    <Input type={"number"} name={"pincode"} label={"Pincode"} errors={"Please enter your pincode"} value={""} placeholder={"Pincode"} hasError={false} />

                    <Dropdown name={"state"} value={""} items={items} label={"State"} errors={"Please select your state"} hasError={false} />

                    <Dropdown name={"district"} value={""} items={items} label={"District"} errors={"Please select your district"} hasError={false} />

                    <button className="bg-slate-900 h-12 w-full text-white uppercase border hover:text-slate-900 hover:border-slate-900 hover:bg-transparent hover:ease-in-out hover:delay-10">Countinue To Payment</button>
                </div>
            </div >
        </>
    )
}

export default Checkout;