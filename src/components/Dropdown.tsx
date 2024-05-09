import { DROPDOWN_TYPE } from "@/types";

const Dropdown = ({ name, value, items, label, errors, hasError } : DROPDOWN_TYPE) => {
    return (
        <>
            <div className="flex flex-col my-3 relative">
                <label className="text-[15px]">{label}</label>
                <select name={name} value={value} className="outline-0 ease-in-out dealy-10 border border-neutral-300 h-10 pl-3 focus:border-neutral-400 placeholder:text-neutral-400" >
                    {items?.map((item) => (<option key={item.id} value={name}>{name}</option>))}
                </select>
                {hasError && <small className="text-red-600">{errors}</small>}
            </div>
        </>
    )
}

export default Dropdown;