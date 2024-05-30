'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { FaRegClock, FaRegCalendar, FaRegUser } from 'react-icons/fa';
import { FaLocationCrosshairs, FaTag } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { ActivityData } from '@/lib/shared_types';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';

function formatDateTime(isoString: Date | undefined): string {
  if (!isoString) return '';
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() 返回的是 0-11，所以要加1
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year} 年 ${month} 月 ${day} 日 ${hour} 點 ${minute} 分`;
}

// type Activity = ActivityData & {
//   member_id: string;
//   name: string;
// };
type Activity = ActivityData;

type ActivityCardProps = {
  activity: Activity | undefined;
  member_capacity: number | undefined;
  status: () => string | undefined;
  handleClick: () => void;
  identity: string | undefined;
  isLoading: boolean;
};

export default function ActivityCard({
  activity,
  member_capacity,
  status,
  handleClick,
  identity,
  isLoading,
}: ActivityCardProps) {
  const [hoster, setHoster] = useState<string>('');
  const { getUserById } = useUser();
  useEffect(() => {
    if (activity) {
      getUserById(activity.hoster_id).then((data) => {
        setHoster(data.name);
      });
    }
  }, [activity, getUserById]);
  const ButtonName = () => {
    if (identity === 'Host') return '刪除活動';
    if (identity === 'Participant') return '退出活動';
    if (identity === '') return '報名活動';
  };
  const disabled = () => {
    if (identity === 'Host') return false;
    if (identity === 'Participant' && (status() !== '已結束' || status() !== '已取消'))
      return false;
    if (identity === '' && status() === '註冊中') return false;
    return true;
  };

  return (
    <Card className="w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden flex flex-col">
      <CardHeader className="bg-gray-50 p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">{activity?.title}</CardTitle>
        <CardDescription className="text-gray-700 mt-2">
          {activity?.activity_content}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white p-6 space-y-6 flex-grow">
        <div className="flex items-center space-x-3">
          <FaRegClock className="w-5 h-5 text-gray-700" />
          <span className="text-gray-600">狀態:</span>
          <Badge
            className={cn(
              'ml-2 text-gray-100',
              status() === '已結束' || status() === '已刪除' ? 'bg-red-500' : 'bg-green-500'
            )}
          >
            {status ? status() : ''}
          </Badge>
          {/* {member_capacity && member_capacity === 0 && (
            <Badge className="ml-2 text-gray-100 bg-red-500">已額滿</Badge>
          )} */}
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <FaRegCalendar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">註冊開始時間:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(activity?.register_start_timestamp)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegCalendar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">註冊結束時間:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(activity?.register_end_timestamp)}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <FaRegCalendar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">活動開始時間:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(activity?.event_start_timestamp)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegCalendar className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">活動結束時間:</span>
              <span className="ml-2 text-gray-900">
                {formatDateTime(activity?.event_end_timestamp)}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center space-x-3">
          <FaRegUser className="w-5 h-5 text-gray-700" />
          <div>
            <span className="text-gray-600">主持人:</span>
            <span className="ml-2 text-gray-900">{hoster ?? activity?.hoster_id}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-3">
            <FaLocationCrosshairs className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">地點:</span>
              <span className="ml-2 text-gray-900">{activity?.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegUser className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">人數上限:</span>
              <span className="ml-2 text-gray-900">{activity?.member_capacity}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegUser className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">已報名人數:</span>
              <span className="ml-2 text-gray-900">{member_capacity ? member_capacity : 0}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-4">
            <FaRegUser className="w-5 h-5 text-gray-700" />
            <div>
              <span className="text-gray-600">流量上限:</span>
              <span className="ml-2 text-gray-900">{activity?.traffic_capacity}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center space-x-3">
          <FaTag className="w-5 h-5 text-gray-700" />
          <div>
            <span className="text-gray-600">分類:</span>
            {/* <span className="ml-2 text-gray-900"> {getLabelByType(activity?.activity_tag)}</span> */}
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          {/* {comments?.map((comment, index) => {
            if (index >= 2) return;
            return (
              <div className="flex items-center space-x-3 mt-4" key={index}>
                <FaReply className="w-5 h-5 text-gray-700" />
                <div>
                  <span className="text-gray-600">評論:</span>
                  <span className="ml-2 text-gray-900">
                    {comment.comment ? comment.comment.slice(0, 25) + '...' : '目前沒有評論'}
                  </span>
                </div>
              </div>
            );
          })} */}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6">
        <Button
          className={cn(
            'w-full text-white',
            identity === 'Host' || identity === 'Participant'
              ? 'bg-red-500 hover:bg-red-700'
              : 'bg-blue-500 hover:bg-blue-700',
            disabled() ? 'opacity-50 cursor-not-allowed' : ''
          )}
          onClick={() => handleClick()}
          disabled={disabled() || isLoading}
        >
          {ButtonName()}
        </Button>
      </CardFooter>
    </Card>
  );
}
