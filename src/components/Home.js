import React, { useState } from 'react';
import { useAccount } from 'wagmi';

import Web3 from "web3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home(){
  const { address, isConnecting, isDisconnected } = useAccount()
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const createWarehouseAddress='0x31b91a4816e09fc40d666478efa18e22afd69ba6';
  const createWarehouseAbi=[
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
  ];

 

  
  const [popupVisible, setPopupVisible] = useState(false);
  const handleCreate = async () => {
    if (!name) {
      toast.error('Please enter a name for the warehouse.');
      return;
    }

    try {
      setIsCreating(true);

      // Get the current user's address from their wallet
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // Get the contract instance and call the create_warehouse function
      const contractAddress = '0x31b91a4816e09fC40d666478Efa18E22AFd69ba6';
      const contractAbi = createWarehouseAbi;
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      const result = await contract.methods.create_wareshouse(name).send({ from: userAddress });

      // Notify the user of the success and reset the form
      toast.success('Warehouse created successfully!');
      setIsCreating(false);
      setName('');
    } catch (error) {
      // Notify the user of any errors
      toast.error(`Error creating warehouse: ${error.message}`);
      setIsCreating(false);
    }
  };




 
 
  


  if (isConnecting) return <div class="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
  <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  <span class="sr-only">Info</span>
  <div>
    <span class="font-medium">Connecting....!</span> Connnection to your Metamask Wallet....
  </div>
</div>

  if (isDisconnected) return <div class=" text-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  <span class="sr-only">Info</span>
  <div>
    <span class="font-medium">Info alert!</span> Please Connect your Metamask wallet before interacting with the site.
  </div>

</div>



    return<div className='bg-white-200 p-8 '>
        
        
        <h2 className="p-10 text-center font-serif text-3xl font-bold tracking-tight text-sky-500 sm:text-5xl "> Permissionless and Decentralized Warehouse <br></br>Management System</h2>
        <h3 class="text-4xl mt-12 pl-5 font-semibold text-transparent bg-clip-text  bg-gradient-to-r to-sky-400 via-violet-400 from-blue-400">Create and Manage Warehouse  <br></br>Across the World</h3>
        <p className="text-left mt-2 pl-5 text-gray-600  font-sherif ">
            Explore the Blockchain world. Create and manage warehouses easily.
          </p>

          <div>
  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={() => setPopupVisible(true)}>Create Warehouse</button>
  {popupVisible && (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center" onClick={() => setPopupVisible(false)}>
      <div className="bg-white rounded-lg shadow-lg p-4" onClick={(event) => event.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Create Warehouse</h2>
        <input
          type="text"
          placeholder="Warehouse Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
        />
        <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Create
        </button>
      </div>
    </div>


      )}
      <ToastContainer />
    </div>
        <br>
        </br>
      
        
        


       

      

       
        
      
      <br></br>
      
     
    
    </div>
}


