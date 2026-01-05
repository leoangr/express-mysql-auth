import AuthCard from '@/components/AuthCard'
import React from 'react'
import LoginClient from './LoginClient'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login",
  description: "Welcome back, please login to your account",
};

export default function login() {
  return (
    <section>
      <AuthCard
        title='Login'
        subtag='Welcome back, please login to your account'
        footer={
          <p className="footer-auth">
              Don't have an account?{" "}
              <a href="/signup" > Signup </a>
          </p>
        }
      >
        <LoginClient />
      </AuthCard>
    </section>
  )
}