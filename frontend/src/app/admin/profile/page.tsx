// frontend/src/app/admin/profile/page.tsx

'use client';

import { useState } from "react";
import profilesData, { Profile } from "./data";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchProfile = () => {
  const [searchId, setSearchId] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleSearch = () => {
    const foundProfile = profilesData.find(p => p.studentId === searchId);
    setProfile(foundProfile || null);
  };

  return (
    <Card className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col">
      <CardHeader className="bg-gray-50 p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Search User Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-6 space-y-6">
        <div>
          <span className="text-gray-600 items-center">Student ID</span>
          <span className="ml-4 text-gray-900">
            <Input
              type="text"
              placeholder="Enter Student ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </span>
          
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
      </CardContent>
      <CardFooter>
        <span className="ml-1 text-gray-900">
          <Button onClick={handleSearch}>Search</Button>
        </span>
      </CardFooter>
    </Card>
  );
}

export default SearchProfile;

