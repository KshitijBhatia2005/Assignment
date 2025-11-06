'use client'

import { useForm } from 'react-hook-form'
import { taskAPI } from '@/utils/api'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'
import { useState } from 'react'

export default function TaskModal({ task, onClose }) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!task

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: task
      ? {
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
          tags: task.tags?.join(', ') || '',
        }
      : {
          title: '',
          description: '',
          status: 'pending',
          priority: 'medium',
          dueDate: '',
          tags: '',
        },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Convert tags string to array
      const formData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
        dueDate: data.dueDate || undefined,
      }

      if (isEditing) {
        await taskAPI.updateTask(task._id, formData)
        toast.success('Task updated successfully')
      } else {
        await taskAPI.createTask(formData)
        toast.success('Task created successfully')
      }

      onClose()
    } catch (error) {
      const message = error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} task`
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              className={`input ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter task title"
              {...register('title', {
                required: 'Title is required',
                maxLength: {
                  value: 100,
                  message: 'Title cannot exceed 100 characters',
                },
              })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className={`input ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter task description"
              {...register('description', {
                maxLength: {
                  value: 1000,
                  message: 'Description cannot exceed 1000 characters',
                },
              })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select id="status" className="input" {...register('status')}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority *
              </label>
              <select id="priority" className="input" {...register('priority')}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              className="input"
              {...register('dueDate')}
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              className="input"
              placeholder="Enter tags separated by commas (e.g., work, urgent)"
              {...register('tags')}
            />
            <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                <span>{isEditing ? 'Update Task' : 'Create Task'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

