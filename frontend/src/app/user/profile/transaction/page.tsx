'use client';

import { Button } from '@/components/ui/button';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useTransaction  from '@/hooks/useTransaction';
import toast from 'react-hot-toast';
import { useUser, useMember } from '@/hooks/useMember';

export default function Transaction(){
    const [success, setSuccess] = useState(false);
    const { postTransaction } = useTransaction();
    const { member } = useMember();
    const { getTraffic, checkUser } = useUser();
    const member_id = member?.member_id;

    useEffect(() => {
        setSuccess(true);
    }
    , [member_id]);

    const fetchData = async (member_id : string | undefined, name : string, traffic : number) => {
        const trafficData = await getTraffic(member_id);
        if(trafficData[0].traffic < traffic){
            console.log(trafficData[0].traffic, traffic)
            setSuccess(false);
            toast.error('fail')
            return;
        }
        const is_name_exist = await checkUser(name);
        console.log(is_name_exist)
        if (is_name_exist.length === 0){
            toast.error('fail');
            return;
        }
        const data = await postTransaction(member_id, name, traffic);
        console.log(data.success);
        setSuccess(data.success);
        if (success)
            toast.success('成功轉移');
        else
            toast.error('fail')
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const traffic = Number(formData.get('traffic') as string);

        fetchData(member_id, name, traffic);
    };

    return (
        <div className="bg-white  text-black transition rounded-lg font-semibold  flex text-center items-center justify-center h-[40vh]">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" className="border border-gray-300 rounded px-3 py-2 w-full" name="name" placeholder="Enter Name"/>
                </div>
                <div className="mb-3">
                    <input type="text" className="border border-gray-300 rounded px-3 py-2 w-full" name="traffic" placeholder="Traffic"/>
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg  font-semibold">
                    Submit
                </Button>
            </form>
        </div>
    );
};