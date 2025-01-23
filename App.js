import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/view');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddUser = async () => {
    if (!name || !age) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/user/add', { name, age });
      setName('');
      setAge('');
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setAge(user.age);
  };

  const handleUpdateUser = async () => {
    if (!name || !age) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/user/update/${editingUser._id}`, { name, age });
      setName('');
      setAge('');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
      {/* Form to Add or Edit User */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', margin: '5px', width: '200px' }}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{ padding: '10px', margin: '5px', width: '200px' }}
        />
        <button
          onClick={editingUser ? handleUpdateUser : handleAddUser}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            margin: '10px',
            transition: 'background-color 0.3s ease',
          }}
        >
          {editingUser ? 'Update User' : 'Add User'}
        </button>
        {editingUser && (
          <button
            onClick={() => {
              setEditingUser(null);
              setName('');
              setAge('');
            }}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              margin: '10px',
              transition: 'background-color 0.3s ease',
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table to Display Users */}
      <table
        border="1"
        style={{
          width: '50%',
          textAlign: 'center',
          borderCollapse: 'collapse',
          alignItems: 'center', padding: '50px'
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button
                  onClick={() => handleEditUser(user)}
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
                  onClick={() => handleDeleteUser(user._id)}
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
