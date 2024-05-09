import Hero from "@/assets/images/hero.png";

const HeroSection = () => {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row md:flex-col-reverse p-5 lg:py-[30px] lg:px-[120px] md:py-[10px] md:px-4 ">
        {/* Text Section which contains text and button */}
        <div className="flex flex-col gap-2 self-center">
          <div>
            <p className="text-5xl text-ellipsis font-bold text-gray-800">
              Elevate your style with our trendsetting collection
            </p>
            <br />
            <p className="text-lg text-ellipsis text-gray-700">
              Unleash confidence, embrace comfort – redefine your wardrobe with
              our signature tees
            </p>
          </div>

          {/* Buy now button which will redirect user to the t-shirt section page */}
          <div>
            <button className="bg-slate-900 h-12 w-[150px] text-white uppercase border hover:text-slate-900 hover:border-slate-900 hover:bg-transparent hover:ease-in-out hover:delay-10">
              Buy Now
            </button>
          </div>
        </div>

        {/* T-shirt image */}
        <img
          src={Hero}
          alt="men t-shirt"
          height={300}
          width={300}
          className="md:self-center sm:self-center"
        />
      </div>
    </>
  );
};

export default HeroSection;