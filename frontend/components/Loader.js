import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

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

function Loader({ showLoader }) {
  //   let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <>
      {showLoader && (
        <>
          <div style={overlay_style} />
          <div
            style={model_styles}
            className="flex flex-col gap-6 px-[60px] py-[40px] mb-[24px] items-center relative"
          >
            <ClipLoader
              color={color}
              loading={showLoader}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      )}
    </>
  );
}

export default Loader;
