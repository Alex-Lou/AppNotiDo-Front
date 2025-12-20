import Skeleton from './Skeleton';

function TaskItemSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-300/70 bg-gradient-to-br from-white via-cyan-50/30 to-orange-50/30 px-6 py-5 shadow-lg dark:border-amber-900/60 dark:bg-gradient-to-br dark:from-amber-950/30 dark:via-stone-950/40 dark:to-slate-950/30">
      {/* Halo décoratif */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-200/40 via-teal-200/40 to-orange-200/40 dark:bg-gradient-to-br dark:from-amber-900/30 dark:via-orange-900/30 dark:to-rose-900/30" />

      {/* Handle drag */}
      <div className="pointer-events-none absolute inset-x-6 top-3 flex justify-center">
        <div className="h-2 w-12 rounded-full bg-gradient-to-r from-cyan-300 via-teal-300 to-orange-300 opacity-40 dark:bg-gradient-to-r dark:from-amber-700/60 dark:via-orange-700/60 dark:to-rose-700/60" />
      </div>

      <div className="mt-5 flex justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Titre */}
          <Skeleton className="h-6 w-3/4" />
          
          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" variant="rounded-xl" />
            <Skeleton className="h-6 w-20" variant="rounded-xl" />
          </div>

          {/* Date et durée */}
          <div className="flex gap-3">
            <Skeleton className="h-7 w-24" variant="rounded-xl" />
            <Skeleton className="h-7 w-20" variant="rounded-xl" />
          </div>

          {/* Badges statut et priorité */}
          <div className="flex gap-2">
            <Skeleton className="h-7 w-28" variant="rounded-xl" />
            <Skeleton className="h-7 w-24" variant="rounded-xl" />
          </div>

          {/* Barre de progression */}
          <Skeleton className="h-2 w-full" variant="rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default TaskItemSkeleton;