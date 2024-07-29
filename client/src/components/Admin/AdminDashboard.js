import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/manage-products">Manage Products</Link>
        <Link to="/admin/manage-users">Manage Users</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
