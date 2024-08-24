import loader from "@/assets/icons/loader.svg"

const Loader = ({ width, height} : { width : number, height : number}) => (
    <div>
      <img
        src={loader}
        alt="loader"
        width={width}
        height={height}
        className="animate-spin bg-black"
      />
    </div>
  );
  
  export default Loader;