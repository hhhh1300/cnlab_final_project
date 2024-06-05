'use client';

import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Profile {
  member_id: string;
  name: string;
  member_role: string;
  traffic: number;
}

const SearchProfile = () => {
  const [searchName, setSearchName] = useState<string>('');
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
      setError(error.message || 'Error fetching profile');
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTrafficChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
      setProfile({ ...profile, traffic: Number(e.target.value) });
    }
  };

  const handleSaveTraffic = async () => {
    if (profile) {
      try {
        await axios.patch('http://localhost:8080/api/user/ChangeTraffic', {
          member_id: profile.member_id,
          traffic: profile.traffic,
        });
        alert('Traffic updated successfully');
      } catch (error: any) {
        alert('Error updating traffic: ' + error.message);
      }
    }
  };

  return (
    <Card className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col">
      <CardHeader className="bg-gray-50 p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">Search User Profile</CardTitle>
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
                <p>
                  <strong>Name:</strong> {profile.name}
                </p>
                <p>
                  <strong>Role:</strong> {profile.member_role}
                </p>
                <p>
                  <strong>Traffic:</strong>
                  <Input type="number" value={profile.traffic} onChange={handleTrafficChange} />
                  <Button onClick={handleSaveTraffic} className="ml-2 mt-2">
                    Save
                  </Button>
                </p>
              </div>
            ) : (
              !loading && <p>No profile found for name {searchName}</p>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        <span className="ml-1 text-gray-900">
          <Button onClick={handleSearch}>Search</Button>
        </span>
        {loading && <p>Loading...</p>}
      </CardFooter>
    </Card>
  );
};

export default SearchProfile;
