import React, { useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { user, fetchUserProfile } = useAuthContext();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div className="profile">
      <h1>User Profile</h1>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
