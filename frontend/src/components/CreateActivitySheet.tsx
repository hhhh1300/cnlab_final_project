'use client';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { 
  FaRegClock, 
  FaRegCalendar, 
  FaRegUser, 
  FaWater, 
  FaEdit, 
  FaCalendarAlt,
  FaCheck, 
  FaChild,
} from 'react-icons/fa';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {DateTimePicker} from '@/components/DateTimePicker';



import { FaLocationCrosshairs, FaTag } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from "@/components/ui/calendar"

import type { ActivityData } from '@/lib/shared_types';


type CreateActivitySheetProps = {
  isOfficial: boolean;
};

export default function CreateActivitySheet({
  isOfficial,
}:CreateActivitySheetProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  
  function handleSubmit() {
  }

  return(
    <Card className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col">
      <CardHeader className="bg-gray-50 p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900"><Input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" placeholder="Activity Title"/></CardTitle>
        <CardDescription className="text-gray-700 mt-2">
          {isOfficial ? (
            <span className="text-gray-600 items-center">
              此為官方活動
            </span>
          ): (
            <span className="text-gray-600 items-center">
              此為一般活動
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white p-6 space-y-6">

        <div className="flex items-center space-x-3">
          <FaEdit className="w-5 h-5 text-gray-700" />
          <div>
            <span className="text-gray-600 items-center">內容</span>
            <span className="ml-2 text-gray-900"><Textarea/></span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaChild className="w-5 h-5 text-gray-700" />
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="活動類別" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">運動</SelectItem>
                <SelectItem value="dark">手遊</SelectItem>
                <SelectItem value="system">讀書會</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="w-5 h-5 text-gray-700" />
          <div>
            <span className="text-gray-600 items-center">報名開放時間</span>
            <span className="text-gray-900">
              <DateTimePicker granularity="second" hourCycle={24}/>
            </span>
          <div>
          </div>
            <span className="text-gray-600 items-center">報名結束時間</span>
           <span className="text-gray-900">
              <DateTimePicker granularity="second" hourCycle={24}/>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="w-5 h-5 text-gray-700" />
          <div>
            <span className="text-gray-600 items-center">活動開放時間</span>
            <span className="ml-3 text-gray-900">
              <DateTimePicker granularity="second" hourCycle={24}/>
            </span>
          <div>
          </div>
            <span className="text-gray-600 items-center">活動結束時間</span>
            <span className="ml-3 text-gray-900">
              <DateTimePicker granularity="second" hourCycle={24}/>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FaRegUser className="w-5 h-5 text-gray-700" />
          <div>
            <span className="text-gray-600 items-center">人數上限</span>
            <span className="ml-2 text-gray-900"><Input/></span>
          </div>
        </div>

        {isOfficial ? (
          <div className="flex items-center space-x-3">
            <FaWater className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600 items-center">每人可獲取流量</span>
              <span className="ml-2 text-gray-900"><Input/></span>
            </div>
          </div>
          )
          :(
            <div className="flex items-center space-x-3">
              <FaWater className="w-5 h-5 text-gray-700" />
              <div>
                <span className="text-gray-600 items-center">流量上限</span>
                <span className="ml-2 text-gray-900"><Input/></span>
              </div>
            </div>
        )}

        {isOfficial ? (
            <div></div>
          ):(
            <div className="flex items-center space-x-3">
              <div>
                  <Checkbox checked={isChecked} onCheckedChange={handleCheckboxChange} />
                  <span className="ml-2 text-gray-600 items-center">是否申請流量</span>
              </div>
              <div className="flex items-center space-x-3">
                {isChecked && (
                  <div>
                    <Label htmlFor="reason">請輸入事由:</Label>
                    <Textarea placeholder="Enter your reason here" />
                  </div>
                )}
              </div>
            </div>
          )}

      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-between">
        <Button className="text-white bg-gray-500 hover:bg-blue-600" onClick={handleSubmit}>
          提交
        </Button>
      </CardFooter>
    </Card>
    )
}
