import { useState, useEffect } from 'react';
import './App.css';

const api = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [userData, setUserData] = useState([]); 
  const [searchId, setSearchId] = useState(""); 
  const [filteredUser, setFilteredUser] = useState(null); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setUserData(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const user = userData.find((u) => u.id === parseInt(searchId));
    setFilteredUser(user);
    };

  return (
    <>
      <h1>Random User Data</h1>

    
      <div>
        <input
          type="text"
          placeholder="Enter user ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search by ID</button>
      </div>

      {filteredUser && (
        <div>
          <h2>Details of User ID: {filteredUser.id}</h2>
          <p>Name: {filteredUser.name}</p>
          <p>Username: {filteredUser.username}</p>
          <p>Email: {filteredUser.email}</p>
          <p>Address: {`${filteredUser.address.street}, 
            ${filteredUser.address.suite}, 
            ${filteredUser.address.city}, 
            ${filteredUser.address.zipcode}`}</p>
          <p>Phone: {filteredUser.phone}</p>
          <p>Website: {filteredUser.website}</p>
          <p>Company: {filteredUser.company.name}</p>
          <p>CatchPhrase: {filteredUser.company.catchPhrase}</p>
          <p>BS: {filteredUser.company.bs}</p>
        </div>
      )}

      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{`${user.address.street}, 
                    ${user.address.suite}, 
                    ${user.address.city}, 
                    ${user.address.zipcode}`}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
}

export default App;
