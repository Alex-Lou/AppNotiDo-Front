// src/components/Skeleton/DashboardSkeleton.jsx
import Skeleton from './Skeleton';
import TaskItemSkeleton from './TaskItemSkeleton';
import {
  DASHBOARD_SKELETON_CONTAINER,
  DASHBOARD_SKELETON_SIDEBAR,
  DASHBOARD_SKELETON_SIDEBAR_HEADER,
  DASHBOARD_SKELETON_MAIN,
  DASHBOARD_SKELETON_HEADER,
  DASHBOARD_SKELETON_STATS_GRID,
  DASHBOARD_SKELETON_TASK_LIST,
  DASHBOARD_SKELETON_RIGHT_SIDEBAR
} from '../../constants/styles';

function DashboardSkeleton() {
  return (
    <div className={DASHBOARD_SKELETON_CONTAINER}>
      {/* Skeleton Sidebar */}
      <aside className={DASHBOARD_SKELETON_SIDEBAR}>
        <div className={DASHBOARD_SKELETON_SIDEBAR_HEADER}>
          <Skeleton className="h-9 w-9 mb-3" variant="rounded-2xl" />
          <Skeleton className="h-8 w-40" />
        </div>
        <Skeleton className="h-24 w-full mb-8" variant="rounded-2xl" />
      </aside>

      {/* Contenu principal avec skeletons */}
      <main className={DASHBOARD_SKELETON_MAIN}>
        {/* Header skeleton */}
        <div className={DASHBOARD_SKELETON_HEADER}>
          <Skeleton className="h-10 w-64 mb-6" />
          
          {/* Stats cards skeleton */}
          <div className={DASHBOARD_SKELETON_STATS_GRID}>
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-24" variant="rounded-2xl" />
            ))}
          </div>

          {/* Filters skeleton */}
          <Skeleton className="h-14 w-full" variant="rounded-xl" />
        </div>

        {/* Task list skeletons */}
        <div className={DASHBOARD_SKELETON_TASK_LIST}>
          {[1, 2, 3, 4, 5].map(i => (
            <TaskItemSkeleton key={i} />
          ))}
        </div>
      </main>

      {/* RightSidebar skeleton */}
      <aside className={DASHBOARD_SKELETON_RIGHT_SIDEBAR}>
        <Skeleton className="h-32 w-full mb-6" variant="rounded-2xl" />
        <Skeleton className="h-48 w-full" variant="rounded-2xl" />
      </aside>
    </div>
  );
}

export default DashboardSkeleton;
