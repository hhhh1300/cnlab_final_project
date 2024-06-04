'use client';

import { useState, useEffect } from "react";
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

interface Activity {
  activity_id: string;
  hoster_id: string;
  title: string;
  activity_content: string;
  applying_reason: string;
  event_start_timestamp: string;
  event_end_timestamp: string;
  register_start_timestamp: string;
  register_end_timestamp: string;
  location: string;
  status: "passed" | "cancelled" | "reviewing";
  traffic_capacity: number;
  member_capacity: number;
  activity_tag: string;
  activity_type: "non-official" | "official";
}

const OfficialActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get<Activity[]>('http://localhost:8080/api/activity/official');
        setActivities(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        {activities.map((activity) => (
          <Card key={activity.activity_id} className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col">
            <CardHeader className="bg-gray-50 p-6">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {activity.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-6 space-y-6">
              <p><strong>Organizer name:</strong> {activity.hoster_id}</p>
              <p><strong>Start Time:</strong> {activity.event_start_timestamp}</p>
              <p><strong>End Time:</strong> {activity.event_end_timestamp}</p>
              <p><strong>Content:</strong> {activity.activity_content}</p>
              <p><strong>Location:</strong> {activity.location}</p>
              <p><strong>Traffic Capacity:</strong> {activity.traffic_capacity}</p>
              <p><strong>Member Capacity:</strong> {activity.member_capacity}</p>
  
            </CardContent>
            
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default OfficialActivity;
