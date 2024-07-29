import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const UserList = () => {
  const { fetchUsers, users, deleteUser } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      await fetchUsers();
      setLoading(false);
    };
    getUsers();
  }, [fetchUsers]);

  return (
    <div className="user-list">
      <h1>User List</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
