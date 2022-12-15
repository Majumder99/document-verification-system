import React, { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Verify from "../../contract/build/contracts/CertificateVerification.json";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import Web3 from "web3";

export const StateContext = React.createContext();

const StateProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [file, setFile] = useState(null);
  const [cids, setCids] = useState([]);
  console.log("context", file);

  const loadProvider = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      provider.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(
        Verify.abi,
        Verify.networks[5777].address
      );
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setWeb3(web3);
      setContract(contract);
    } else {
      console.error("Please install MetaMask!");
    }
  };

  console.log({ web3, contract, account });

  const uploadFiles = async (e) => {
    e.preventDefault();
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2MjdmMmVBNTQ5Y0FGQkZDZjA3QkFlZDI3MTM1NTAxQ0FmMzg3YTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2NTExNDY2MDAsIm5hbWUiOiJ0ZXN0aW5nIn0.2gcgFGxCcL4eR7CV8z_suiDn28i8kb1KLi9iB6EXnrc",
    });

    for (let i = 0; i < file.length; i++) {
      //on the loading modal
      console.log("before upload");
      let files = [];
      files.push(file[i]);
      const cid = await client.put(files);
      //close the loading modal
      const result = await contract.methods.add_files(cid).send({
        from: account,
      });
      console.log("after upload", cid);
      console.log("result", result);
    }
    setFile(null);
  };

  const veifyFile = async (e) => {
    e.preventDefault();
    console.log("before upload");
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2MjdmMmVBNTQ5Y0FGQkZDZjA3QkFlZDI3MTM1NTAxQ0FmMzg3YTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2NTExNDY2MDAsIm5hbWUiOiJ0ZXN0aW5nIn0.2gcgFGxCcL4eR7CV8z_suiDn28i8kb1KLi9iB6EXnrc",
    });
    // console.log({ client });
    // console.log({ e, file });
    const cid = await client.put(file);
    console.log("verif", cid);
    // const result = getFiles(cid)

    const result = await contract.methods.verifyDocument(cid).send({
      from: account,
    });
    console.log({ result });

    console.log("after upload");
    console.log("stored files with cid:", cid);
  };

  const getFiles = async (cid) => {
    // e.preventDefault();
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2MjdmMmVBNTQ5Y0FGQkZDZjA3QkFlZDI3MTM1NTAxQ0FmMzg3YTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2NTExNDY2MDAsIm5hbWUiOiJ0ZXN0aW5nIn0.2gcgFGxCcL4eR7CV8z_suiDn28i8kb1KLi9iB6EXnrc",
    });
    console.log("before files", client);
    const res = await client.get(cid);
    const files = await res.files();
    console.log(files[0].cid);
  };

  const value = {
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
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
//   const download = async () => {
//     try {
//       const val =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2MjdmMmVBNTQ5Y0FGQkZDZjA3QkFlZDI3MTM1NTAxQ0FmMzg3YTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2NTExNDY2MDAsIm5hbWUiOiJ0ZXN0aW5nIn0.2gcgFGxCcL4eR7CV8z_suiDn28i8kb1KLi9iB6EXnrc";
//       const response = await axios({
//         method: "get",
//         headers: { Authorization: `Bearer ${val}` },
//         url: "https://api.web3.storage/user/uploads/bafybeiasimfsm4jhfuz3heelgrurd3yp6etojl2lspu527agxy6njatlia",
//       });
//       if (response) {
//         console.log(response);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //see file using this
//   //bafybeidd2gyhagleh47qeg77xqndy2qy3yzn4vkxmk775bg2t5lpuy7pcu.ipfs.w3s.link/youareanonsense.jpg

//   https: return (
//     <>
//       <div>
//         <input type="file" onChange={(e) => setFiles(e.target.files)} />
//         <button onClick={uploadFiles}>Upload</button>
//         <button onClick={getFiles}>Get files</button>
//         {/* <button onClick={download}>download</button> */}
//         <button>
//           <a
//             class="ipfs-downloader"
//             data-cid="/ipfs/bafybeiasimfsm4jhfuz3heelgrurd3yp6etojl2lspu527agxy6njatlia"
//             download="filename.ext"
//           >
//             Download label
//           </a>
//         </button>
//       </div>
//     </>
//   );
// }
