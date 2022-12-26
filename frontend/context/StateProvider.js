import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Verify from "../../contract/build/contracts/CertificateVerification.json";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import Web3 from "web3";
import moment from "moment";

export const StateContext = React.createContext();

const StateProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [file, setFile] = useState(null);
  const [showNav, setShowNav] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [showErrModal, setShowErrModal] = useState(null);
  const [showLoader, setShowLoader] = useState(null);
  const [cid, setCid] = useState(null);
  const [name, setName] = useState(null);
  const [time, setTime] = useState(null);
  const [providerShow, setProviderShow] = useState(true);

  const loadProvider = async () => {
    console.log("I am running");
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log("insinde provider");
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
      setFile(null);
      setCid(null);
      setName(null);
      setTime(null);
    } else {
      console.error("Please install MetaMask!");
    }
  };

  console.log({ web3, contract, account });

  const uploadFiles = async (e) => {
    e.preventDefault();
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
    try {
      setShowLoader(true);
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
      console.log({ outputResult: result.events.outputResult.returnValues[0] });
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
      console.log("after upload");
      console.log("stored files with cid:", cid);
      setFile(null);
    } catch (error) {
      setFile(null);
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
      const client = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2MjdmMmVBNTQ5Y0FGQkZDZjA3QkFlZDI3MTM1NTAxQ0FmMzg3YTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2NTExNDY2MDAsIm5hbWUiOiJ0ZXN0aW5nIn0.2gcgFGxCcL4eR7CV8z_suiDn28i8kb1KLi9iB6EXnrc",
      });
      // console.log({ client });
      // console.log({ e, file });
      const cid = await client.put(file);
      console.log("verif", cid);
      // const result = getFiles(cid)

      const result = await contract.methods.verifyApplyDocument(cid).send({
        from: account,
      });

      console.log({ result });
      console.log({ outputResult: result.events.outputResult.returnValues[0] });
      if (result.events.outputResult.returnValues[0]) {
        setShowLoader(false);
        setShowNav(true);
        setShowModal(true);
        setShowErrModal(false);
      } else {
        setShowLoader(false);
        setShowNav(false);
        setShowModal(false);
        setShowErrModal(true);
      }
      // alert(result.events.outputResult.returnValues[0]);
      console.log("after upload");
      console.log("stored files with cid:", cid);
      setFile(null);
    } catch (error) {
      setFile(null);
      setShowLoader(false);
      console.log({ error });
      alert("You are not student");
    }
  };

  const getFiles = async (e) => {
    e.preventDefault();
    try {
      const client = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2MjdmMmVBNTQ5Y0FGQkZDZjA3QkFlZDI3MTM1NTAxQ0FmMzg3YTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk2NTExNDY2MDAsIm5hbWUiOiJ0ZXN0aW5nIn0.2gcgFGxCcL4eR7CV8z_suiDn28i8kb1KLi9iB6EXnrc",
      });
      console.log("before files", client);
      console.log({ contract });
      const result = await contract.methods.get_ipfs_cid().send({
        from: account,
      });
      console.log({ result });
      const cid = result.events.outputCid.returnValues[0];
      const res = await client.get(cid);
      console.log({ res });
      const files = await res.files();
      // const unixTime = files[0].lastModified * 1000;
      // const dateString = moment.unix(unixTime).format("L");
      const dataString = moment(files[0].lastModified).format("L");
      setCid(cid);
      setName(files[0].name);
      setTime(dataString);
      console.log({ files });
      setFile(null);
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
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;

// bafybeidy4fsdj4hm6aw4d46yfs462o2lwtbujbuj3cpdf7ichmhk5qfhdi;
// bafybeiehhfuyrp4c6eai36n2utfcacwnk46xrqmtq3xwxr5txlvtbnsbzm;
