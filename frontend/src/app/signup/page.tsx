import AuthCard from '@/components/AuthCard'
import React from 'react'
import SignupClient from './SignupClient'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Get started with your free account today",
};

export default function signup() {
  return (
    <section>
      <AuthCard
        title='Sign Up'
        subtag='Get started with your free account today'
        footer={
          <p className="footer-auth">
              Already have an account?{" "}
              <a href="/login" > Login </a>
          </p>
        }
      >
        <SignupClient />
      </AuthCard>
    </section>
  )
}