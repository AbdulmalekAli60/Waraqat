// contexts/FollowContext.tsx
import { FollowContextType } from '@/Interfaces/Interfaces';
import React, { createContext, useContext, useState } from 'react';

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export function FollowProvider({ children }: { children: React.ReactNode }) {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  return (
    <FollowContext.Provider value={{ followersCount, followingCount, setFollowersCount, setFollowingCount }}>
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error('useFollow must be used within a FollowProvider');
  }
  return context;
}