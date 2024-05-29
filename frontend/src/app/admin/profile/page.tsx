// frontend/src/app/admin/profile/page.tsx

'use client';

import { useState } from "react";
import profilesData, { Profile } from "./data";

const SearchProfile = () => {
  const [searchId, setSearchId] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleSearch = () => {
    const foundProfile = profilesData.find(p => p.studentId === searchId);
    setProfile(foundProfile || null);
  };

  return (
    <div>
      <h1>Search Profile</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {profile ? (
        <div>
          <h2>Profile Details</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Major:</strong> {profile.major}</p>
        </div>
      ) : (
        searchId && <p>No profile found for ID {searchId}</p>
      )}
    </div>
  );
}

export default SearchProfile;

