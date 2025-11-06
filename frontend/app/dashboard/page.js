'use client'

import { useState, useEffect } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import TaskList from '@/components/TaskList'
import TaskModal from '@/components/TaskModal'
import { taskAPI } from '@/utils/api'
import toast from 'react-hot-toast'
import { Plus, Search, Filter, ListTodo, Clock, CheckCircle2 } from 'lucide-react'

export default function DashboardPage() {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, 'in-progress': 0, completed: 0 })
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sortBy: 'createdAt',
    order: 'desc',
  })

  useEffect(() => {
    fetchTasks()
    fetchStats()
  }, [filters])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const params = {}
      if (filters.search) params.search = filters.search
      if (filters.status) params.status = filters.status
      if (filters.priority) params.priority = filters.priority
      if (filters.sortBy) params.sortBy = filters.sortBy
      if (filters.order) params.order = filters.order

      const response = await taskAPI.getTasks(params)
      setTasks(response.data.data)
    } catch (error) {
      toast.error('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await taskAPI.getStats()
      setStats(response.data.data)
    } catch (error) {
      console.error('Failed to fetch stats', error)
    }
  }

  const handleCreateTask = () => {
    setEditingTask(null)
    setShowModal(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowModal(true)
  }

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      await taskAPI.deleteTask(taskId)
      toast.success('Task deleted successfully')
      fetchTasks()
      fetchStats()
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingTask(null)
    fetchTasks()
    fetchStats()
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      sortBy: 'createdAt',
      order: 'desc',
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <ListTodo className="text-primary-600" size={24} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">{stats['in-progress']}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="text-green-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Filters */}
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="input pl-10"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  className="input w-auto"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  className="input w-auto"
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                  <option value="">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <select
                  className="input w-auto"
                  value={`${filters.sortBy}-${filters.order}`}
                  onChange={(e) => {
                    const [sortBy, order] = e.target.value.split('-')
                    setFilters((prev) => ({ ...prev, sortBy, order }))
                  }}
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="dueDate-asc">Due Date (Soon)</option>
                  <option value="dueDate-desc">Due Date (Later)</option>
                  <option value="priority-desc">Priority (High)</option>
                  <option value="priority-asc">Priority (Low)</option>
                </select>

                {(filters.search || filters.status || filters.priority) && (
                  <button onClick={clearFilters} className="btn btn-secondary">
                    Clear Filters
                  </button>
                )}

                <button onClick={handleCreateTask} className="btn btn-primary flex items-center space-x-2">
                  <Plus size={20} />
                  <span>New Task</span>
                </button>
              </div>
            </div>
          </div>

          {/* Task List */}
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </main>

        {/* Task Modal */}
        {showModal && (
          <TaskModal
            task={editingTask}
            onClose={handleModalClose}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}

