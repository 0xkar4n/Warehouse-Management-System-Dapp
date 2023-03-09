import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAccount } from "wagmi";
import Web3 from "web3";
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {
 
  let {childAddress}=useParams();
  const contractAddress={childAddress};
  const cabi =  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "ff",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "add_removed",
          "type": "address"
        }
      ],
      "name": "address_unwhitelisted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "add_added",
          "type": "address"
        }
      ],
      "name": "address_whitelisted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "data",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "adder",
          "type": "address"
        }
      ],
      "name": "product_added",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "remover",
          "type": "address"
        }
      ],
      "name": "product_removed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "Warehouse_Data",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "data",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "add_Data",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "add_manager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "add_staff",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "manager",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "remove_data",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "remove_manager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "remove_staff",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "total_manager",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "total_product",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "total_whitelisted",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "whitelist",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
 

  
  const [addstaff, setaddStaff] = useState("");
  const [removestaff, setremoveStaff] = useState("");
  const [addmanager, setaddManager] = useState("");
  const [removemanager, setremoveManager] = useState("");
  const [account, setAccount] = useState(null);
  const [data, setData] = useState("");
  const [id, setId] = useState('');
  const [rid, setrId] = useState('');

  const { address} = useAccount()
  
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); 
  const contract = new web3.eth.Contract(cabi, childAddress);
  const handleAddData = async () => {
    try {
     
      await contract.methods.add_Data(data, id).send({ from: address });
      
      toast.success('Transaction successful!'
        );
    } catch (error) {
      console.log(error)
      toast.error('Transaction failed!');
      
    }
  };

  const handleRemoveData = async () => {
    try {
      await contract.methods.remove_data(rid).send({ from: address });
      toast.success('Transaction successful!');
    } catch (error) {
      toast.error('Transaction failed!');
    }
  };
  const handleaddManager = async () => {
    try {
      await contract.methods.add_manager( addmanager).send({ from: address });
      toast.success('Transaction successful!');
    } catch (error) {
      toast.error('Transaction failed!');
    }
  };
  const handleremoveManager = async () => {
    try {
      await contract.methods.remove_manager( removemanager).send({ from: address });
      toast.success('Transaction successful!');
    } catch (error) {
      toast.error('Transaction failed!');
    }
  };
  const handleaddStaff = async () => {
    try {
      await contract.methods.add_staff( addstaff).send({ from: address });
      toast.success('Transaction successful!');
    } catch (error) {
      toast.error('Transaction failed!');
    }
  };
  const handleremoveStaff = async () => {
    try {
      await contract.methods.remove_staff( removestaff).send({ from: address });
      toast.success('Transaction successful!');
    } catch (error) {
      toast.error('Transaction failed!');
    }
  };


  return (
    <div>
       
        <h2 className='text-center pt-1 text-2xl font-bold tracking-tight text-gray-700'>Welcome to ({childAddress})Warehouse</h2>
       <div>
          <h2 class='p-2 text-center font-serif text-3xl font-bold tracking-tight text-sky-500'>Manage your Warehouse Seamlessly</h2>
          <div className='p-10'>

          <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
          <input
        type="text"
        placeholder="Enter data"
        value={data}
        onChange={(e) => setData(e.target.value)}
         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

        />
        
       <input
        type="number"
        placeholder="Enter id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
        />
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAddData}  >Add Data</button>
      </div>
        

      
          <br></br>

          <div class="grid gap-6 p-3 m-2 md:grid-cols-5  border rounded-lg 	">
          <input
        type="number"
        placeholder="Enter id"
        value={rid}
        onChange={(e) => setrId(e.target.value)}
        class="bg-gray-50 border col-start-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
        />
          <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5  text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleRemoveData} > Remove Data</button>
          </div>


          <br></br>
          

          <br></br>
          
          <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
       
          <input
        type="text"
        placeholder="Enter Manager's Address" 
        value={addmanager}
        onChange={(e) => setaddManager(e.target.value)}
        
         class="bg-gray-50 border border-gray-300 text-gray-900 col-span-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

        />
          

          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
          onClick={handleaddManager} > 
          Add Manager
          </button>
       
          
          </div>

          <br></br>

          <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
          <input
        type="text"
        placeholder="Enter Manager's Address" 
        value={removemanager}
        onChange={(e) => setremoveManager(e.target.value)}
        
         class="bg-gray-50 border border-gray-300 col-span-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

        />

          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
          onClick={handleremoveManager}
           >
            Remove Manager
          </button>
          </div>
          <br></br>

          <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
          <input
        type="text"
        placeholder="Enter Staff's Address" 
        value={addstaff}
        onChange={(e) => setaddStaff(e.target.value)}
        
         class="bg-gray-50 border border-gray-300 text-gray-900 col-span-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

        />

          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleaddStaff}  >Add Staff</button>
          </div>

          <br></br>

          <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
          <input
        type="text"
        placeholder="Enter Staff's Address" 
        value={removestaff}
        onChange={(e) => setremoveStaff(e.target.value)}
        
         class="bg-gray-50 border border-gray-300 text-gray-900 col-span-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 

        />
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleremoveStaff} >
            Remove Staff
          </button>
          </div>

          <br></br>
          </div>
          
  </div>
      
  <ToastContainer position="bottom-right"
autoClose={3500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick />
    </div>
  );
};

export default Main;
