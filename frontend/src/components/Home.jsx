// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <div>
      <h1>Search User</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <br />
      <Link to="/admin">
        <button>Go to Admin Dashboard</button>
      </Link>
    </div>
  );
}

export default Home;
