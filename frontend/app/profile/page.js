'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext'
import { userAPI } from '@/utils/api'
import toast from 'react-hot-toast'
import { User, Mail, Calendar, Shield, Lock } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
    },
  })

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch,
  } = useForm()

  const newPassword = watch('newPassword')

  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name,
        bio: user.bio || '',
        avatar: user.avatar || '',
      })
    }
  }, [user, resetProfile])

  const onSubmitProfile = async (data) => {
    setIsLoadingProfile(true)
    try {
      const response = await userAPI.updateProfile(data)
      updateUser(response.data.data)
      toast.success('Profile updated successfully')
      setIsEditingProfile(false)
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile'
      toast.error(message)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const onSubmitPassword = async (data) => {
    setIsLoadingPassword(true)
    try {
      await userAPI.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      toast.success('Password updated successfully')
      resetPassword()
      setIsChangingPassword(false)
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update password'
      toast.error(message)
    } finally {
      setIsLoadingPassword(false)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
          </div>

          {/* Profile Card */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`input ${profileErrors.name ? 'border-red-500' : ''}`}
                    {...registerProfile('name', {
                      required: 'Name is required',
                      maxLength: {
                        value: 50,
                        message: 'Name cannot exceed 50 characters',
                      },
                    })}
                  />
                  {profileErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.name.message}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className={`input ${profileErrors.bio ? 'border-red-500' : ''}`}
                    placeholder="Tell us about yourself"
                    {...registerProfile('bio', {
                      maxLength: {
                        value: 500,
                        message: 'Bio cannot exceed 500 characters',
                      },
                    })}
                  />
                  {profileErrors.bio && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.bio.message}</p>
                  )}
                </div>

                {/* Avatar URL */}
                <div>
                  <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                    Avatar URL
                  </label>
                  <input
                    id="avatar"
                    type="url"
                    className={`input ${profileErrors.avatar ? 'border-red-500' : ''}`}
                    placeholder="https://example.com/avatar.jpg"
                    {...registerProfile('avatar')}
                  />
                  {profileErrors.avatar && (
                    <p className="mt-1 text-sm text-red-600">{profileErrors.avatar.message}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoadingProfile}
                    className="btn btn-primary"
                  >
                    {isLoadingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingProfile(false)
                      resetProfile()
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <User className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-gray-900 font-medium">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="text-gray-900 font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="text-gray-900 font-medium capitalize">{user?.role}</p>
                  </div>
                </div>

                {user?.bio && (
                  <div className="flex items-start space-x-3">
                    <User className="text-gray-400 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Bio</p>
                      <p className="text-gray-900">{user.bio}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Calendar className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="text-gray-900 font-medium">{formatDate(user?.createdAt)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Change Password Card */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                <p className="text-sm text-gray-600 mt-1">Update your password to keep your account secure</p>
              </div>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Lock size={18} />
                  <span>Change Password</span>
                </button>
              )}
            </div>

            {isChangingPassword && (
              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
                {/* Current Password */}
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    className={`input ${passwordErrors.currentPassword ? 'border-red-500' : ''}`}
                    {...registerPassword('currentPassword', {
                      required: 'Current password is required',
                    })}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className={`input ${passwordErrors.newPassword ? 'border-red-500' : ''}`}
                    {...registerPassword('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`input ${passwordErrors.confirmPassword ? 'border-red-500' : ''}`}
                    {...registerPassword('confirmPassword', {
                      required: 'Please confirm your new password',
                      validate: (value) =>
                        value === newPassword || 'Passwords do not match',
                    })}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoadingPassword}
                    className="btn btn-primary"
                  >
                    {isLoadingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false)
                      resetPassword()
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

