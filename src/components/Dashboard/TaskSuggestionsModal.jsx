import { useState } from 'react';
import { X, Calendar, ArrowRight } from 'lucide-react';

function TaskSuggestionsModal({ suggestions, onClose, onMoveTasks }) {
  const [selectedTasks, setSelectedTasks] = useState(suggestions.map(task => task.id));
  const [isMoving, setIsMoving] = useState(false);

  const toggleTask = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleMoveAll = async () => {
    setIsMoving(true);
    await onMoveTasks(selectedTasks);
    setIsMoving(false);
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-amber-500" />
            <div>
              <h3 className="text-xl font-semibold text-white">Tâches d'hier non terminées</h3>
              <p className="text-sm text-slate-400 mt-1">
                {suggestions.length} tâche{suggestions.length > 1 ? 's' : ''} à déplacer vers aujourd'hui
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Liste des tâches */}
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="space-y-3">
            {suggestions.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedTasks.includes(task.id)
                    ? 'bg-teal-500/10 border-teal-500'
                    : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-4 h-4 rounded border-slate-500"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{task.title}</h4>
                    {task.description && (
                      <p className="text-sm text-slate-400 mt-1">{task.description}</p>
                    )}
                  </div>
                  {task.priority === 'URGENT' && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded">
                      Urgent
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Plus tard
          </button>
          <button
            onClick={handleMoveAll}
            disabled={selectedTasks.length === 0 || isMoving}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            {isMoving ? (
              'Déplacement...'
            ) : (
              <>
                Déplacer vers aujourd'hui ({selectedTasks.length})
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskSuggestionsModal;
