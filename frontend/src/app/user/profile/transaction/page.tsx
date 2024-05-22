'use client';

import { Button } from '@/components/ui/button';
import React, { useState, ChangeEvent, FormEvent } from 'react';

export default function Transaction(){
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="bg-white  text-black transition rounded-lg font-semibold  flex text-center items-center justify-center h-[40vh]">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="border border-gray-300 rounded px-3 py-2 w-full" value={inputValue} onChange={handleChange}placeholder="Enter Name"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="border border-gray-300 rounded px-3 py-2 w-full" value={inputValue} onChange={handleChange}placeholder="Traffic"/>
                    </div>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg  font-semibold">
                        Submit
                    </Button>
                </form>
        </div>
    );
};