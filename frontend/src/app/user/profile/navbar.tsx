'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



export default function Navbar() {
    const path = usePathname();
    let lastSegment = "";
    lastSegment = path.substring(path.lastIndexOf('/') + 1);

    return (
        <div className="bg-white text-center text-black font-semiboldflex flex-col justify-center space-y-6">
            <nav className="ml-8">
            <Button className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${lastSegment === "profile" ? "font-bold" : ""}`}>
                <Link href="/user/profile" className="text-sm lg:text-lg">
                Traffic
                </Link>
            </Button>
            <Button className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${lastSegment === "activity" ? "font-bold" : ""}`}>
                <Link href="/user/profile/activity" className="text-sm lg:text-lg">
                Activities
                </Link>
            </Button>
            <Button className={`bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold ${lastSegment === "transaction" ? "font-bold" : ""}`}>
                <Link href="/user/profile/transaction" className="text-sm lg:text-lg">
                Transaction
                </Link>
            </Button>
            </nav>
        </div>
    );
}
