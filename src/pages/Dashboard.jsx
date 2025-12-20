import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, statusFilter, priorityFilter]);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.content);
    } catch (error) {
      console.error('Erreur:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tasks];

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (priorityFilter !== 'ALL') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    setFilteredTasks(filtered);
  };

  const handleTaskCreated = async (taskData) => {
    await api.post('/tasks', taskData);
    fetchTasks();
  };

  const handleTaskUpdate = async (taskId, taskData) => {
    await api.put(`/tasks/${taskId}`, taskData);
    fetchTasks();
  };

  const handleTaskDelete = async (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            📝 AppNotiDo
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Bonjour, {username} 👋</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <TaskForm onTaskCreated={handleTaskCreated} />

        <div className="bg-white rounded-lg shadow p-6">
          {/* Filtres */}
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <h2 className="text-xl font-bold">
              Mes Tâches ({filteredTasks.length}/{tasks.length})
            </h2>

            <div className="flex gap-3 ml-auto">
              {/* Filtre Statut */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">📋 Tous les statuts</option>
                <option value="TODO">📝 À faire</option>
                <option value="IN_PROGRESS">⏳ En cours</option>
                <option value="DONE">✅ Terminé</option>
              </select>

              {/* Filtre Priorité */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">🎯 Toutes priorités</option>
                <option value="LOW">🟢 Basse</option>
                <option value="MEDIUM">🟡 Moyenne</option>
                <option value="HIGH">🔴 Haute</option>
              </select>

              {/* Reset filtres */}
              {(statusFilter !== 'ALL' || priorityFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setStatusFilter('ALL');
                    setPriorityFilter('ALL');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  ❌ Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Liste des tâches */}
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {tasks.length === 0 
                ? "Aucune tâche pour le moment. Créez-en une ! 🚀" 
                : "Aucune tâche ne correspond aux filtres sélectionnés."}
            </p>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;