'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function UserSync() {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Use a flag in sessionStorage to prevent redundant syncs in the same session
      const syncKey = `resolvr_sync_${user.id}`;
      if (sessionStorage.getItem(syncKey)) return;

      const syncUser = async () => {
        try {
          const response = await fetch('/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: user.fullName || user.username || 'Anonymous',
              email: user.primaryEmailAddress?.emailAddress || 'no-email@resolvr.local',
              clerkId: user.id,
            }),
          });

          if (response.ok) {
            sessionStorage.setItem(syncKey, 'true');
            console.log('Resolvr: Citizen Node Synchronized');
          } else {
            const errorText = await response.text();
            console.error('Resolvr Error: Sync Failure', errorText);
          }
        } catch (error) {
          console.error('Resolvr Error: Network Relay Failure', error);
        }
      };

      syncUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return null;
}
