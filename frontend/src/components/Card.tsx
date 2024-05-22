'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { ActivityData } from '@/lib/shared_types';
import { FaLocationDot } from 'react-icons/fa6';

interface CardProps {
  data: ActivityData;
}

const Card = ({ data }: CardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/activity/main/${data.activity_id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-0 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-slate-400">
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={'/images/placeholder.jpg'}
            alt="Listing"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 font-semibold text-2xl">{data.title}</div>
        </div>
        <div className="font-light text-neutral-500 ml-1">
          {data.activity_tag == '' ? '#tag' : data.activity_tag}
        </div>
        <div className="flex items-center text-gray-400">
          <FaLocationDot className="mr-1" />
          <div className="flex items-center text-sm text-gray-500">
            <div className="mr-2">{data.location}</div>
          </div>
          <div className="text-xs text-gray-500 mr-2">開放名額: {data.member_capacity}</div>
          <div className="text-xs text-gray-500">流量限制: {data.traffic_capacity}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
