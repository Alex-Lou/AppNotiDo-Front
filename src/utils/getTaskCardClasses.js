// src/utils/getTaskCardClasses.js
import { classNames } from './classNames';
import { TASK_CARD_BASE, TASK_CARD_GRADIENT, TASK_CARD_BORDER, TASK_CARD_HOVER } from '../constants/styles';

export function getTaskCardClasses(isLocked, isDragging, isDragOver, isDone) {
  return classNames(
    TASK_CARD_BASE,
    TASK_CARD_GRADIENT,
    TASK_CARD_BORDER,
    TASK_CARD_HOVER,
    isLocked ? 'cursor-not-allowed opacity-90 ring-2 ring-amber-500/40 dark:ring-amber-600/40' : 'cursor-move',
    isDragging && 'opacity-70 scale-[1.02] shadow-2xl ring-2 ring-cyan-500/60 dark:ring-amber-500/60',
    isDragOver && 'ring-2 ring-dashed ring-cyan-400/80 dark:ring-amber-400/80',
    isDone && 'animate-[pulse_1.2s_ease-out_1]'
  );
}
