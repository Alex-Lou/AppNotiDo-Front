// src/components/Sidebar/DailyQuote.jsx
import { useState } from 'react';
import { FiEyeOff, FiRefreshCw } from 'react-icons/fi';
import QuoteActionButton from '../ui/QuoteActionButton';
import { 
  QUOTE_CONTAINER, 
  QUOTE_HEADER, 
  QUOTE_LABEL, 
  QUOTE_ACTIONS,
  QUOTE_TEXT,
  QUOTE_AUTHOR
} from '../../constants/styles';

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
    <div className={QUOTE_CONTAINER}>
      {/* Actions */}
      <div className={QUOTE_HEADER}>
        <span className={QUOTE_LABEL}>
          💡 Citation du jour
        </span>
        <div className={QUOTE_ACTIONS}>
          <QuoteActionButton
            icon={FiRefreshCw}
            onClick={handleRefresh}
            title="Nouvelle citation"
          />
          <QuoteActionButton
            emoji="📌"
            onClick={onTogglePin}
            title={isPinned ? 'Dépingler' : 'Épingler'}
            isPinned={isPinned}
          />
          <QuoteActionButton
            icon={FiEyeOff}
            onClick={onHide}
            title="Masquer"
          />
        </div>
      </div>

      {/* Citation */}
      <blockquote className={QUOTE_TEXT}>
        "{currentQuote.text}"
      </blockquote>
      <p className={QUOTE_AUTHOR}>
        — {currentQuote.author}
      </p>
    </div>
  );
}

export default DailyQuote;
