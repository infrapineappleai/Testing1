import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios
      .get('http://localhost:5000/user/view')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  // Add user handler



  // delete




  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>

      {/* Form to Add User */}
      <div style={{ marginBottom: '20px' }}>
       
       
        {/* name input */}


        {/* age input */}


       {/* add button 28a745 */}

       
      </div>



      {/* Table */}
      <table
        border="1"
        style={{
          width: '50%',
          textAlign: 'center',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '5px',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Edit
                </button>
                <button
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '5px',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
