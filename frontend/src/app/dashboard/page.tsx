import { Metadata } from "next";
import DashboardClient from "./DashboardClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default async function Dashboard() {

    const token = (await cookies()).get('auth_token')?.value;
    
    if (!token) {
        redirect('/login');
    }

  return (
    <section>
        <DashboardClient />
    </section>
  )
} 