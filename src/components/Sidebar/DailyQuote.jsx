import { useState } from 'react';
import { FiX, FiEyeOff, FiRefreshCw } from 'react-icons/fi';

const quotes = [
  { text: "Le succès c'est d'aller d'échec en échec sans perdre son enthousiasme.", author: "Winston Churchill" },
  { text: "La seule façon de faire du bon travail est d'aimer ce que vous faites.", author: "Steve Jobs" },
  { text: "L'action est la clé fondamentale de tout succès.", author: "Pablo Picasso" },
  { text: "Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant.", author: "Proverbe chinois" },
  { text: "Ne comptez pas les jours, faites que les jours comptent.", author: "Muhammad Ali" },
  { text: "La vie est 10% ce qui vous arrive et 90% comment vous y réagissez.", author: "Charles Swindoll" },
  { text: "Votre temps est limité, ne le gaspillez pas en vivant la vie de quelqu'un d'autre.", author: "Steve Jobs" },
  { text: "Ce n'est pas la montagne que nous conquérons, mais nous-mêmes.", author: "Edmund Hillary" },
  { text: "Le courage n'est pas l'absence de peur, mais la capacité de la vaincre.", author: "Nelson Mandela" },
  { text: "Un voyage de mille lieues commence toujours par un premier pas.", author: "Lao Tseu" },
  { text: "Le talent gagne des matchs, mais le travail d'équipe gagne des championnats.", author: "Michael Jordan" },
  { text: "Celui qui déplace une montagne commence par déplacer de petites pierres.", author: "Confucius" },
  { text: "La persévérance est la clé de toute réussite.", author: "Proverbe" },
  { text: "N'attendez pas le moment parfait. Prenez le moment et rendez-le parfait.", author: "Anonyme" },
  { text: "Les obstacles sont ces choses effrayantes que vous voyez lorsque vous quittez votre objectif des yeux.", author: "Henry Ford" },
];

function DailyQuote({ isPinned, onTogglePin, onHide }) {
  const [currentQuote, setCurrentQuote] = useState(() => {
    const savedQuote = localStorage.getItem('dailyQuote');
    const savedDate = localStorage.getItem('dailyQuoteDate');
    const today = new Date().toDateString();

    if (savedDate === today && savedQuote) {
      return JSON.parse(savedQuote);
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    localStorage.setItem('dailyQuote', JSON.stringify(randomQuote));
    localStorage.setItem('dailyQuoteDate', today);
    return randomQuote;
  });

  const handleRefresh = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(newQuote);
    localStorage.setItem('dailyQuote', JSON.stringify(newQuote));
  };

  return (
    <div className="relative mt-6 rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 shadow-lg dark:border-amber-700/70 dark:bg-gradient-to-br dark:from-amber-900/40 dark:via-orange-900/40 dark:to-rose-900/40">
      {/* Actions */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
          💡 Citation du jour
        </span>
        <div className="flex gap-1">
          <button
            onClick={handleRefresh}
            className="rounded-lg p-1.5 text-amber-600 transition hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40"
            title="Nouvelle citation"
          >
            <FiRefreshCw size={14} />
          </button>
          <button
            onClick={onTogglePin}
            className={`rounded-lg p-1.5 transition ${
              isPinned
                ? 'bg-amber-200 text-amber-700 dark:bg-amber-800/60 dark:text-amber-300'
                : 'text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40'
            }`}
            title={isPinned ? 'Dépingler' : 'Épingler'}
          >
            📌
          </button>
          <button
            onClick={onHide}
            className="rounded-lg p-1.5 text-amber-600 transition hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/40"
            title="Masquer"
          >
            <FiEyeOff size={14} />
          </button>
        </div>
      </div>

      {/* Citation */}
      <blockquote className="mb-2 text-sm font-medium italic leading-relaxed text-amber-900 dark:text-amber-100">
        "{currentQuote.text}"
      </blockquote>
      <p className="text-right text-xs font-bold text-amber-700 dark:text-amber-300">
        — {currentQuote.author}
      </p>
    </div>
  );
}

export default DailyQuote;