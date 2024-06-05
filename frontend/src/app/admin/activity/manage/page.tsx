'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

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
  status: 'passed' | 'cancelled' | 'reviewing';
  traffic_capacity: number;
  member_capacity: number;
  activity_tag: string;
  activity_type: 'non-official' | 'official';
}

const AuditActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get<Activity[]>('http://localhost:8080/api/activity/status');
        setActivities(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await axios.patch(`http://localhost:8080/api/activity/${id}/status`, { status: 'passed' });
      setActivities(
        activities.map((activity) =>
          activity.activity_id === id ? { ...activity, status: 'passed' } : activity
        )
      );
      // location.reload();
    } catch (error: any) {
      console.error('Error updating status:', error.message);
    }
    toast.success('Activity approved');
  };

  const handleReject = async (id: string) => {
    try {
      await axios.patch(`http://localhost:8080/api/activity/${id}/status`, { status: 'cancelled' });
      setActivities(
        activities.map((activity) =>
          activity.activity_id === id ? { ...activity, status: 'cancelled' } : activity
        )
      );
      // location.reload();
    } catch (error: any) {
      console.error('Error updating status:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        {activities.map((activity) => (
          <Card
            key={activity.activity_id}
            className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <CardHeader className="bg-gray-50 p-6">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {activity.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-6 space-y-6">
              <p>
                <strong>Organizer name:</strong> {activity.hoster_id}
              </p>
              <p>
                <strong>Start Time:</strong> {activity.event_start_timestamp}
              </p>
              <p>
                <strong>End Time:</strong> {activity.event_end_timestamp}
              </p>
              <p>
                <strong>Content:</strong> {activity.activity_content}
              </p>
              <p>
                <strong>Location:</strong> {activity.location}
              </p>
              <p>
                <strong>Traffic Capacity:</strong> {activity.traffic_capacity}
              </p>
              <p>
                <strong>Member Capacity:</strong> {activity.member_capacity}
              </p>
              <p>
                <strong>Reason:</strong> {activity.applying_reason}
              </p>
              <p>
                <strong>Status:</strong> {activity.status}
              </p>
            </CardContent>
            <CardFooter>
              {activity.status === 'reviewing' && (
                <div>
                  <Button onClick={() => handleApprove(activity.activity_id)}>Approve</Button>
                  <Button
                    onClick={() => handleReject(activity.activity_id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default AuditActivity;
