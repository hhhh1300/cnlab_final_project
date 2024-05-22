// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import RequestItem from './RequestItem';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // API 獲取所有待審核的申請
    fetch('/api/requests')
      .then((response) => response.json())
      .then((data) => setRequests(data));
  }, []);

  const handleApprove = (id) => {
    // API 批准申請
    fetch(`/api/requests/${id}/approve`, { method: 'POST' })
      .then((response) => response.json())
      .then(() => {
        setRequests(requests.filter((request) => request.id !== id));
      });
  };

  const handleReject = (id) => {
    // API 拒絕申請
    fetch(`/api/requests/${id}/reject`, { method: 'POST' })
      .then((response) => response.json())
      .then(() => {
        setRequests(requests.filter((request) => request.id !== id));
      });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map((request) => (
          <RequestItem
            key={request.id}
            request={request}
            onApprove={() => handleApprove(request.id)}
            onReject={() => handleReject(request.id)}
          />
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
