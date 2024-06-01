import loader from "@/assets/icons/loader.svg"

const Loader = () => (
    <div>
      <img
        src={loader}
        alt="loader"
        width={20}
        height={20}
        className="animate-spin"
      />
    </div>
  );
  
  export default Loader;