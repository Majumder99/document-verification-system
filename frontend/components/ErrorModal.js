import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { StateContext } from "../context/StateProvider";
import { FaQuestionCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const model_styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  zIndex: 1000,
  borderRadius: "12px",
  minWidth: "250px",
};

const overlay_style = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#D9D9D980",
  zIndex: 1000,
};
const ErrorModal = ({ children, title }) => {
  const {
    web3,
    setWeb3,
    contract,
    setContract,
    account,
    setAccount,
    getFiles,
    uploadFiles,
    loadProvider,
    file,
    setFile,
    veifyFile,
    verifyAndApply,
    showModal,
    setShowModal,
    showErrModal,
    setShowErrModal,
  } = useContext(StateContext);

  return (
    <>
      <div style={overlay_style} />
      <div
        style={model_styles}
        className="flex flex-col gap-6 px-[60px] py-[40px] mb-[24px] items-center relative"
      >
        <div
          className="absolute top-[10px] right-[10px] cursor-pointer"
          onClick={() => setShowErrModal(false)}
        >
          <RxCross1 />
        </div>
        <div className="lg:w-[120px] lg:h-[120px] md:w-[90px] md:h-[90px] lsm:w-[70px] lsm:h-[70px]  lg:text-[60px] md:text-[40px] lsm:text-[30px] text-center flex items-center text-red-700 justify-center">
          <FaQuestionCircle />
        </div>
        <div className="flex flex-col gap-[8px] items-center">
          <h2 className="font-[600] lg:text-[18px] lsm:text-[10px] md:text-[16px]">
            {title}
          </h2>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
