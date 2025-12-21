// src/components/Skeleton/TaskItemSkeleton.jsx
import Skeleton from './Skeleton';
import {
  TASK_ITEM_SKELETON_CONTAINER,
  TASK_ITEM_SKELETON_HALO,
  TASK_ITEM_SKELETON_DRAG_HANDLE_CONTAINER,
  TASK_ITEM_SKELETON_DRAG_HANDLE,
  TASK_ITEM_SKELETON_CONTENT,
  TASK_ITEM_SKELETON_MAIN,
  TASK_ITEM_SKELETON_TAGS,
  TASK_ITEM_SKELETON_DATE_DURATION,
  TASK_ITEM_SKELETON_BADGES
} from '../../constants/styles';

function TaskItemSkeleton() {
  return (
    <div className={TASK_ITEM_SKELETON_CONTAINER}>
      {/* Halo décoratif */}
      <div className={TASK_ITEM_SKELETON_HALO} />

      {/* Handle drag */}
      <div className={TASK_ITEM_SKELETON_DRAG_HANDLE_CONTAINER}>
        <div className={TASK_ITEM_SKELETON_DRAG_HANDLE} />
      </div>

      <div className={TASK_ITEM_SKELETON_CONTENT}>
        <div className={TASK_ITEM_SKELETON_MAIN}>
          {/* Titre */}
          <Skeleton className="h-6 w-3/4" />
          
          {/* Description */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Tags */}
          <div className={TASK_ITEM_SKELETON_TAGS}>
            <Skeleton className="h-6 w-16" variant="rounded-xl" />
            <Skeleton className="h-6 w-20" variant="rounded-xl" />
          </div>

          {/* Date et durée */}
          <div className={TASK_ITEM_SKELETON_DATE_DURATION}>
            <Skeleton className="h-7 w-24" variant="rounded-xl" />
            <Skeleton className="h-7 w-20" variant="rounded-xl" />
          </div>

          {/* Badges statut et priorité */}
          <div className={TASK_ITEM_SKELETON_BADGES}>
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
