'use client'

import { Alert } from '@/components/Alert';
import Input from '@/components/Input'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LoginClient = () => {

    const endpoint = process.env.NEXT_PUBLIC_API_DOMAIN;
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [alertTrigger, setAlertTrigger] = useState(0)
    const [typeAlert, setTypeAlert] = useState<"success" | "error">("success")
    const [message, setMessage] = useState("");
    const router = useRouter();

    const AuthMe = async () => {
        try {
            
            const response = await fetch(`${endpoint}/api/auth/check-me`, {
                credentials: 'include'
            });

            if (response.status === 200) {
                window.location.href = '/dashboard';
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            const response = await fetch(`${endpoint}/api/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();

            setMessage(data.message);

            if (response.status === 303) {
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            }

            if (response.status !== 200) {
                setTypeAlert("error");
                setAlertTrigger(prev => prev + 1)
                return
            }

            setTypeAlert("success");
            setAlertTrigger(prev => prev + 1)
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);

        } catch (error : any) {
            console.error(error);
            setMessage(error);
            setTypeAlert("error");
            setAlertTrigger(prev => prev + 1)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        AuthMe();
    }, []);

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="box-form-field">
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn-style"
                    disabled={isLoading}
                >
                    Login
                </button>
            </div>
        </form>
        <Alert
            trigger={alertTrigger}
            type={typeAlert}
            message={message}
        />
    </div>
  )
}

export default LoginClient