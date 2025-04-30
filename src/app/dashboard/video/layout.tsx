'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Now using this on the client-side

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter(); // Now using useRouter on the client-side
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            // Send the logout request to the API
            await axios.get('/api/logout');
            // After the response, redirect to the login page
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            setLoggingOut(false);
        }
    };

    return (
        <div>
            <nav style={{ display: 'flex', gap: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <Link href="/dashboard/video/add">Add Video</Link>
                <Link href="/dashboard/video/list">List</Link>
                <button
                    onClick={handleLogout}
                    style={{
                        marginLeft: 'auto',
                        padding: '10px 15px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    disabled={loggingOut}
                >
                    {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
            </nav>

            <main style={{ padding: '20px' }}>
                {children}
            </main>
        </div>
    );
}
