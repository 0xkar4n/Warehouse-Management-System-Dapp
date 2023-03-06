
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { readContract } from '@wagmi/core';
import { useAccount } from 'wagmi';
import { Link } from "react-router-dom";


const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/6ls7UbYyRKU_dCr0JXyfV6QXd-VplZyW');
const contractAddress = '0x3438aa469f1bd4f5ff629dac013851410745c159'; // replace with your contract address
const contractAbi = [{
    "inputs": [],
    "name": "create_wareshouse",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "Creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "warecontract",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      }
    ],
    "name": "Warehouse_Created",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "deployedContracts",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "wallet",
        "type": "address"
      }
    ],
    "name": "getDeployedContracts",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }]; // replace with your contract ABI

const contract = new ethers.Contract(contractAddress, contractAbi, provider);




export default function Home(){
    const [dataArray, setDataArray] = useState([]);
    const { address } = useAccount()

  useEffect(() => {
    async function fetchData() {
      const result = await readContract({
        address: contractAddress,
        abi:contractAbi ,
        functionName: 'getDeployedContracts',
        args: [address],

      });
      setDataArray(result);
    }

    fetchData();
  }, []);
    
    return(<div>
        <h1 className='text-center my-6 text-blue-700 font-serif font-semibold md:text-5xl text-2xl'> Manage your warehouse</h1>
        <br></br>
        {/*<div className="block grid grid-cols-4 gap-2 mt-6 space-x-5 p-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        {dataArray.map((data, index) => (
             <div className="card" key={index}>
            <div className=" text-center bg-cyan text-serif font-semibold p-2 bg-white border-2 border-blue-600 rounded-lg " >
        
            <h3 > Warehouse {index+1}</h3>
           
          </div>
          <div className="card-body">
            <p>{data}</p>
          </div>
        </div>
        
      ))}
        </div >*/}
    <div className="block grid grid-cols-4 gap-2 mt-6 space-x-5 p-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    {dataArray.map((childAddress,index) => (
        <div key={childAddress}>
          <Link to={`/ManageWarehouse/${childAddress}`}>
          <div className="card" key={index}>
            <div className=" text-center bg-cyan text-serif font-semibold p-2 bg-white border-2 border-blue-600 rounded-lg " >
        
            <h3 > Warehouse {index+1}</h3>
           
          </div>
          <div className="card-body">
            <p>{childAddress}</p>
          </div>
        </div>

          </Link>
        </div>
      ))}
      </div>

    </div>);
}