import { HERO_CARD_TYPES } from "../types";
import { Link } from "react-router-dom";

const HeroCard = ({ img, title, routeLink, imgTitle } : HERO_CARD_TYPES) => {
    return(
        <>
            <Link to={routeLink} className={`w-full rounded-lg border bg-white hover:border-blue-600 p-5  `}>
                <div
                    className="flex flex-col md:h-[230px] md:[300px]-full h-[230px] w-full sm:p-5 p-5 overflow-hidden  dark:bg-black"
                >
                    <img src={img} alt={imgTitle} className="object-cover self-center items-center" width={200} />
                </div>
                <p className="text-xl font-bold text-black-500 text-center">{title}</p>
            </Link>
        </>
    )
}
export default HeroCard;