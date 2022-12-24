import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

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
const Modal = ({ children }) => {

  return (
    <>
      {logged && isOpen ? (
        <>
          <div style={overlay_style} />
          <div
            style={model_styles}
            className="flex flex-col gap-6 px-[60px] py-[40px] mb-[24px] items-center"
          >
            <div className="lg:w-[120px] lg:h-[120px] md:w-[90px] md:h-[90px] lsm:w-[70px] lsm:h-[70px] bg-greenishColor rounded-full border-4 border-borderGreenishColor text-darkGreen lg:text-[60px] md:text-[40px] lsm:text-[30px] text-center flex items-center justify-center">
              <AiOutlineCheckCircle />
            </div>
            <div className="flex flex-col gap-[8px] items-center">
              <h1 className="font-[600] lg:text-[25px] lsm:text-[18px] md:text-[22px] text-greenColor">
                {children}
              </h1>
              <h2 className="font-[600] lg:text-[18px] lsm:text-[10px] md:text-[16px] text-textColor">
                Your ad has been posted
              </h2>
              <div
                onClick={() => {
                  setIsOpenConfirmModal(false);
                  setSubmitOffer(false);
                  setMakeAnOfferDialog(false);
                  setStartLoading(false);
                  router.push(hrefUrl);
                }}
                className="lg:text-[18px] lsm:text-[10px] md:text-[16px] text-center text-white border-1 rounded-md border-brandColor bg-brandColor py-[8px] cursor-pointer w-full"
              >
                {title}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
