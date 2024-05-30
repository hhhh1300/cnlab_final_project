// frontend/src/app/admin/audit_activity/page.tsx
'use client';

import { useState } from "react";
import eventsData, { Event } from "./data";
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
// import useActivity from '@/hooks/useActivity';
import type { ActivityData } from '@/lib/shared_types';

const AuditActivity = () => {
  const [events, setEvents] = useState<Event[]>(eventsData);

  const handleApprove = (id: number) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: 'approved' } : event));
  };

  const handleReject = (id: number) => {
    setEvents(events.map(event => event.id === id ? { ...event, status: 'rejected' } : event));
  };

  return (
    <div>
      <ul>
        {events.map((event) => (
          <Card className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col">
            <CardHeader className="bg-gray-50 p-6">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {event.content}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-6 space-y-6">
            <p><strong>Organizer:</strong> {event.organizer}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Content:</strong> {event.content}</p>
            <p><strong>Status:</strong> {event.status}</p>
            </CardContent>
            <CardFooter>
            {event.status === "pending" && (
              <div>
                <Button onClick={() => handleApprove(event.id)}>Approve</Button>
                <Button onClick={() => handleReject(event.id)} style={{ marginLeft: "10px" }}>Reject</Button>
              </div>
            )}
            </CardFooter>
          
          </Card>
        ))}
      </ul>
    </div>
  );
}

export default AuditActivity;

