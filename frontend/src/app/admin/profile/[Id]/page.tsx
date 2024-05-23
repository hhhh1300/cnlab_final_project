'use client';

import { useParams } from 'next/navigation'; // 使用 next/navigation 的 useParams
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

const UserProfile = () => {
  const { id } = useParams(); // 使用 useParams 鉤子來獲取動態路由參數
  const [user, setUser] = useState<User | null>(null);
  // console.log("Fetching data for ID:", id); // 调试信息

  useEffect(() => {
    if (id) {
   
      axios.get(`/admin/api/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [id]);

  if (!user) {
    return <div> hhhhhh </div>;
  }

  return (
    <div>
      <h1>用戶個人資料</h1>
      <p>ID: {user.id}</p>
      <p>姓名: {user.name}</p>
      <p>電子郵件: {user.email}</p>
    </div>
  );
};

export default UserProfile;
