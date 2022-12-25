import { GrDocumentUpload } from "react-icons/gr";
import { GrSecure } from "react-icons/gr";
import { HiOutlineViewGrid } from "react-icons/hi";

export default function Home() {
  return (
    <>
      <div className="w-full mb-4 mx-auto p-5">
        <div className="flex flex-col items-center justify-center h-[600px]">
          <h1 className="text-[70px] font-bold text-greenish">
            Welcome to Document Verification
          </h1>
          <p className="text-[40px] font-semibold text-gray-500">
            Verify your documents using public blockchain
          </p>
        </div>

        {/* features */}
        <div className="flex flex-col justify-center items-center w-full mb-10">
          <div className="flex items-center justify-center text-[50px] mb-4">
            Features
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col justify-center items-center gap-3 hover:border-2 hover:border-black p-5 w-[500px] h-[300px] shadow-md">
              <GrDocumentUpload size={30} />
              <h1 className="text-[40px]">Upload Documents</h1>
              <p className="text-[20px]">Upload files to the IPFS</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 hover:border-2 hover:border-black p-5 w-[500px] h-[300px] shadow-md">
              <GrSecure size={30} />
              <h1 className="text-[40px]">Verify Documents</h1>
              <p className="text-[20px]">Verify your documents</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 hover:border-2 hover:border-black p-5 w-[500px] h-[300px] shadow-md">
              <HiOutlineViewGrid size={30} />
              <h1 className="text-[40px]">View Documents</h1>
              <p className="text-[20px]">View your verified files</p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="flex flex-col w-full mb-10">
          <div className="flex items-center justify-center text-[50px] mb-[100px] mt-[100px]">
            How it works
          </div>
          <div className="flex gap-10 items-center justify-evenly">
            <div className="left">
              <img
                src="https://images.pexels.com/photos/12902862/pexels-photo-12902862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="w-[500px] h-[500px]"
              />
            </div>
            <div className="right flex flex-col gap-3 max-w-[49%] p-5">
              <div>
                <h1 className="font-bold text-[30px]">For Admin</h1>
                <ol className="list-decimal my-4 text-[25px]">
                  <li>Connect to metamask wallet</li>
                  <li>Click admin panel</li>
                  <li>Upload multiple/single file</li>
                </ol>
              </div>
              <div>
                <h1 className="font-bold text-[30px]">For Student</h1>
                <ol className="list-decimal my-4 text-[25px]">
                  <li>Connect to metamask wallet</li>
                  <li>Click student panel</li>
                  <li>Upload single file to verify</li>
                  <li>For verify, click verify button only</li>
                  <li>For verify and apply, click verify & apply button</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
