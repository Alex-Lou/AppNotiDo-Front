// src/components/Skeleton/DashboardSkeleton.jsx
import Skeleton from './Skeleton';
import TaskItemSkeleton from './TaskItemSkeleton';

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-teal-100 to-orange-200 text-slate-700 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-amber-50">
      {/* Skeleton Sidebar */}
      <aside className="fixed left-0 top-0 z-20 flex h-full w-72 flex-col border-r-2 border-cyan-300/60 bg-gradient-to-b from-cyan-200 via-teal-200 to-orange-200 px-7 py-7 dark:border-amber-900/60 dark:bg-gradient-to-b dark:from-amber-950/80 dark:via-stone-950/90 dark:to-slate-950/80">
        <div className="mb-10">
          <Skeleton className="h-9 w-9 mb-3" variant="rounded-2xl" />
          <Skeleton className="h-8 w-40" />
        </div>
        <Skeleton className="h-24 w-full mb-8" variant="rounded-2xl" />
      </aside>

      {/* Contenu principal avec skeletons */}
      <main className="ml-72 mr-80 min-h-screen px-10 py-10">
        {/* Header skeleton */}
        <div className="mb-10">
          <Skeleton className="h-10 w-64 mb-6" />
          
          {/* Stats cards skeleton */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-24" variant="rounded-2xl" />
            ))}
          </div>

          {/* Filters skeleton */}
          <Skeleton className="h-14 w-full" variant="rounded-xl" />
        </div>

        {/* Task list skeletons */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <TaskItemSkeleton key={i} />
          ))}
        </div>
      </main>

      {/* RightSidebar skeleton */}
      <aside className="fixed right-0 top-0 z-20 h-full w-80 border-l-2 border-cyan-300/60 bg-gradient-to-b from-cyan-200 via-teal-200 to-orange-200 px-6 py-7 dark:border-amber-900/60 dark:bg-gradient-to-b dark:from-amber-950/80 dark:via-stone-950/90 dark:to-slate-950/80">
        <Skeleton className="h-32 w-full mb-6" variant="rounded-2xl" />
        <Skeleton className="h-48 w-full" variant="rounded-2xl" />
      </aside>
    </div>
  );
}

export default DashboardSkeleton;
