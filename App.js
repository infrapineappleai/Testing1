import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// Reusable Button Component
const Button = ({ onClick, label, color, style }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: color,
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      margin: '10px 5px',
      transition: 'background-color 0.3s ease',
      ...style,
    }}
  >
    {label}
  </button>
);

// Reusable Input Component
const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{ padding: '10px', margin: '5px', width: '200px' }}
  />
);

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

  const handleSaveUser = async () => {
    if (!name || !age) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      if (editingUser) {
        // Update User
        await axios.put(`http://localhost:5000/user/update/${editingUser._id}`, { name, age });
      } else {
        // Add User
        await axios.post('http://localhost:5000/user/add', { name, age });
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
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

  const resetForm = () => {
    setEditingUser(null);
    setName('');
    setAge('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
      {/* Form Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
        <InputField type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <InputField type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <Button
          onClick={handleSaveUser}
          label={editingUser ? 'Update User' : 'Add User'}
          color="#28a745"
        />
        {editingUser && <Button onClick={resetForm} label="Cancel" color="#6c757d" />}
      </div>

      {/* Users Table */}
      <table
        border="1"
        style={{
          width: '60%',
          textAlign: 'center',
          borderCollapse: 'collapse',
          marginTop: '20px',
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
                <Button
                  onClick={() => handleEditUser(user)}
                  label="Edit"
                  color="#007bff"
                />
                <Button
                  onClick={() => handleDeleteUser(user._id)}
                  label="Delete"
                  color="#dc3545"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;