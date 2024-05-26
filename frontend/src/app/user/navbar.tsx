'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



export default function Navbar() {
    
    const path = usePathname();
    let lastSegment = "";
    lastSegment = path.substring(path.lastIndexOf('/') + 1);

    return (
        <>
            <div className="bg-white  text-black font-semibold space-y-6 items-center">
            <Button className="bg-white text-black h-[10vh] justify-center  hover:bg-white transition font-bold">
                <span className="bg-black text-white h-[7vh] w-[16vh] rounded-xl transition hover:bg-black font-extrabold flex items-center justify-center">
                <Link href="/user" className="text-sm lg:text-lg">
                    EngageNTU
                </Link>
                </span>
            </Button>
            <Button className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${lastSegment === "profile" ? "font-bold" : ""}`}>
                <Link href="/user/profile" className="text-sm lg:text-lg">
                Profile
                </Link>
            </Button>
            <Button className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${lastSegment === "activity" ? "font-bold" : ""}`}>
                <Link href="/user/activity" className="text-sm lg:text-lg">
                Activity List
                </Link>
            </Button>
            <Button className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${lastSegment === "create_activities" ? "font-bold" : ""}`}>
                <Link href="/user/create_activities" className="text-sm lg:text-lg">
                Create Activities
                </Link>
            </Button>
            <Button className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold float-right ${lastSegment === "login" ? "font-bold" : ""}`}>
                <Link href="/user/login" className="text-sm lg:text-lg">
                Login
                </Link>
            </Button>
            </div>
        </>
    );
}