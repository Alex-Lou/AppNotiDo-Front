// src/components/Dashboard/StatsCards.jsx
import StatCard from '../ui/StatCard';

const cardsConfig = [
  {
    type: 'ALL',
    label: 'Total',
    statKey: 'total',
    subtitle: 'Tâches enregistrées'
  },
  {
    type: 'TODO',
    label: 'À faire',
    statKey: 'todo',
    subtitle: 'En attente'
  },
  {
    type: 'IN_PROGRESS',
    label: 'En cours',
    statKey: 'inProgress',
    subtitle: 'En traitement'
  },
  {
    type: 'DONE',
    label: 'Terminées',
    statKey: 'done',
    subtitle: 'Complétées'
  }
];

function StatsCards({ stats, onFilterClick, activeFilter }) {
  return (
    <div className="mb-10 grid grid-cols-4 gap-5">
      {cardsConfig.map(card => (
        <StatCard
          key={card.type}
          type={card.type}
          label={card.label}
          value={stats[card.statKey]}
          subtitle={card.subtitle}
          onClick={() => onFilterClick(card.type)}
          isActive={activeFilter === card.type}
        />
      ))}
    </div>
  );
}

export default StatsCards;
