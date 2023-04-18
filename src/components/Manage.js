
import React, { useState, useEffect } from 'react';
import Web3 from "web3";

import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


//https://eth-goerli.g.alchemy.com/v2/6ls7UbYyRKU_dCr0JXyfV6QXd-VplZyW


const contractAddress = '0x31b91a4816e09fc40d666478efa18e22afd69ba6'; // replace with your contract address
const contractAbi = [
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
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getWarehousesByOwner",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "warehouseAddress",
              "type": "address"
            }
          ],
          "internalType": "struct Create_Warehouse.warehouse[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]; // replace with your contract ABI
  




export default function Home(){
  
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function loadBlockchainData() {
      if (window.ethereum) {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const warehouses = await contract.methods.getWarehousesByOwner(accounts[0]).call();
        setWarehouses(warehouses);
      } else {
        toast.error("Please install MetaMask to use this dApp!");
      }
    }
    loadBlockchainData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-4">My Warehouses</h1>
      {warehouses.length === 0 ? (
        <p className="text-lg text-gray-700">No warehouses created yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {warehouses.map((warehouse, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-3 ">
               <Link to={`/ManageWarehouse/${warehouse.warehouseAddress}`}>
              <h2 className="text-lg font-bold mb-3">{warehouse.name}</h2>
              <p className="text-gray-700 mb-3 ">{warehouse.warehouseAddress}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

        
