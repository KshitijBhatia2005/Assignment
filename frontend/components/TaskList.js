'use client'

import { Edit2, Trash2, Calendar } from 'lucide-react'

export default function TaskList({ tasks, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="card">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first task to get started</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-pending',
      'in-progress': 'badge-in-progress',
      completed: 'badge-completed',
    }
    return badges[status] || 'badge-pending'
  }

  const getPriorityBadge = (priority) => {
    const badges = {
      low: 'badge-low',
      medium: 'badge-medium',
      high: 'badge-high',
    }
    return badges[priority] || 'badge-medium'
  }

  const formatDate = (date) => {
    if (!date) return 'No due date'
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="card hover:shadow-lg transition-shadow">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Task Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 break-words">
                  {task.title}
                </h3>
              </div>
              
              {task.description && (
                <p className="text-gray-600 mb-3 break-words">{task.description}</p>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`badge ${getStatusBadge(task.status)}`}>
                  {task.status}
                </span>
                <span className={`badge ${getPriorityBadge(task.priority)}`}>
                  {task.priority} priority
                </span>
              </div>

              {task.dueDate && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  <span>Due: {formatDate(task.dueDate)}</span>
                </div>
              )}

              {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
              <button
                onClick={() => onEdit(task)}
                className="btn btn-secondary flex items-center space-x-1 flex-1 lg:flex-none lg:w-full"
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="btn btn-danger flex items-center space-x-1 flex-1 lg:flex-none lg:w-full"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

