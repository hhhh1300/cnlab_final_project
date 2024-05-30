import { BsFillDatabaseFill } from 'react-icons/bs';

import AuthForm from '@/components/AuthForm';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <BsFillDatabaseFill className="mx-auto w-auto text-indigo-600" size={48} />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          登入你的帳號
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
