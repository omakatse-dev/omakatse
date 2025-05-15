'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function PathTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    // Only update previousPath if the path actually changed
    if (pathname !== lastPathRef.current) {
      sessionStorage.setItem('previousPath', lastPathRef.current);
      lastPathRef.current = pathname;
    }
  }, [pathname]);

  // This component doesn't render anything
  return null;
} 