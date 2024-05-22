// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // API 根據 id 獲取用戶資料
    fetch(`/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUserProfile(data));
  }, [id]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {id}</p>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      {/* 顯示用戶的其他資料 */}
    </div>
  );
}

export default UserProfile;

