import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'sonner';

export const useExport = () => {
  
  // Export CSV
  const exportToCSV = (tasks, filename = 'taches') => {
    // Vérifier si la liste est vide
    if (!tasks || tasks.length === 0) {
      toast.warning('📋 Aucune tâche à exporter', {
        description: 'Créez d\'abord des tâches pour pouvoir les exporter en CSV',
        duration: 5000,
        icon: '⚠️',
      });
      return;
    }

    // En-têtes CSV
    const headers = ['Titre', 'Description', 'Statut', 'Priorité', 'Échéance', 'Durée (min)', 'Créée le'];
    
    // Convertir les tâches en lignes CSV
    const rows = tasks.map(task => [
      task.title || '',
      task.description || '',
      getStatusLabel(task.status),
      getPriorityLabel(task.priority),
      task.dueDate ? new Date(task.dueDate).toLocaleString('fr-FR') : 'Aucune',
      task.estimatedDuration || 'N/A',
      task.createdAt ? new Date(task.createdAt).toLocaleString('fr-FR') : '',
    ]);

    // Créer le contenu CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Télécharger le fichier
    downloadFile(csvContent, `${filename}_${getDateString()}.csv`, 'text/csv;charset=utf-8;');
    
    // Confirmation de succès
    toast.success('✅ Export CSV réussi', {
      description: `${tasks.length} tâche${tasks.length > 1 ? 's' : ''} exportée${tasks.length > 1 ? 's' : ''}`,
      duration: 3000,
    });
  };

  // Export PDF
  const exportToPDF = (tasks, stats, username, filename = 'rapport_taches') => {
    // Vérifier si la liste est vide
    if (!tasks || tasks.length === 0) {
      toast.warning('📄 Aucune tâche à exporter', {
        description: 'Créez d\'abord des tâches pour pouvoir générer un rapport PDF',
        duration: 5000,
        icon: '⚠️',
      });
      return;
    }

    const doc = new jsPDF();
    
    // Configuration
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    let yPosition = 20;

    // En-tête du document
    doc.setFontSize(22);
    doc.setTextColor(20, 184, 166); // Couleur teal
    doc.text('AppNotiDo - Rapport de Tâches', margin, yPosition);
    
    yPosition += 10;
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Généré le ${new Date().toLocaleString('fr-FR')}`, margin, yPosition);
    doc.text(`Utilisateur: ${username}`, pageWidth - margin - 60, yPosition);
    
    // Ligne de séparation
    yPosition += 8;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    
    // Statistiques
    yPosition += 12;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Statistiques', margin, yPosition);
    
    yPosition += 8;
    doc.setFontSize(10);
    
    const statBoxWidth = (pageWidth - 2 * margin - 15) / 4;
    const statBoxHeight = 20;
    
    // Boîtes de stats
    const statsData = [
      { label: 'Total', value: stats.total, color: [148, 163, 184] },
      { label: 'À faire', value: stats.todo, color: [6, 182, 212] },
      { label: 'En cours', value: stats.inProgress, color: [251, 146, 60] },
      { label: 'Terminées', value: stats.done, color: [20, 184, 166] },
    ];

    statsData.forEach((stat, index) => {
      const x = margin + index * (statBoxWidth + 5);
      
      // Rectangle coloré
      doc.setFillColor(...stat.color);
      doc.roundedRect(x, yPosition, statBoxWidth, statBoxHeight, 3, 3, 'F');
      
      // Texte
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(stat.label, x + statBoxWidth / 2, yPosition + 6, { align: 'center' });
      doc.setFontSize(16);
      doc.text(String(stat.value), x + statBoxWidth / 2, yPosition + 15, { align: 'center' });
    });

    // Liste des tâches
    yPosition += statBoxHeight + 15;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Liste des Tâches', margin, yPosition);
    
    yPosition += 5;

    // Tableau des tâches
    const tableData = tasks.map(task => [
      task.title || '',
      getStatusLabel(task.status),
      getPriorityLabel(task.priority),
      task.dueDate ? new Date(task.dueDate).toLocaleDateString('fr-FR') : '-',
      task.estimatedDuration ? `${task.estimatedDuration} min` : '-',
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Titre', 'Statut', 'Priorité', 'Échéance', 'Durée']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [20, 184, 166],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [50, 50, 50],
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { left: margin, right: margin },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 35 },
        4: { cellWidth: 25 },
      },
    });

    // Pied de page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} sur ${pageCount}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Télécharger le PDF
    doc.save(`${filename}_${getDateString()}.pdf`);
    
    // Confirmation de succès
    toast.success('✅ Export PDF réussi', {
      description: `Rapport généré avec ${tasks.length} tâche${tasks.length > 1 ? 's' : ''}`,
      duration: 3000,
    });
  };

  // Fonctions utilitaires
  const getStatusLabel = (status) => {
    const labels = {
      TODO: 'À faire',
      IN_PROGRESS: 'En cours',
      DONE: 'Terminé',
    };
    return labels[status] || status;
  };

  const getPriorityLabel = (priority) => {
    const labels = {
      LOW: 'Basse',
      MEDIUM: 'Moyenne',
      HIGH: 'Haute',
    };
    return labels[priority] || priority;
  };

  const getDateString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return {
    exportToCSV,
    exportToPDF,
  };
};