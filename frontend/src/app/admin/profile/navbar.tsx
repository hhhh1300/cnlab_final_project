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
            <p> UserProfile </p>
            </nav>
        </div>
    );
}