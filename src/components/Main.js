import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAccount } from "wagmi";
import Web3 from "web3";
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from 'ethers';


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
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
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
          "name": "madded",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "madder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "manager_added",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "mremoved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "mremover",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "manager_removed",
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
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "adder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
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
          "indexed": false,
          "internalType": "string",
          "name": "data",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "remover",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "product_removed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sadded",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sadder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "staff_added",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "sremoved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sremover",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "staff_removed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "addItem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_managerAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_staffAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addStaff",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllInventoryItems",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            }
          ],
          "internalType": "struct Warehouse.Item[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getItemHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            }
          ],
          "internalType": "struct Warehouse.Item[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getManagerHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "managerAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "internalType": "struct Warehouse.Manager[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getName",
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
      "inputs": [],
      "name": "getStaffHistory",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "staffAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "internalType": "struct Warehouse.Staff[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "inventory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
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
          "name": "mang",
          "type": "address"
        }
      ],
      "name": "isManager",
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
          "name": "staf",
          "type": "address"
        }
      ],
      "name": "isStaff",
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "itemHistory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "managerHistory",
      "outputs": [
        {
          "internalType": "address",
          "name": "managerAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
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
      "name": "managers",
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
      "inputs": [],
      "name": "owner",
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
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "removeItem",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_managerAddress",
          "type": "address"
        }
      ],
      "name": "removeManager",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_staffAddress",
          "type": "address"
        }
      ],
      "name": "removeStaff",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "staff",
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "staffHistory",
      "outputs": [
        {
          "internalType": "address",
          "name": "staffAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "warehouseName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); 
  

  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [managerAddress, setManagerAddress] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerAdded, setManagerAdded] = useState(false);
  const [managerRemoved, setManagerRemoved] = useState(false);
  const [managerHistory, setManagerHistory] = useState([]);

  const [isManager, setIsManager] = useState(false);
  const [staffAddress, setStaffAddress] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffHistory, setStaffHistory] = useState([]);

  
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
 
 

  const { address} = useAccount()
  
  
  const contract = new web3.eth.Contract(cabi, childAddress);

  useEffect(() => {
    async function init() {
      if (web3) {
        const contract = new web3.eth.Contract(cabi, childAddress);
       

        // Check if Connected Account is Owner
        const accounts = await web3.eth.getAccounts();
        const owner = await contract.methods.owner().call();
        setConnectedAccount(accounts[0]);
        setIsOwner(accounts[0] === owner);

        // Load Manager History
        const history = await contract.methods.getManagerHistory().call();
        setManagerHistory(history);
      }
    }
    init();
  }, [childAddress, web3]);

  useEffect(() => {
    async function checkManager() {
      const accounts = await web3.eth.getAccounts();
      const manager = await contract.methods.isManager(accounts[0]).call();
      
      setIsManager( manager);
    }
    checkManager();
  }, []);

  async function handleAddManager() {
    await contract.methods.addManager(managerAddress, managerName).send({ from: address });
    setManagerAdded(true);
    setManagerRemoved(false);
    setManagerHistory([...managerHistory, { managerAddress: managerAddress, name: managerName }]);
  }

  async function handleRemoveManager() {
    await contract.methods.removeManager(managerAddress).send({ from: address });
    setManagerRemoved(true);
    setManagerAdded(false);
    const updatedHistory = managerHistory.filter((manager) => manager.managerAddress !== managerAddress);
    setManagerHistory(updatedHistory);
  }

  

  //staff section
  

 

  useEffect(() => {
    async function checkManager() {
      const accounts = await web3.eth.getAccounts();
      const manager = await contract.methods.isManager(accounts[0]).call();
      setIsManager(manager);
    }
    checkManager();
  }, []);

  // Function to add a staff member
  async function handleAddStaff() {
    await contract.methods.addStaff(staffAddress, staffName).send({ from: address });
  }

  // Function to remove a staff member
  async function handleRemoveStaff() {
    await contract.methods.removeStaff(staffAddress).send({ from: address });
  }

  //item section

  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [removeItemId, setRemoveItemId] = useState('');
  const [removeItemQuantity, setRemoveItemQuantity] = useState('');
  const [inventory, setInventory] = useState([]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.addItem(itemId, itemName, itemQuantity).send({ from: address });
      toast.success('Product added successfully');
      // update inventory list
      const inventoryList = await contract.methods.getAllInventoryItems().call();
      setInventory(inventoryList);
    } catch (error) {
      console.log(error);
      toast.error('Error adding product');
    }
  };

  // remove product
  const handleRemoveProduct = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.removeItem(removeItemId, removeItemQuantity).send({ from: address });
      toast.success('Product removed successfully');
      // update inventory list
      const inventoryList = await contract.methods.getAllInventoryItems().call();
      setInventory(inventoryList);
    } catch (error) {
      console.log(error);
      toast.error('Error removing product');
    }
  };

  // get inventory list
  const handleGetInventory = async () => {
    try {
      const inventoryList = await contract.methods.getAllInventoryItems().call();
      setInventory(inventoryList);
    } catch (error) {
      console.log(error);
      toast.error('Error getting inventory list');
    }
  };

  const [items, setItems] = useState([]);


  useEffect(() => {
  const loadItems = async () => {
    try {
      const result = await contract.methods.getAllInventoryItems().call();
      setItems(result);
    } catch (error) {
      console.error(error);
    }
  };

  loadItems();
}, []);

const [events, setEvents] = useState([]);
const [managerAddedEvents, setManagerAddedEvents] = useState([]);
const [managerRemovedEvents, setManagerRemovedEvents] = useState([]);
const [managerEvents, setManagerEvents] = useState([]);

useEffect(() => {
  const loadEvents = async () => {
    try {
    const addedEvents = await contract.getPastEvents("manager_added", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const removedEvents = await contract.getPastEvents("manager_removed", {
      fromBlock: 0,
      toBlock: "latest",
    });

    // combine and sort the events by timestamp
    const events = addedEvents
      .concat(removedEvents)
      .sort((a, b) => a.returnValues.timestamp - b.returnValues.timestamp);

    // update the state with the result
    setManagerEvents(events);
  } catch (error) {
    console.error(error);
  }
  };

loadEvents();
}, []);
 

const [pevents, setpEvents] = useState([]);
      
useEffect(() => {
  const loadproductEvents = async () => {
    try {
    const addedpEvents = await contract.getPastEvents("product_added", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const removedpEvents = await contract.getPastEvents("product_removed", {
      fromBlock: 0,
      toBlock: "latest",
    });

    // combine and sort the events by timestamp
    const pevents = addedpEvents
      .concat(removedpEvents)
      .sort((a, b) => a.returnValues.timestamp - b.returnValues.timestamp);

    // update the state with the result
    setpEvents(pevents);
  } catch (error) {
    console.error(error);
  }
  };

loadproductEvents();
}, []);


const [sevents, setStaffEvents] = useState([]);

useEffect(() => {
  const loadStaffEvents = async () => {
    try {
    const addedsEvents = await contract.getPastEvents("staff_added", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const removedsEvents = await contract.getPastEvents("staff_removed", {
      fromBlock: 0,
      toBlock: "latest",
    });

    // combine and sort the events by timestamp
    const sevents = addedsEvents
      .concat(removedsEvents)
      .sort((a, b) => a.returnValues.timestamp - b.returnValues.timestamp);

    // update the state with the result
    setStaffEvents(sevents);
  } catch (error) {
    console.error(error);
  }
  };

loadStaffEvents();
}, []);
  
  


  return (
    <div>
      <h2 class='p-2 text-center font-serif text-3xl font-bold tracking-tight text-sky-500'>Manage your Warehouse Seamlessly</h2>
    <div>
    {isOwner && 
    <div>
      <div className='px-10'>
      <h2 className="text-2xl font-bold mb-4">Manager Section:</h2>
      
      <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
      <div>
       
        <input 
        placeholder="Enter Manager's Address"
        class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required

        type="text" value={managerAddress} onChange={(e) => setManagerAddress(e.target.value)} />
      </div>
      <div>
        
        <input 
        placeholder="Enter Manager's Name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
         type="text" value={managerName} onChange={(e) => setManagerName(e.target.value)} />
      </div>
      <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5  text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
      onClick={handleAddManager}>Add Manager</button>
      </div>
      <br></br>
      <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">

      
      
        <input 
        class="bg-gray-50 border  col-span-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
        placeholder="Enter Manager's Address"
        type="text" value={managerAddress} onChange={(e) => setManagerAddress(e.target.value)} />
   
      
      <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5  text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
      onClick={handleRemoveManager}>Remove Manager</button>
      </div>
      <br></br>

      <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Manager Events History :</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Event Type</th>
            <th className="px-4 py-2">Manager Address</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {managerEvents.map((event, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                {event.event === "manager_added" ? "Added" : "Removed"}
              </td>
              <td className="border px-4 py-2">{event.event === "manager_added"? event.returnValues.madded : event.returnValues.mremoved}</td>
              <td className="border px-4 py-2">
                {new Date(event.returnValues.timestamp * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

     {/* <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Events History</h1>
      <div className="overflow-x-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Event Name</th>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">Manager Address</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.timestamp}>
                <td className="border px-4 py-2">{event.name}</td>
                <td className="border px-4 py-2">{new Date(event.timestamp * 1000).toLocaleString()}</td>
                <td className="border px-4 py-2">{event.manager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
            */}
      
    {/*<h3>Manager History</h3>
      <table>
        <thead>
          <tr>
            <th>Manager Address</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {managerHistory.map((manager) => (
            <tr key={manager.managerAddress}>
              <td>{manager.managerAddress}</td>
              <td>{manager.name}</td>
            </tr>
              ))}
            </tbody>
          </table>
          */}
        </div>
          </div>
}
     
     <br></br>
    
    </div>
    <div>
   
   
      <div className='px-10'>
      <h2 className="text-2xl font-bold mb-4">Add/Remove Staff Members:</h2>
      
      <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
       
          <input type="text" class="bg-gray-50 border col-start-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
           placeholder="Enter Staff's Address"value={staffAddress} onChange={(e) => setStaffAddress(e.target.value)} />
      
          <input type="text" class="bg-gray-50 border col-start-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
           placeholder="Enter Staff's Name" value={staffName} onChange={(e) => setStaffName(e.target.value)} />
        
        <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5  text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         onClick={handleAddStaff}>Add Staff</button>
      </div>  
      <br></br>

      <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
         <input type="text" class="bg-gray-50 border col-start-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="Enter Staff's Address"value={staffAddress} onChange={(e) => setStaffAddress(e.target.value)} />

        <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5  text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  
        onClick={handleRemoveStaff} >Remove Staff</button>
      </div>

      <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Staff Events History :</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Event Type</th>
            <th className="px-4 py-2">Staff Address</th>
            <th className="px-4 py-2">Staff Adder</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sevents.map((event, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                {event.event === "staff_added" ? "Added" : "Removed"}
              </td>
              <td className="border px-4 py-2">{event.event === "staff_added"? event.returnValues.sadded : event.returnValues.sremoved}</td>
              <td className="border px-4 py-2">{event.event === "staff_added"? event.returnValues.sadder : event.returnValues.sremover}</td>

              <td className="border px-4 py-2">
                {new Date(event.returnValues.timestamp * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>


      </div>
      
      
      
    
    
    

 

    </div>
    <br>
    </br>


    <div className='px-10 '>

    <div >

      <h2 className="text-2xl font-bold mb-4">Add/Remove Product:</h2>
      <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
     
       
         
          <input 
           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required

           type="number" placeholder='Product ID' value={itemId} onChange={(e) => setItemId(e.target.value)} />
       
        
          <input 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required

          type="text" placeholder='Product Name' value={itemName} onChange={(e) => setItemName(e.target.value)} />
       
        
          <input 
          class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required

          type="text" placeholder='Product Quantity' value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
        
        <button 
        class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5  text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
        onClick={handleAddProduct}>Add Product</button>
      </div>

      
      <div class="grid gap-6 p-3 m-2  md:grid-cols-5 border rounded-lg   ">
          
          <input type="text"
          class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required

          placeholder='Product ID' value={removeItemId} onChange={(e) => setRemoveItemId(e.target.value)} />
        
       
      
          <input 
          class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required

          type="text"  placeholder='Product Quantity' value={removeItemQuantity} onChange={(e) => setRemoveItemQuantity(e.target.value)} />
        
        <button 
        class=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5  text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
        onClick={handleRemoveProduct}>Remove Product</button>
        </div>
        <br></br>

        <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Events History :</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Event Type</th>
            <th className="px-4 py-2">Adder</th>
            <th className="px-4 py-2">Products</th>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Timestamp</th>


          </tr>
        </thead>
        <tbody>
          {pevents.map((event, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                {event.event === "product_added" ? "Added" : "Removed"}
              </td>
              <td className="border px-4 py-2">{event.event === "product_added"? event.returnValues.adder : event.returnValues.remover}</td>
              <td className="border px-4 py-2">{event.event === "product_added"? event.returnValues.data : event.returnValues.data}</td>
              <td className="border px-4 py-2">{event.event === "product_added"? event.returnValues._id : event.returnValues._id}</td>
              <td className="border px-4 py-2">{event.event === "product_added"? event.returnValues.quantity : event.returnValues.quantity}</td>

              <td className="border px-4 py-2">
                {new Date(event.returnValues.timestamp * 1000).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

        <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-4">Current Products in Warehouse</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Item ID</th>
              <th className="p-2 text-left">Name</th>
              
              <th className="p-2 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td className="p-2 border border-gray-400">{item.id}</td>
                <td className="p-2 border border-gray-400">{item.name}</td>
                
                <td className="p-2 border border-gray-400">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
       

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
