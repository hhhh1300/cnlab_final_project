'use client';

import { Button } from '@/components/ui/button';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useTransaction  from '@/hooks/useTransaction';
import useMember from '@/hooks/useMember';


export default function Transaction(){
    const [success, setSuccess] = useState(false);
    const { postTransaction } = useTransaction();
    const { getTraffic } = useMember();
    const member_id = 100;


    useEffect(() => {
        setSuccess(true);
    }
    , [member_id]);

    const fetchData = async (member_id : number, name : string, traffic : number) => {
        const trafficData = await getTraffic(member_id);
        if(trafficData[0].traffic < traffic){
            setSuccess(false);
            return;
        }
        const data = await postTransaction(member_id, name, traffic);
        console.log(data.success);
        setSuccess(data.success);
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
                <div className="text-red-500">
                    {success ? '' : 'Failed'}
                </div>
            </form>
        </div>
    );
};