import { useContext } from "react";
import Navbar from "../components/Navbar";
import { StateContext } from "../context/StateProvider";

export default function Home() {
  // const {
  //   web3,
  //   setWeb3,
  //   contract,
  //   setContract,
  //   account,
  //   setAccount,
  //   getFiles,
  //   uploadFiles,
  //   loadProvider,
  //   file,
  //   setFile,
  //   veifyFile,
  // } = useContext(StateContext);
  // console.log("page", files);

  return (
    <>
      <h1>Welcome to document verification</h1>
      {/* <div
        className="border-2 border-black p-5 w-1/2 cursor-pointer"
        onClick={loadProvider}
      >
        Click to connect wallet
      </div>
      <div>
        <input
          type="file"
          placeholder="add files"
          onChange={(e) => setFile(e.target.files)}
        />
        <button onClick={uploadFiles}>Upload</button>
      </div>
      <div>
        <input
          type="file"
          placeholder="add files"
          onChange={(e) => setFile(e.target.files)}
        />
        <button onClick={veifyFile}>Verified</button>
      </div> */}
      {/* <button onClick={getFiles}>GetFile</button> */}
    </>
  );
}
