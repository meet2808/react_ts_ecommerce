import React from "react";
import { CATEGORY_LIST } from "@/utils";
import { CATEGORY_LIST_TYPES } from "@/types";
import { Link } from "react-router-dom";

const Sidebar = ({
  setCategory,
  category,
}: {
  category: React.ComponentState;
  setCategory: React.Dispatch<React.SetStateAction<any>>;
}) => {
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
                <li
                  className={`text-sm text-black capitalize ${category === item && 'underline underline-offset-4'} hover:text-black hover:underline underline-offset-4 `}
                >
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
