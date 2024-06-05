'use client';

import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Profile {
  member_id: string;
  name: string;
  member_role: string;
  traffic: number;
}

const SearchProfile = () => {
  const [searchName, setSearchName] = useState<string>("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false); 

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setProfile(null);
    setSubmitted(false);

    try {
      const response = await axios.get<Profile>('http://localhost:8080/api/user/name', {
        params: { name: searchName },
      });
      setProfile(response.data);
      setSubmitted(true); 
    } catch (error: any) {
      setError(error.message || "Error fetching profile");
      setSubmitted(true); 
    } finally {
      setLoading(false);
    }
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
          <span className="text-gray-600 items-center">User Name</span>
          <span className="ml-4 text-gray-900">
            <Input
              type="text"
              placeholder="Enter User Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </span>
        </div>
        {submitted && (
          <>
            {error && <p className="text-red-500">{error}</p>}
            {profile ? (
              <div>
                {/*<h2>Profile Details</h2>*/}
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Role:</strong> {profile.member_role}</p>
                <p><strong>Traffic:</strong> {profile.traffic}</p>
              </div>
            ) : (
              !loading && <p>No profile found for name {searchName}</p>
            )}
          </>
        )}
        </CardContent>
        <CardFooter >
        <span className="ml-1 text-gray-900">
          <Button onClick={handleSearch}>Search</Button>
        </span>
        {loading && <p>Loading...</p>}
        
      
      </CardFooter>
    </Card>
  );
}

export default SearchProfile;
