import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav style={{ display: 'flex', gap: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <Link href="/dashboard/video/add">Add Video</Link>
                <Link href="/dashboard/video/list">List</Link>
            </nav>

            <main style={{ padding: '20px' }}>
                {children}
            </main>
        </div>
    );
}
