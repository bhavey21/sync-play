// utils/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(protectedPaths: string[]) {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const router = useRouter();
  
  useEffect(() => {
    // Simulate checking for token or other authentication mechanism
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (!token && protectedPaths.includes(window.location.pathname)) {
      router.push('/login');
    } else {
      setIsLoading(false); // Once check is complete, stop loading
    }
  }, [router, protectedPaths]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null; // No need to render anything if everything is good
}
