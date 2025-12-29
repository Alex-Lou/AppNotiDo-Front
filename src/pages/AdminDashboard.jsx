// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Shield,
    Users,
    FolderKanban,
    CheckSquare,
    TrendingUp,
    Search,
    Trash2,
    Crown,
    UserCog,
    ChevronLeft,
    ChevronRight,
    Loader2,
    AlertTriangle,
    Eye,
    X
} from 'lucide-react';
import { useAdmin, useAdminUsers, useAdminProjects } from '../hooks/useAdmin';
import adminService from '../services/adminService';

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

function AdminDashboard() {
    const navigate = useNavigate();
    const { isSuperAdmin, loading: checkingAdmin, stats, loadStats } = useAdmin();
    const [activeTab, setActiveTab] = useState('stats');

    useEffect(() => {
        if (!checkingAdmin && !isSuperAdmin) {
            navigate('/dashboard');
        }
    }, [checkingAdmin, isSuperAdmin, navigate]);

    useEffect(() => {
        if (isSuperAdmin) {
            loadStats();
        }
    }, [isSuperAdmin, loadStats]);

    if (checkingAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-cyan-50 dark:from-stone-950 dark:to-amber-950">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-600 dark:text-amber-500" />
                    <p className="text-slate-600 dark:text-amber-200">Vérification des droits...</p>
                </div>
            </div>
        );
    }

    if (!isSuperAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-cyan-50 dark:from-stone-950 dark:to-amber-950">
            {/* Header */}
            <header className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-amber-900/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800 dark:text-amber-50">
                                    Administration
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-amber-300/60">
                                    SUPER_ADMIN Panel
                                </p>
                            </div>
                        </div>
                        
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                                     text-slate-600 hover:bg-slate-100 transition
                                     dark:text-amber-200 dark:hover:bg-amber-900/40"
                        >
                            <ChevronLeft size={16} />
                            Retour au Dashboard
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white/50 dark:bg-stone-900/50 border-b border-slate-200 dark:border-amber-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex gap-1 py-2">
                        {[
                            { id: 'stats', label: 'Statistiques', icon: TrendingUp },
                            { id: 'users', label: 'Utilisateurs', icon: Users },
                            { id: 'projects', label: 'Projets', icon: FolderKanban }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
                                    ${activeTab === tab.id
                                        ? 'bg-cyan-100 text-cyan-700 dark:bg-amber-800 dark:text-amber-100'
                                        : 'text-slate-600 hover:bg-slate-100 dark:text-amber-300 dark:hover:bg-amber-900/40'
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'stats' && <StatsPanel stats={stats} />}
                {activeTab === 'users' && <UsersPanel />}
                {activeTab === 'projects' && <ProjectsPanel />}
            </main>
        </div>
    );
}

// ==========================================
// PANEL STATISTIQUES
// ==========================================

function StatsPanel({ stats }) {
    if (!stats) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-cyan-600 dark:text-amber-500" />
            </div>
        );
    }

    const statCards = [
        { label: 'Utilisateurs', value: stats.totalUsers, icon: Users, color: 'from-blue-500 to-cyan-500' },
        { label: 'Projets', value: stats.totalProjects, icon: FolderKanban, color: 'from-violet-500 to-purple-500' },
        { label: 'Tâches', value: stats.totalTasks, icon: CheckSquare, color: 'from-emerald-500 to-green-500' },
        { label: 'Tâches terminées', value: stats.totalTasksCompleted, icon: CheckSquare, color: 'from-amber-500 to-orange-500' }
    ];

    const recentStats = [
        { label: 'Nouveaux users (30j)', value: stats.newUsersLast30Days },
        { label: 'Nouveaux projets (30j)', value: stats.newProjectsLast30Days },
        { label: 'Nouvelles tâches (30j)', value: stats.newTasksLast30Days }
    ];

    return (
        <div className="space-y-8">
            {/* Cards principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-stone-900/80 rounded-2xl p-6 border border-slate-200 dark:border-amber-900/50 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-800 dark:text-amber-50">
                            {stat.value.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-amber-300/60 mt-1">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Stats récentes */}
            <div className="bg-white dark:bg-stone-900/80 rounded-2xl p-6 border border-slate-200 dark:border-amber-900/50">
                <h3 className="text-lg font-bold text-slate-800 dark:text-amber-50 mb-4">
                    Activité récente (30 derniers jours)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {recentStats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-amber-950/30"
                        >
                            <span className="text-sm text-slate-600 dark:text-amber-200">
                                {stat.label}
                            </span>
                            <span className="text-xl font-bold text-cyan-600 dark:text-amber-400">
                                +{stat.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ==========================================
// PANEL UTILISATEURS
// ==========================================

function UsersPanel() {
    const { users, loading, pagination, loadUsers, updateUserRole, deleteUser } = useAdminUsers();
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [userProjects, setUserProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(false);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleSearch = (e) => {
        e.preventDefault();
        loadUsers(0, pagination.size, search);
    };

    const handlePageChange = (newPage) => {
        loadUsers(newPage, pagination.size, search);
    };

    const handleRoleChange = async (userId, newRole) => {
        if (confirm(`Changer le rôle en ${newRole} ?`)) {
            try {
                await updateUserRole(userId, newRole);
            } catch (err) {
                alert('Erreur lors du changement de rôle');
            }
        }
    };

    const handleDelete = async (userId, username) => {
        if (confirm(`Supprimer l'utilisateur "${username}" ? Cette action est irréversible.`)) {
            try {
                await deleteUser(userId);
            } catch (err) {
                alert('Erreur lors de la suppression');
            }
        }
    };

    const handleViewProjects = async (user) => {
        setSelectedUser(user);
        setLoadingProjects(true);
        try {
            const projects = await adminService.getUserProjects(user.id);
            setUserProjects(projects);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingProjects(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher par username ou email..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 
                                 bg-white dark:bg-stone-900 dark:border-amber-900/50
                                 text-slate-800 dark:text-amber-50
                                 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-amber-500"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 text-white font-medium
                             hover:bg-cyan-700 transition dark:bg-amber-600 dark:hover:bg-amber-700"
                >
                    Rechercher
                </button>
            </form>

            {/* Table */}
            <div className="bg-white dark:bg-stone-900/80 rounded-2xl border border-slate-200 dark:border-amber-900/50 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-cyan-600 dark:text-amber-500" />
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-amber-950/50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Utilisateur
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Rôle Global
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Projets
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Tâches
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Inscrit le
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-amber-900/30">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-amber-950/30 transition">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-amber-500 dark:to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                                                        {user.displayName?.charAt(0).toUpperCase() || user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-800 dark:text-amber-50">
                                                            {user.displayName || user.username}
                                                        </p>
                                                        <p className="text-xs text-slate-500 dark:text-amber-300/60">
                                                            @{user.username}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-amber-200">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={user.globalRole}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                    className={`px-2 py-1 rounded-lg text-xs font-semibold border-0 cursor-pointer
                                                        ${user.globalRole === 'SUPER_ADMIN'
                                                            ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                                                            : 'bg-slate-100 text-slate-600 dark:bg-amber-900/50 dark:text-amber-200'
                                                        }`}
                                                >
                                                    <option value="USER">USER</option>
                                                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-amber-200">
                                                {user.projectCount}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-amber-200">
                                                {user.taskCount}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500 dark:text-amber-300/60">
                                                {user.createdAt}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleViewProjects(user)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition dark:hover:text-amber-400 dark:hover:bg-amber-900/40"
                                                        title="Voir les projets"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    {user.globalRole !== 'SUPER_ADMIN' && (
                                                        <button
                                                            onClick={() => handleDelete(user.id, user.username)}
                                                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition dark:hover:text-red-400 dark:hover:bg-red-900/30"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-amber-900/30">
                            <p className="text-sm text-slate-500 dark:text-amber-300/60">
                                {pagination.totalElements} utilisateur(s) au total
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 0}
                                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition dark:hover:bg-amber-900/40"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="text-sm text-slate-600 dark:text-amber-200">
                                    Page {pagination.page + 1} / {pagination.totalPages || 1}
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.totalPages - 1}
                                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition dark:hover:bg-amber-900/40"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Modal projets utilisateur */}
            {selectedUser && (
                <UserProjectsModal
                    user={selectedUser}
                    projects={userProjects}
                    loading={loadingProjects}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}

// ==========================================
// PANEL PROJETS
// ==========================================

function ProjectsPanel() {
    const { projects, loading, pagination, loadProjects, deleteProject } = useAdminProjects();
    const [search, setSearch] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectMembers, setProjectMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const handleSearch = (e) => {
        e.preventDefault();
        loadProjects(0, pagination.size, search);
    };

    const handlePageChange = (newPage) => {
        loadProjects(newPage, pagination.size, search);
    };

    const handleDelete = async (projectId, projectName) => {
        if (confirm(`Supprimer le projet "${projectName}" ? Les tâches seront dissociées.`)) {
            try {
                await deleteProject(projectId);
            } catch (err) {
                alert('Erreur lors de la suppression');
            }
        }
    };

    const handleViewMembers = async (project) => {
        setSelectedProject(project);
        setLoadingMembers(true);
        try {
            const members = await adminService.getProjectMembers(project.id);
            setProjectMembers(members);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingMembers(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Barre de recherche */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher un projet..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 
                                 bg-white dark:bg-stone-900 dark:border-amber-900/50
                                 text-slate-800 dark:text-amber-50
                                 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-amber-500"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 text-white font-medium
                             hover:bg-cyan-700 transition dark:bg-amber-600 dark:hover:bg-amber-700"
                >
                    Rechercher
                </button>
            </form>

            {/* Table */}
            <div className="bg-white dark:bg-stone-900/80 rounded-2xl border border-slate-200 dark:border-amber-900/50 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-cyan-600 dark:text-amber-500" />
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-amber-950/50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Projet
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Propriétaire
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Membres
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Tâches
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Créé le
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-amber-200 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-amber-900/30">
                                    {projects.map(project => (
                                        <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-amber-950/30 transition">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="h-9 w-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                                                        style={{ backgroundColor: project.color || '#3B82F6' }}
                                                    >
                                                        {project.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-slate-800 dark:text-amber-50">
                                                        {project.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-amber-200">
                                                    <Crown size={14} className="text-amber-500" />
                                                    {project.ownerUsername}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-amber-200">
                                                {project.memberCount}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-600 dark:text-amber-200">
                                                {project.taskCount}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                                    ${project.isArchived
                                                        ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                                                    }`}
                                                >
                                                    {project.isArchived ? 'Archivé' : 'Actif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-slate-500 dark:text-amber-300/60">
                                                {project.createdAt}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleViewMembers(project)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition dark:hover:text-amber-400 dark:hover:bg-amber-900/40"
                                                        title="Voir les membres"
                                                    >
                                                        <Users size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.id, project.name)}
                                                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition dark:hover:text-red-400 dark:hover:bg-red-900/30"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-amber-900/30">
                            <p className="text-sm text-slate-500 dark:text-amber-300/60">
                                {pagination.totalElements} projet(s) au total
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(pagination.page - 1)}
                                    disabled={pagination.page === 0}
                                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition dark:hover:bg-amber-900/40"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="text-sm text-slate-600 dark:text-amber-200">
                                    Page {pagination.page + 1} / {pagination.totalPages || 1}
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.page + 1)}
                                    disabled={pagination.page >= pagination.totalPages - 1}
                                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition dark:hover:bg-amber-900/40"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Modal membres projet */}
            {selectedProject && (
                <ProjectMembersModal
                    project={selectedProject}
                    members={projectMembers}
                    loading={loadingMembers}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
}

// ==========================================
// MODALS
// ==========================================

function UserProjectsModal({ user, projects, loading, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-stone-900 rounded-2xl border border-slate-200 dark:border-amber-900/50 w-full max-w-lg max-h-[80vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-amber-900/50">
                    <h3 className="font-bold text-slate-800 dark:text-amber-50">
                        Projets de {user.displayName || user.username}
                    </h3>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-amber-900/40">
                        <X size={18} className="text-slate-500 dark:text-amber-300" />
                    </button>
                </div>
                
                <div className="p-4 overflow-y-auto max-h-96">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-cyan-600 dark:text-amber-500" />
                        </div>
                    ) : projects.length === 0 ? (
                        <p className="text-center text-slate-500 dark:text-amber-300/60 py-8">
                            Aucun projet
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-amber-950/30"
                                >
                                    <div
                                        className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                                        style={{ backgroundColor: project.color || '#3B82F6' }}
                                    >
                                        {project.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-800 dark:text-amber-50">
                                            {project.name}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-amber-300/60">
                                            {project.memberCount} membre(s) • {project.taskCount} tâche(s)
                                        </p>
                                    </div>
                                    {project.isArchived && (
                                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                                            Archivé
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ProjectMembersModal({ project, members, loading, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="bg-white dark:bg-stone-900 rounded-2xl border border-slate-200 dark:border-amber-900/50 w-full max-w-lg max-h-[80vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-amber-900/50">
                    <h3 className="font-bold text-slate-800 dark:text-amber-50">
                        Membres de {project.name}
                    </h3>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-amber-900/40">
                        <X size={18} className="text-slate-500 dark:text-amber-300" />
                    </button>
                </div>
                
                <div className="p-4 overflow-y-auto max-h-96">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-cyan-600 dark:text-amber-500" />
                        </div>
                    ) : members.length === 0 ? (
                        <p className="text-center text-slate-500 dark:text-amber-300/60 py-8">
                            Aucun membre
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {members.map(member => (
                                <div
                                    key={member.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-amber-950/30"
                                >
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 dark:from-amber-500 dark:to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                                        {member.displayName?.charAt(0).toUpperCase() || member.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-800 dark:text-amber-50">
                                            {member.displayName || member.username}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-amber-300/60">
                                            {member.email}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;