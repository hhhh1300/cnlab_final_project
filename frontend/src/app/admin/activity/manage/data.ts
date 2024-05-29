// frontend/src/app/admin/data.ts

'use client';

export interface Event {
    id: number;
    organizer: string;
    time: string;
    content: string;
    status: "pending" | "approved" | "rejected";
  }
  
  const events: Event[] = [
    {
      id: 1,
      organizer: "John Doe",
      time: "2024-06-01 14:00",
      content: "Music Concert",
      status: "pending"
    },
    {
      id: 2,
      organizer: "Jane Smith",
      time: "2024-06-05 18:00",
      content: "Art Exhibition",
      status: "pending"
    }
  ];
  
  export default events;
  