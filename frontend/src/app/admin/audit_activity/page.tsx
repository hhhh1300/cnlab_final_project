// frontend/src/app/admin/audit_activity/page.tsx
'use client';

import { useState } from "react";
import eventsData, { Event } from "./data";

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
      <h1>Event Review</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: "20px" }}>
            <p><strong>Organizer:</strong> {event.organizer}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Content:</strong> {event.content}</p>
            <p><strong>Status:</strong> {event.status}</p>
            {event.status === "pending" && (
              <div>
                <button onClick={() => handleApprove(event.id)}>Approve</button>
                <button onClick={() => handleReject(event.id)} style={{ marginLeft: "10px" }}>Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuditActivity;

