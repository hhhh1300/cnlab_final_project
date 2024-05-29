'use client';

import { useMember } from '@/hooks/useMember';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '@/components/LoginInput';
import { Button } from '@/components/ui/button';

export default function AuthForm() {
  const router = useRouter();
  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const { fetchMember } = useMember();
  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      password: '',
      confirmed_password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data = {
      ...data,
    };
    if (variant === 'LOGIN') {
      axios
        .post(`/user/login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success('登入成功');
            router.push('/');
          }
          fetchMember();
        })
        .catch(() => {
          toast.error('登入失敗');
        })
        .finally(() => reset());
    }

    if (variant === 'REGISTER') {
      if (data.password !== data.confirmed_password) {
        toast.error('密碼不一致');
        return;
      }
      axios
        .post(`/user/register`, data)
        .then((res) => {
          if (res.status === 201) {
            toast.success('註冊成功');
            setVariant('LOGIN');
          }
        })
        .catch(() => {
          toast.error('註冊失敗');
        });
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="name"
            label="姓名"
          />
          <Input
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            id="password"
            label="密碼"
            type="password"
          />
          {variant === 'REGISTER' && (
            <>
              <Input
                disabled={isSubmitting}
                register={register}
                errors={errors}
                required
                id="confirmed_password"
                label="確認密碼"
                type="password"
              />
            </>
          )}
          <div>
            <Button disabled={isSubmitting} type="submit" variant="fullwidth">
              {variant === 'LOGIN' ? '登入' : '註冊'}
            </Button>
          </div>
        </form>

        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">使用第三方登入</span>
            </div>
          </div>
        </div> */}
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>{variant === 'LOGIN' ? '剛加入網站嗎?' : '有帳戶了嗎?'}</div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === 'LOGIN' ? '註冊帳戶' : '登入'}
          </div>
        </div>
      </div>
    </div>
  );
}
