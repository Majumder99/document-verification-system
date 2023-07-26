import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Verify from "../../contract/build/contracts/CertificateVerification.json";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import Web3 from "web3";
import moment from "moment";
import { create as IPFSHTTPClient } from "ipfs-http-client";
import CryptoJS from "crypto-js";

export const StateContext = React.createContext();

const projectId = process.env.NEXT_PUBLIC_IPFS_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = IPFSHTTPClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const StateProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [file, setFile] = useState([]);
  const [showNav, setShowNav] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [showErrModal, setShowErrModal] = useState(null);
  const [showLoader, setShowLoader] = useState(null);
  const [cid, setCid] = useState(null);
  const [name, setName] = useState(null);
  const [time, setTime] = useState(null);
  const [providerShow, setProviderShow] = useState(true);
  const [hasValue, setHasValue] = useState(null);

  const [fileTimes, setFileTimes] = useState({});
  const [verifyFileTimes, setVerifyFileTimes] = useState({});

  // Load data from local storage on component mount for uploading files
  useEffect(() => {
    const storedData = localStorage.getItem("fileUploadData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Set the state using data from local storage
      setFileTimes(parsedData.fileTimes || {});
    }
  }, []);

  // Function to store state in local storage for uploading files
  useEffect(() => {
    const dataToStore = {
      fileTimes,
    };
    localStorage.setItem("fileUploadData", JSON.stringify(dataToStore));
  }, [fileTimes]);

  // Load data from local storage on component mount for verifying files
  useEffect(() => {
    const storedVerifyData = localStorage.getItem("verifyFileUploadData");
    if (storedVerifyData) {
      const parsedData = JSON.parse(storedVerifyData);
      // Set the state using data from local storage
      setVerifyFileTimes(parsedData.verifyFileTimes || {});
    }
  }, []);

  // Function to store state in local storage for verifying files
  useEffect(() => {
    const verifyDataToStore = {
      verifyFileTimes,
    };
    localStorage.setItem(
      "verifyFileUploadData",
      JSON.stringify(verifyDataToStore)
    );
  }, [verifyFileTimes]);

  // ... Existing functions ...

  const loadProvider = async () => {
    console.log("I am running");
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log("insinde provider");
      await provider.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(
        Verify.abi,
        Verify.networks[5777].address
      );
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setWeb3(web3);
      setContract(contract);
      setFile(null);
      setCid(null);
      setName(null);
      setTime(null);
    } else {
      console.error("Please install MetaMask!");
    }
  };

  console.log({ web3, contract, account });

  const uploadFilesToIpfs = async (e) => {
    e.preventDefault();
    console.log({ client });
    // Set the start time when uploading begins
    const startTime = Date.now();

    // File upload logic...
    try {
      setShowLoader(true);
      for (let i = 0; i < hasValue.length; i++) {
        const added = await client.add(hasValue[i]);
        console.log("after uploadf files added", added, added.path);
        const result = await contract.methods.add_files(added.path).send({
          from: account,
        });
        if (result.events.outputResult.returnValues[0]) {
          console.log(`File ${i + 1} uploaded successfully`);
        } else {
          console.log(`File ${i + 1} is already uploaded`);
        }
      }

      // Store the end time when upload is complete
      const endTime = Date.now();
      const fileSize = hasValue.length;

      // Calculate the time taken in minutes and update the state
      const timeTaken = (endTime - startTime) / (1000 * 60);
      setFileTimes((prevFileTimes) => ({
        ...prevFileTimes,
        [fileSize]: timeTaken,
      }));
      setShowLoader(false);
      setHasValue(null);
      setFile(null);
    } catch (error) {
      console.log("the errosr, ", error);
      setShowLoader(false);
      setHasValue(null);
      alert("You are not admin");
    }
  };

  const getFilesFromIpfs = async (e) => {
    e.preventDefault();
    console.log({ client });
    try {
      //   const added = await client.add("Sourav");
      // "QmZKPeoZp3MWXCMVWfKap5zjS44Nd3zcLq18i6vv4sgyQ7";
      const added = await client.cat(hash);
      for await (const itr of added) {
        let data = Buffer.from(itr).toString();
        console.log(data);
      }
      //   console.log({ added });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const fileContentsPromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      fileContentsPromises.push(
        new Promise((resolve) => {
          reader.onload = () => {
            const fileContents = reader.result;
            const hashedData = CryptoJS.SHA256(fileContents);
            const hashString = hashedData.toString(CryptoJS.enc.Hex);
            resolve(hashString);
          };
          reader.readAsBinaryString(file);
        })
      );
    }

    Promise.all(fileContentsPromises)
      .then((hashes) => {
        console.log("hashed", hashes);
        setHasValue(hashes);
      })
      .catch((error) => {
        console.log("Error reading files:", error);
      });
  };

  // we will not use it
  const uploadFiles = async (e) => {
    e.preventDefault();
    const startTime = Date.now();

    try {
      setShowLoader(true);
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
        // alert(result.events.outputResult.returnValues[0]);
        if (result.events.outputResult.returnValues[0]) {
          setShowLoader(false);
          setShowModal(true);
          setShowErrModal(false);
        } else {
          setShowLoader(false);
          setShowModal(false);
          setShowErrModal(true);
        }
      }
      setFile(null);
    } catch (error) {
      setFile(null);
      setShowLoader(false);
      console.log({ error });
      alert("You are not admin");
    }
    setFile(null);
  };

  const veifyFile = async (e) => {
    e.preventDefault();
    const startTime = Date.now();

    try {
      setShowLoader(true);
      console.log("before upload");
      for (let i = 0; i < hasValue.length; i++) {
        const added = await client.add(hasValue[i]);
        const result = await contract.methods.verifyDocument(added.path).send({
          from: account,
        });
        if (result.events.outputResult.returnValues[0]) {
          console.log(`File ${i + 1} verified successfully`);
        } else {
          console.log(`File ${i + 1} not verified successfully`);
        }
      }

      // Store the end time when upload is complete
      const endTime = Date.now();
      const fileSize = hasValue.length;

      // Calculate the time taken in minutes and update the state
      const timeTaken = (endTime - startTime) / (1000 * 60);
      setVerifyFileTimes((prevFileTimes) => ({
        ...prevFileTimes,
        [fileSize]: timeTaken,
      }));
      setShowLoader(false);
      setHasValue(null);
      setFile(null);
      // console.log({ result });
      // console.log({ outputResult: result.events.outputResult.returnValues[0] });
      // // alert(result.events.outputResult.returnValues[0]);
      // if (result.events.outputResult.returnValues[0]) {
      //   setShowLoader(false);
      //   setShowModal(true);
      //   setShowErrModal(false);
      // } else {
      //   setShowLoader(false);
      //   setShowModal(false);
      //   setShowErrModal(true);
      // }
      // console.log("after upload");
      // console.log("stored files with cid:", cid);
    } catch (error) {
      setShowLoader(false);
      console.log({ error });
      alert("You are not student");
    }
  };

  console.log({ file });
  const verifyAndApply = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      console.log("before upload");
      // const client = new Web3Storage({
      //   token:
      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2MjdmMmVBNTQ5Y0FGQkZDZjA3QkFlZDI3MTM1NTAxQ0FmMzg3YTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2NTExNDY2MDAsIm5hbWUiOiJ0ZXN0aW5nIn0.2gcgFGxCcL4eR7CV8z_suiDn28i8kb1KLi9iB6EXnrc",
      // });
      // // console.log({ client });
      // // console.log({ e, file });
      // const cid = await client.put(file);
      // console.log("verif", cid);
      // const result = getFiles(cid)

      const added = await client.add(hasValue);
      console.log(added.path);
      const result = await contract.methods
        .verifyApplyDocument(added.path)
        .send({
          from: account,
        });

      console.log({ result });
      console.log({ outputResult: result.events.outputResult.returnValues[0] });
      if (result.events.outputResult.returnValues[0]) {
        setShowLoader(false);
        setShowNav(true);
        setShowModal(true);
        setShowErrModal(false);
        alert("You can now apply to university");
      }
    } catch (error) {
      console.log("Error", error);
      setShowLoader(false);
      setShowNav(false);
      setShowModal(false);
      setShowErrModal(true);
      alert("You can't apply to university");
    }
  };

  const getFiles = async (e) => {
    e.preventDefault();
    try {
      // const client = new Web3Storage({
      //   token:
      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2MjdmMmVBNTQ5Y0FGQkZDZjA3QkFlZDI3MTM1NTAxQ0FmMzg3YTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2NTExNDY2MDAsIm5hbWUiOiJ0ZXN0aW5nIn0.2gcgFGxCcL4eR7CV8z_suiDn28i8kb1KLi9iB6EXnrc",
      // });
      // console.log("before files", client);
      // console.log({ contract });
      // const added = await client.add(hasValue);
      // console.log(added.path);
      const result = await contract.methods.get_ipfs_cid().send({
        from: account,
      });
      console.log({ result });
      const hash = result.events.outputCid.returnValues[0];
      const added = await client.cat(hash);
      let data;
      for await (const itr of added) {
        data = Buffer.from(itr).toString();
        console.log("hashed data", data);
      }
      console.log("added data", added);
      // const unixTime = files[0].lastModified * 1000;
      // const dateString = moment.unix(unixTime).format("L");
      // const dataString = moment(files[0].lastModified).format("L");
      // setCid(cid);
      // setName(files[0].name);
      // setTime(dataString);
      // console.log({ files });
      // setFile(null);
    } catch (error) {
      console.log({ error });
      setFile(null);
      alert("You are not student");
    }
  };
  console.log({ cid, name, time });

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
    verifyAndApply,
    showNav,
    setShowNav,
    showModal,
    setShowModal,
    cid,
    setCid,
    name,
    setName,
    time,
    setTime,
    showLoader,
    setShowLoader,
    showErrModal,
    setShowErrModal,
    providerShow,
    setProviderShow,
    uploadFilesToIpfs,
    getFilesFromIpfs,
    handleFileInputChange,
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
