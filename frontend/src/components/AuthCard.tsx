import { ReactNode } from "react";

interface AuthCardProps {
    title: string;
    subtag: string;
    children: ReactNode;
    footer: ReactNode;
}

const AuthCard = ({ title, subtag, children, footer }: AuthCardProps) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg
                        className="w-6 h-6 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-semibold text-foreground">
                    {title}
                </h1>
                <p className="text-muted-foreground mt-2">
                    {subtag}
                </p>
            </div>
            {children}
            {footer}
        </div>
    )
}

export default AuthCard