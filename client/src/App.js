import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [showInputs, setShowInputs] = useState(false);
  const [showUpdateInputs, setShowUpdateInputs] = useState(false);


  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryName, setCountryName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateCountryCode, setUpdateCountryCode] = useState('');
  const [updateMobile, setUpdateMobile] = useState('');
  const [updateCountryName, setUpdateCountryName] = useState('');
  const [updateCity, setUpdateCity] = useState('');
  const [updateAddress, setUpdateAddress] = useState('');

  const [deleteCustomerId, setDeleteCustomerId] = useState('');
  const [showDeleteInput, setShowDeleteInput] = useState(false);

  const [message, setMessage] = useState('');

  const [getCustomerId, setGetCustomerId] = useState('');
  const [showGetCustomerInput, setShowGetCustomerInput] = useState(false);
  const [fetchedCustomer, setFetchedCustomer] = useState(null);

  const [getCustomerPhoneNumber, setGetCustomerPhoneNumber] = useState('');
  const [showGetCustomerPhoneNumberInput, setShowGetCustomerPhoneNumberInput] = useState(false);
  const [fetchedCustomerByPhoneNumber, setFetchedCustomerByPhoneNumber] = useState(null);

  const getAll = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getAll");
      console.log("All customers:", response.data);
      setCustomers(response.data); 
    } catch (error) {
      console.error("Error fetching all customers:", error.message);
    }
  };


  const handleAddCustomerClick = () => {
    setShowInputs(true);
    setShowUpdateInputs(false);
    setShowDeleteInput(false);
    setShowGetCustomerInput(false);
    setShowGetCustomerPhoneNumberInput(false);
    setFetchedCustomer(false);
    setFetchedCustomerByPhoneNumber(false);
    setMessage('');


  };

  const handleAddCustomerSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/addCustomer", {
        name,
        countryCode,
        mobile,
        countryName,
        city,
        address
      });

      setName('');
      setCountryCode('');
      setMobile('');
      setCountryName('');
      setCity('');
      setAddress('');

      setShowInputs(false);

      setMessage('Customer added successfully!');
      setShowInputs(false);

      getAll(); 
    } catch (error) {
      console.error("Error adding customer:", error.message);
      setMessage('Failed to add customer. Please try again.');
    }
  };
  
  

  const handleUpdateClick = () => {
    setShowUpdateInputs(true);
    setShowInputs(false); 
    setShowDeleteInput(false);
    setShowGetCustomerInput(false);
    setShowGetCustomerPhoneNumberInput(false);
    setFetchedCustomer(false);
    setFetchedCustomerByPhoneNumber(false);
    setMessage('');
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/update/${updateId}`, {
        name: updateName,
        countryCode: updateCountryCode,
        mobile: updateMobile,
        countryName: updateCountryName,
        city: updateCity,
        address: updateAddress
      });

      setUpdateId('');
      setUpdateName('');
      setUpdateCountryCode('');
      setUpdateMobile('');
      setUpdateCountryName('');
      setUpdateCity('');
      setUpdateAddress('');
      setMessage('Customer updated successfully!');
      setShowUpdateInputs(false);
      getAll();
    } catch (error) {
      console.error("Error updating customer:", error.message);
      setMessage('Failed to update customer. Please try again.');
    }
  };


  const DeleteClick = () => {
    setShowDeleteInput(true);
    setShowUpdateInputs(false);
    setShowInputs(false); 
    setShowGetCustomerInput(false);
    setShowGetCustomerPhoneNumberInput(false);
    setFetchedCustomer(false);
    setFetchedCustomerByPhoneNumber(false);
    setMessage('');
  }; 

  const handleDeleteIdChange = (e) => {
  setDeleteCustomerId(e.target.value);
};

const handleDeleteClick = async () => {
  try {
    await axios.delete(`http://localhost:5000/api/delete/${deleteCustomerId}`);
    setMessage(`Customer with ID ${deleteCustomerId} deleted successfully!`);
  
    getAll(); 
  } catch (error) {
    console.error("Error deleting customer:", error.message);
    setMessage(`Failed to delete customer with ID ${deleteCustomerId}. Please try again.`);
  }
};

const handleGetCustomerbyId = () => {
  setShowGetCustomerInput(true);
  setShowInputs(false); 
  setShowUpdateInputs(false);
  setShowDeleteInput(false);
  setShowGetCustomerPhoneNumberInput(false);
  setFetchedCustomerByPhoneNumber('');
  setMessage('');
}; 

const handleGetCustomerIdChange = (e) => {
  setGetCustomerId(e.target.value);
};

const handleGetCustomerSubmit = async (e) => {
  e.preventDefault(); 
  try {
    const response = await axios.get(`http://localhost:5000/api/getCustomer/${getCustomerId}`);
    const customer = response.data;

    if (customer) {
      setFetchedCustomer(customer);
    } else {
      console.error("Customer not found.");
      setFetchedCustomer(null);
    }
  } catch (error) {
    console.error("Error fetching customer:", error.message);
    setMessage('Failed to get the customer. Please try again.');
    setFetchedCustomer(null);
  }
};


const handleGetCustomerbyNumber = () => {
  setShowGetCustomerPhoneNumberInput(true);
  setShowInputs(false); 
  setShowUpdateInputs(false);
  setShowDeleteInput(false);
  setShowGetCustomerInput(false);
  setFetchedCustomer('');
  setMessage('');
}; 

const handleGetCustomerPhoneNumberChange = (e) => {
  setGetCustomerPhoneNumber(e.target.value);
};

const handleGetCustomerByPhoneNumberSubmit = async (e) => {
  e.preventDefault(); 
  try {
    const response = await axios.get(`http://localhost:5000/api/getCustomerByPhoneNumber/${getCustomerPhoneNumber}`);
    const customer = response.data;

    if (customer) {
      setFetchedCustomerByPhoneNumber(customer);
    } else {
      console.error("Customer not found.");
      setFetchedCustomerByPhoneNumber(null);
    }
  } catch (error) {
    console.error("Error fetching customer by phone number:", error.message);
    setMessage('Failed to get the customer. Please try again.');
    setFetchedCustomerByPhoneNumber(null);
  }
};
  
  return (
  <div className="App">
    <h1 className="main-heading">MERN Code Challenge</h1>
    <h2>Choose an option:</h2>
    
    {showInputs && (

        <div className="form-container">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br />

          <label className="form-label">Country Code:</label>
          <input
            type="text"
            className="form-input"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          /><br />

          <label className="form-label">Mobile:</label>
          <input
            type="text"
            className="form-input"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          /><br />

          <label className="form-label">Country Name:</label>
          <input
            type="text"
            className="form-input"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
          /><br />

          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          /><br />

          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          /><br />
        </div>
      )}

{showUpdateInputs && (
        <div className="form-container">
          <label className="form-label">ID:</label>
          <input
            type="text"
            className="form-input"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
          /><br />
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-input"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          /><br />

          <label className="form-label">Country Code:</label>
          <input
            type="text"
            className="form-input"
            value={updateCountryCode}
            onChange={(e) => setUpdateCountryCode(e.target.value)}
          /><br />

          <label className="form-label">Mobile:</label>
          <input
            type="text"
            className="form-input"
            value={updateMobile}
            onChange={(e) => setUpdateMobile(e.target.value)}
          /><br />

          <label className="form-label">Country Name:</label>
          <input
            type="text"
            className="form-input"
            value={updateCountryName}
            onChange={(e) => setUpdateCountryName(e.target.value)}
          /><br />

          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-input"
            value={updateCity}
            onChange={(e) => setUpdateCity(e.target.value)}
          /><br />

          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-input"
            value={updateAddress}
            onChange={(e) => setUpdateAddress(e.target.value)}
          /><br />
          <button onClick={() => handleUpdateSubmit(updateId)}>Update Customer</button>
        </div>
      )}

{showDeleteInput && (
    <>
      <label className="form-label">Enter Customer ID to Delete:</label>
      <input
        type="text"
        className="form-input"
        value={deleteCustomerId}
        onChange={handleDeleteIdChange}
      /><br />
      <button onClick={handleDeleteClick}>Delete Customer</button><br></br>
    </>
  )}


{showGetCustomerInput && (
  <form onSubmit={handleGetCustomerSubmit}>
    <label className="form-label">Enter Customer ID to Get:</label>
    <input
      type="text"
      className="form-input"
      value={getCustomerId}
      onChange={handleGetCustomerIdChange}
    />
    <div>
    <button type="submit">Get Customer</button>
    </div>
  </form>
)}

{showGetCustomerPhoneNumberInput && (
  <>
    <label className="form-label">Enter Customer Phone Number to Get:</label>
    <form onSubmit={handleGetCustomerByPhoneNumberSubmit}>
      <input
        type="text"
        className="form-input"
        value={getCustomerPhoneNumber}
        onChange={handleGetCustomerPhoneNumberChange}
      />
      <div>
      <button type="submit">Get Customer by Phone Number</button>
      </div>
    </form>
  </>
)}

      {fetchedCustomer && (
        <div>
          <h3>Fetched Customer:</h3>
          <strong>Name:</strong> {fetchedCustomer.name}<br />
          <strong>Country Code:</strong> {fetchedCustomer.countryCode}<br />
          <strong>Mobile:</strong> {fetchedCustomer.mobile}<br />
          <strong>Country Name:</strong> {fetchedCustomer.countryName}<br />
          <strong>City:</strong> {fetchedCustomer.city}<br />
          <strong>Address:</strong> {fetchedCustomer.address}<br />
        </div>
      )}


            
            {fetchedCustomerByPhoneNumber && (
        <div>
          <h3>Fetched Customer by Phone Number:</h3>
          <strong>Name:</strong> {fetchedCustomerByPhoneNumber.name}<br />
          <strong>Country Code:</strong> {fetchedCustomerByPhoneNumber.countryCode}<br />
          
          <strong>Country Name:</strong> {fetchedCustomerByPhoneNumber.countryName}<br />
          <strong>City:</strong> {fetchedCustomerByPhoneNumber.city}<br />
          <strong>Address:</strong> {fetchedCustomerByPhoneNumber.address}<br />
        </div>
      )}

      <div>
      {message && <p>{message}</p>}
       
        <button onClick={handleAddCustomerClick} style={{ marginTop: '40px' }}>Add a customer</button>
        {showInputs && (
          <button onClick={handleAddCustomerSubmit}>Submit</button>
        )}
    </div>
    
    <button onClick={handleUpdateClick}>Update a customer</button><br></br>
    <button onClick={DeleteClick}>Delete a customer</button><br></br>
    <button onClick={getAll}> Get all customers</button><br></br>
    <button onClick={handleGetCustomerbyId}>Get Customer by Id</button><br></br>
    <button onClick={handleGetCustomerbyNumber}>Get Customer by Phone Number</button>
    
    <ul>
  {customers.map(customer => (
    <li key={customer._id}>
      <strong>ID:</strong> {customer._id}<br />
      <strong>Name:</strong> {customer.name}<br />
      <strong>Country Code:</strong> {customer.countryCode}<br />
      <strong>Mobile:</strong> {customer.mobile}<br />
      <strong>Country Name:</strong> {customer.countryName}<br />
      <strong>City:</strong> {customer.city}<br />
      <strong>Address:</strong> {customer.address}
    </li>
  ))}
</ul>

    </div>
  );
}
        

export default App;