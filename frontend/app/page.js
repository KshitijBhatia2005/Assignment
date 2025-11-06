'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { CheckCircle2, Shield, Zap, LayoutDashboard } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">TaskMaster</span>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="btn btn-secondary"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="btn btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage Your Tasks
            <span className="block text-primary-600">With Confidence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A powerful task management system with secure authentication,
            real-time updates, and an intuitive interface designed for productivity.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/register')}
              className="btn btn-primary text-lg px-8 py-3"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => router.push('/login')}
              className="btn btn-secondary text-lg px-8 py-3"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT-based authentication with bcrypt password hashing ensures your data is always protected.
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <LayoutDashboard className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Intuitive Dashboard</h3>
            <p className="text-gray-600">
              Beautiful, responsive interface with real-time task statistics and easy navigation.
            </p>
          </div>

          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Zap className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Powerful Features</h3>
            <p className="text-gray-600">
              Full CRUD operations, advanced filtering, search functionality, and task prioritization.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 card">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">Secure</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">Fast</div>
              <div className="text-gray-600">Performance</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">Scalable</div>
              <div className="text-gray-600">Architecture</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 TaskMaster. Built with Next.js, Express, and MongoDB.
          </p>
        </div>
      </footer>
    </div>
  )
}

