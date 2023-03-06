import React,{useState} from "react";
import {ethers} from 'ethers';


const Warehosue=()=>{

    
    const contractAddress='0xd9145CCE52D386f254917e481eB44e9943F39138'; 
    const[errorMessage,setErrorMessage]=useState(null);
    const[defaultAccount,setDefaultAccount]=useState(null);
    const[connButtonText,setConnButtonText]=useState('Connect Wallet');
    const[provider,setProvider]=useState(null);
    const[signer,setSigner]=useState(null);
    const[contract,setContract]=useState(null);
    
    const accountChangedHandler=(newaccount)=>{
        setDefaultAccount(newaccount);
        updateEthers();

    }

    const updateEthers=()=>{
        let tempProvider = new ethers.provider.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        let tempsigner = tempProvider.getSigner();
        setSigner(tempsigner);

        let tempcontract=new ethers.Contract(contractAddress,)
    }

    const connectWalletHandler=()=>{
        if (Window.ethereum){
            Window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result=>{
                accountChangedHandler (result[0]);
                setConnButtonText('wallet connected');

            })
        } 
        else {
            setErrorMessage('Need to install metamask');
        }


    }
    return(
        <div>
           <h3> Warehouse Management System </h3>
           <button onClick={connectWalletHandler}>{connButtonText}</button>
            <h3>address : {defaultAccount}</h3>



        </div>
    )

}
export default Warehosue;