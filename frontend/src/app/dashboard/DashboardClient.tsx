'use client'

import { useEffect, useState } from "react";

interface DataUser {
    username: string
}

const DashboardClient = () => {

    const endpoint = process.env.NEXT_PUBLIC_API_DOMAIN;
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<DataUser | null>(null);

    const AuthMe = async () => {
        try {
            
            const response = await fetch(`${endpoint}/api/auth/check-me`, {
                credentials: 'include'
            });

            if (response.status !== 200) {
                window.location.href = '/login';
            } else {
                setLoading(false);
            }

        } catch (error) {
            console.error(error);
            window.location.href = '/login';
        }
    }

    const userData = async () => {
        try {
            
            const response = await fetch(`${endpoint}/api/auth/user`, {
                method: 'POST',
                credentials: 'include'
            });
            const data = await response.json();
            setUser(data.data[0]);

        } catch (error) {
            console.error();
            alert(error)
        }
    }

    const handleLogout = async () => {
        try {

            const confirmLogout = window.confirm("Are you sure you want to logout?");
            if (!confirmLogout) return;
            
            const response = await fetch(`${endpoint}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (response.status === 200) {
                window.location.href = '/login';
            }

        } catch (error) {
            console.error(error)
            alert(error)
        }
    }

    useEffect(() => {
        AuthMe();
        userData();
    }, []);

    if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-[1.5rem] font-semibold text-[#161616] text-center">Hello🖐, {user?.username}</h1>
        <button
        className="p-[10px] bg-primary text-[#fafaff] text-[15px] rounded-sm font-semibold mt-2 cursor-pointer hover:brightness-95 "
        onClick={handleLogout}
        >Logout</button>
    </div>
  )
}

export default DashboardClient