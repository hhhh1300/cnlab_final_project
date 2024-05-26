'use client';

import { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [userId, setUserId] = useState('');

  return (
    <div>
      <h1>搜尋用戶</h1>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="輸入學號"
      />
      <Link href={`/admin/profile/${userId}`}>
        搜尋
      </Link>
    </div>
  );
};

export default Home;
