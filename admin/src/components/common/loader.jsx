import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Loader = () => {
  const { showLoader } = useSelector((state) => state.ui);
  return (
    <div
      className={`fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/20 backdrop-blur-[5px] transition duration-300 ${
        showLoader ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <Oval
        height="110"
        width="110"
        color="#146C94"
        secondaryColor="#ffff"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
