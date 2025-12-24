// src/components/Dashboard/CalendarView.jsx
import { useState, useMemo } from 'react';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiCalendar,
  FiClock,
  FiX,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiPlus
} from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import { formatDate, formatDuration } from '../../utils/taskUtils';
import {
  CALENDAR_CONTAINER,
  CALENDAR_HEADER,
  CALENDAR_NAV_BUTTON,
  CALENDAR_TITLE,
  CALENDAR_TODAY_BUTTON,
  CALENDAR_WEEKDAYS,
  CALENDAR_WEEKDAY,
  CALENDAR_GRID,
  CALENDAR_DAY,
  CALENDAR_DAY_OTHER_MONTH,
  CALENDAR_DAY_TODAY,
  CALENDAR_DAY_SELECTED,
  CALENDAR_DAY_HAS_TASKS,
  CALENDAR_DAY_NUMBER,
  CALENDAR_DAY_TASKS,
  CALENDAR_TASK_DOT,
  CALENDAR_TASK_DOT_HIGH,
  CALENDAR_TASK_DOT_MEDIUM,
  CALENDAR_TASK_DOT_LOW,
  CALENDAR_MODAL_OVERLAY,
  CALENDAR_MODAL,
  CALENDAR_MODAL_HEADER,
  CALENDAR_MODAL_TITLE,
  CALENDAR_MODAL_CLOSE,
  CALENDAR_MODAL_CONTENT,
  CALENDAR_MODAL_TASK,
  CALENDAR_MODAL_TASK_DONE,
  CALENDAR_MODAL_TASK_TITLE,
  CALENDAR_MODAL_TASK_META,
  CALENDAR_MODAL_TASK_ACTIONS,
  CALENDAR_MODAL_TASK_ACTION,
  CALENDAR_MODAL_EMPTY,
  CALENDAR_MODAL_ADD_BUTTON,
  CALENDAR_MODAL_TASK_CONTENT,
  CALENDAR_MODAL_EMPTY_TEXT,
  CALENDAR_MODAL_LOCKED_ICON,
  CALENDAR_LEGEND_CONTAINER,
  CALENDAR_LEGEND_ITEM
} from '../../constants/styles';


// Noms des jours et mois en français
const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];


// Helper : obtenir les jours du mois avec padding
const getCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // Jour de la semaine du 1er (0 = Dimanche, on veut Lundi = 0)
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;
  
  const days = [];
  
  // Jours du mois précédent
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false
    });
  }
  
  // Jours du mois actuel
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  // Jours du mois suivant pour compléter la grille
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  return days;
};


// Helper : comparer deux dates (sans l'heure)
const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};


// Helper : formater une date
const formatDateFr = (date) => {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};


function TaskModal({ 
  date, 
  tasks, 
  onClose, 
  onEdit, 
  onDelete, 
  onMarkDone,
  onCreateTask
}) {
  if (!date) return null;


  return (
    <div className={CALENDAR_MODAL_OVERLAY} onClick={onClose}>
      <div className={CALENDAR_MODAL} onClick={(e) => e.stopPropagation()}>
        <div className={CALENDAR_MODAL_HEADER}>
          <h3 className={CALENDAR_MODAL_TITLE}>
            <FiCalendar className="inline mr-2" />
            {formatDateFr(date)}
          </h3>
          <button onClick={onClose} className={CALENDAR_MODAL_CLOSE}>
            <FiX size={20} />
          </button>
        </div>
        
        <div className={CALENDAR_MODAL_CONTENT}>
          {tasks.length === 0 ? (
            <div className={CALENDAR_MODAL_EMPTY}>
              <p className={CALENDAR_MODAL_EMPTY_TEXT}>Aucune tâche prévue ce jour</p>
              <button
                onClick={() => {
                  onCreateTask(date);
                  onClose();
                }}
                className={CALENDAR_MODAL_ADD_BUTTON}
              >
                <FiPlus size={18} />
                Créer une tâche pour ce jour
              </button>
            </div>
          ) : (
            <>
              {tasks.map((task) => {
                const dateInfo = formatDate(task.dueDate);
                const isDone = task.status === 'DONE';
                
                return (
                  <div 
                    key={task.id} 
                    className={`${CALENDAR_MODAL_TASK} ${isDone ? CALENDAR_MODAL_TASK_DONE : ''}`}
                  >
                    <div className={CALENDAR_MODAL_TASK_CONTENT}>
                      <h4 className={CALENDAR_MODAL_TASK_TITLE}>
                        {task.priority === 'HIGH' && '🔴 '}
                        {task.priority === 'MEDIUM' && '🟡 '}
                        {task.priority === 'LOW' && '🟢 '}
                        {task.title}
                      </h4>
                      <div className={CALENDAR_MODAL_TASK_META}>
                        <span className={dateInfo.color}>
                          {dateInfo.emoji} {dateInfo.text}
                          {isDone && ' • ✅ Terminé'}
                        </span>
                        {task.estimatedDuration && (
                          <span className={CALENDAR_LEGEND_ITEM}>
                            <FiClock size={12} />
                            {formatDuration(task.estimatedDuration)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!task.locked && (
                      <div className={CALENDAR_MODAL_TASK_ACTIONS}>
                        {!isDone && (
                          <button
                            onClick={() => onMarkDone(task.id)}
                            className={`${CALENDAR_MODAL_TASK_ACTION} hover:text-emerald-500`}
                            title="Marquer fait"
                          >
                            <FiCheck size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            onEdit(task.id);
                            onClose();
                          }}
                          className={CALENDAR_MODAL_TASK_ACTION}
                          title="Modifier"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(task.id)}
                          className={`${CALENDAR_MODAL_TASK_ACTION} hover:text-red-500`}
                          title="Supprimer"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    )}
                    
                    {task.locked && (
                      <FaLock className={CALENDAR_MODAL_LOCKED_ICON} size={14} />
                    )}
                  </div>
                );
              })}
              
              <button
                onClick={() => {
                  onCreateTask(date);
                  onClose();
                }}
                className={CALENDAR_MODAL_ADD_BUTTON}
              >
                <FiPlus size={18} />
                Ajouter une tâche
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function CalendarDay({ 
  day, 
  tasks, 
  isToday, 
  isSelected,
  onSelect,
  onDropTask,
  draggedTaskId
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const dayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    return isSameDay(new Date(task.dueDate), day.date);
  });


  const handleDragOver = (e) => {
    e.preventDefault();
    if (draggedTaskId) {
      setIsDragOver(true);
    }
  };


  const handleDragLeave = () => {
    setIsDragOver(false);
  };


  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (draggedTaskId) {
      onDropTask(draggedTaskId, day.date);
    }
  };


  const dayClasses = [
    CALENDAR_DAY,
    !day.isCurrentMonth && CALENDAR_DAY_OTHER_MONTH,
    isToday && CALENDAR_DAY_TODAY,
    isSelected && CALENDAR_DAY_SELECTED,
    dayTasks.length > 0 && CALENDAR_DAY_HAS_TASKS,
    isDragOver && 'ring-2 ring-cyan-400 dark:ring-amber-500 bg-cyan-50 dark:bg-amber-900/20'
  ].filter(Boolean).join(' ');


  return (
    <div
      className={dayClasses}
      onClick={() => onSelect(day.date, dayTasks)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <span className={CALENDAR_DAY_NUMBER}>
        {day.date.getDate()}
      </span>
      
      {dayTasks.length > 0 && (
        <div className={CALENDAR_DAY_TASKS}>
          {dayTasks.slice(0, 3).map((task) => (
            <span
              key={task.id}
              className={`${CALENDAR_TASK_DOT} ${
                task.priority === 'HIGH' ? CALENDAR_TASK_DOT_HIGH :
                task.priority === 'MEDIUM' ? CALENDAR_TASK_DOT_MEDIUM :
                CALENDAR_TASK_DOT_LOW
              } ${task.status === 'DONE' ? 'opacity-40' : ''}`}
              title={task.title}
            />
          ))}
          {dayTasks.length > 3 && (
            <span className="text-xs text-slate-500 dark:text-amber-300/70">
              +{dayTasks.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}


function CalendarView({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onStartEditing,
  onCreateTask
}) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [draggedTaskId, setDraggedTaskId] = useState(null);


  const calendarDays = useMemo(() => {
    return getCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);


  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };


  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };


  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };


  const handleDaySelect = (date, dayTasks) => {
    setSelectedDate(date);
    const freshTasks = tasks.filter(task => {
      if (!task.dueDate) return false;
      return isSameDay(new Date(task.dueDate), date);
    });
    setSelectedTasks(freshTasks);
  };


  const closeModal = () => {
    setSelectedDate(null);
    setSelectedTasks([]);
  };


  const handleMarkDone = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.locked) return;


    const updatedTask = {
      ...task,
      status: 'DONE'
    };


    await onTaskUpdate(taskId, updatedTask);
    
    const freshTasks = tasks.filter(t => {
      if (!t.dueDate) return false;
      return isSameDay(new Date(t.dueDate), selectedDate);
    }).map(t => t.id === taskId ? { ...t, status: 'DONE' } : t);
    
    setSelectedTasks(freshTasks);
  };


  const handleDropTask = async (taskId, newDate) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.locked) return;


    const updatedDueDate = new Date(newDate);
    updatedDueDate.setHours(12, 0, 0, 0);


    const updatedTask = {
      ...task,
      dueDate: updatedDueDate.toISOString(),
      notified: false
    };


    await onTaskUpdate(taskId, updatedTask);
    setDraggedTaskId(null);
  };


  const handleCreateTask = (date) => {
    if (onCreateTask) {
      const taskDate = new Date(date);
      taskDate.setHours(12, 0, 0, 0);
      onCreateTask(taskDate);
    }
  };


  return (
    <div className={CALENDAR_CONTAINER}>
      <div className={CALENDAR_HEADER}>
        <button onClick={goToPrevMonth} className={CALENDAR_NAV_BUTTON}>
          <FiChevronLeft size={20} />
        </button>
        
        <h2 className={CALENDAR_TITLE}>
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button onClick={goToNextMonth} className={CALENDAR_NAV_BUTTON}>
          <FiChevronRight size={20} />
        </button>
        
        <button onClick={goToToday} className={CALENDAR_TODAY_BUTTON}>
          Aujourd'hui
        </button>
      </div>


      <div className={CALENDAR_WEEKDAYS}>
        {WEEKDAYS.map((day) => (
          <div key={day} className={CALENDAR_WEEKDAY}>
            {day}
          </div>
        ))}
      </div>


      <div className={CALENDAR_GRID}>
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            day={day}
            tasks={tasks}
            isToday={isSameDay(day.date, today)}
            isSelected={isSameDay(day.date, selectedDate)}
            onSelect={handleDaySelect}
            onDropTask={handleDropTask}
            draggedTaskId={draggedTaskId}
          />
        ))}
      </div>


      <div className={CALENDAR_LEGEND_CONTAINER}>
        <span className={CALENDAR_LEGEND_ITEM}>
          <span className={`${CALENDAR_TASK_DOT} ${CALENDAR_TASK_DOT_HIGH}`} /> Haute
        </span>
        <span className={CALENDAR_LEGEND_ITEM}>
          <span className={`${CALENDAR_TASK_DOT} ${CALENDAR_TASK_DOT_MEDIUM}`} /> Moyenne
        </span>
        <span className={CALENDAR_LEGEND_ITEM}>
          <span className={`${CALENDAR_TASK_DOT} ${CALENDAR_TASK_DOT_LOW}`} /> Basse
        </span>
      </div>


      {selectedDate && (
        <TaskModal
          date={selectedDate}
          tasks={selectedTasks}
          onClose={closeModal}
          onEdit={onStartEditing}
          onDelete={onTaskDelete}
          onMarkDone={handleMarkDone}
          onCreateTask={handleCreateTask}
        />
      )}
    </div>
  );
}


export default CalendarView;
