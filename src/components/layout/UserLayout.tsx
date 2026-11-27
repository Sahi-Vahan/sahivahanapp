import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserHeader } from './UserHeader';
import { UserFooter } from './UserFooter';

export const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] text-slate-900">
      <UserHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

