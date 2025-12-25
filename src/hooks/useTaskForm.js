// hooks/useTaskForm.js
import { useState } from 'react';

export function useTaskForm() {
  const initialValues = {
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'TODO',
    dueDate: '',
    estimatedDuration: '',
    reminderMinutes: 15,
    reactivable: false,
    timerEnabled: false,
    tags: ''
  };

  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const reset = () => {
    setValues(initialValues);
  };

  const prepareTaskData = () => {
    // Nettoyer les tags : "  taff , urgent  " → "taff,urgent"
    const tagsString = values.tags
      ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).join(',')
      : null;

    return {
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
      estimatedDuration: values.estimatedDuration ? parseInt(values.estimatedDuration) : null,
      reminderMinutes: parseInt(values.reminderMinutes),
      reactivable: values.reactivable,
      timerEnabled: values.timerEnabled,
      tags: tagsString
    };
  };

  return {
    values,
    handleChange,
    reset,
    isSubmitting,
    setIsSubmitting,
    prepareTaskData
  };
}