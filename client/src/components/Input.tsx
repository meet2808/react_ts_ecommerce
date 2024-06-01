import { BiShow, BiSolidHide } from "react-icons/bi";
import { useState, useEffect } from "react";
import { IType } from "@/types";

const Input = ({
  type,
  label,
  value,
  errors,
  required,
  placeholder,
  hasError,
  register,
  fullWidth = false,
  ...props
}: IType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);

  useEffect(() => {
    if (type === "password" && showPassword) setInputType("text");

    if (type === "password" && !showPassword) setInputType("password");
  }, [type, showPassword]);

  return (
    <>
      {!fullWidth ? (
        <div className="flex flex-col my-3 relative">
          <label className="text-[15px]">{label}</label>

          <input
            type={inputType}
            placeholder={placeholder}
            className="outline-0 ease-in-out dealy-10 border border-neutral-300 h-10 pl-3 focus:border-neutral-400 placeholder:text-neutral-400"
            {...register(value)}
          />
          {type === "password" &&
            (showPassword ? (
              <BiShow
                className="absolute right-3 top-8 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <BiSolidHide
                className="absolute right-3 top-8 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ))}

          {hasError && <small className="text-red-600">{errors}</small>}
        </div>
      ) : (
        <div className="flex flex-col my-3 relative">
          <label className="text-[15px]">{label}</label>

          <textarea
            placeholder={placeholder}
            {...register(value)}
            className="outline-0 ease-in-out dealy-10 border border-neutral-300 h-20 pl-3 pt-3 focus:border-neutral-400 placeholder:text-neutral-400"
            rows={10}
            {...props}
          ></textarea>

          {hasError && <small className="text-red-600">{errors}</small>}
        </div>
      )}
    </>
  );
};
export default Input;
