// components/Dashboard/DashboardLayout.jsx
function DashboardLayout({ children, sidebar, rightSidebar, notifications }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-orange-200 text-slate-700 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-amber-50">
      {notifications}
      {sidebar}
      {rightSidebar}
      <main className="ml-72 mr-80 min-h-screen px-10 py-10">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
