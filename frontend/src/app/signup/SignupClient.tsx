'use client'

import { Alert } from "@/components/Alert";
import Input from "@/components/Input"
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupClient = () => {
    const endpoint = process.env.NEXT_PUBLIC_API_DOMAIN;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [alertTrigger, setAlertTrigger] = useState(0)
    const [typeAlert, setTypeAlert] = useState<"success" | "error">("success")
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            
            const response = await fetch(`${endpoint}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
            const data = await response.json();

            setMessage(data.message);
            if (response.status !== 201) {
                setTypeAlert("error");
                setAlertTrigger(prev => prev + 1)
                return
            }

            setTypeAlert("success");
            setAlertTrigger(prev => prev + 1)
            setTimeout(() => {
                router.push('/login');
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

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="box-form-field">
                <Input
                    label="Username"
                    id="username"
                    type="text"
                    placeholder="Enter your full name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                    Sign Up
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

export default SignupClient