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
  { text: "Il n'y a qu'une façon d'échouer, c'est d'abandonner avant d'avoir réussi.", author: "Olivier Lockert" },
  { text: "Le génie, c'est 1% d'inspiration et 99% de transpiration.", author: "Thomas Edison" },
  { text: "Visez la lune. Même si vous la manquez, vous atterrirez parmi les étoiles.", author: "Oscar Wilde" },
  { text: "La patience est un arbre dont la racine est amère, mais dont les fruits sont très doux.", author: "Proverbe persan" },
  { text: "Soyez le changement que vous voulez voir dans le monde.", author: "Gandhi" },
  { text: "L'échec est le fondement de la réussite.", author: "Lao Tseu" },
  { text: "La différence entre l'ordinaire et l'extraordinaire, c'est ce petit 'extra'.", author: "Jimmy Johnson" },
  { text: "On ne fait jamais attention à ce qui a été fait ; on ne voit que ce qui reste à faire.", author: "Marie Curie" },
  { text: "La vie est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", author: "Albert Einstein" },
  { text: "Ce que l'on fait aujourd'hui peut améliorer tous nos lendemains.", author: "Ralph Marston" },
  { text: "Le pessimiste voit la difficulté dans chaque opportunité. L'optimiste voit l'opportunité dans chaque difficulté.", author: "Winston Churchill" },
  { text: "La force ne vient pas de la capacité physique mais d'une volonté indomptable.", author: "Gandhi" },
  { text: "Tout semble impossible jusqu'à ce que ce soit fait.", author: "Nelson Mandela" },
  { text: "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte.", author: "Winston Churchill" },
  { text: "Croyez en vos rêves et ils se réaliseront peut-être. Croyez en vous et ils se réaliseront sûrement.", author: "Martin Luther King Jr." },
  { text: "La seule limite à notre épanouissement de demain sera nos doutes d'aujourd'hui.", author: "Franklin D. Roosevelt" },
  { text: "Là où il y a une volonté, il y a un chemin.", author: "Proverbe" },
  { text: "Le meilleur moyen de prédire l'avenir est de le créer.", author: "Peter Drucker" },
  { text: "Chaque accomplissement commence par la décision d'essayer.", author: "John F. Kennedy" },
  { text: "Le succès est la somme de petits efforts répétés jour après jour.", author: "Robert Collier" },
  { text: "Ne laissez jamais personne vous dire que vous ne pouvez pas faire quelque chose.", author: "Chris Gardner" },
  { text: "L'imagination est plus importante que le savoir.", author: "Albert Einstein" },
  { text: "Ce n'est pas parce que les choses sont difficiles que nous n'osons pas, c'est parce que nous n'osons pas qu'elles sont difficiles.", author: "Sénèque" },
  { text: "La plus grande gloire n'est pas de ne jamais tomber, mais de se relever à chaque chute.", author: "Confucius" },
  { text: "Tout ce que vous avez toujours voulu est de l'autre côté de la peur.", author: "George Addair" },
  { text: "L'avenir appartient à ceux qui croient en la beauté de leurs rêves.", author: "Eleanor Roosevelt" },
  { text: "Soyez vous-même, tous les autres sont déjà pris.", author: "Oscar Wilde" },
  { text: "La perfection n'est pas atteignable, mais si nous poursuivons la perfection, nous pouvons atteindre l'excellence.", author: "Vince Lombardi" },
  { text: "Il vaut mieux être détesté pour ce que l'on est qu'aimé pour ce que l'on n'est pas.", author: "André Gide" },
  { text: "Un pessimiste fait de ses occasions des difficultés, et un optimiste fait de ses difficultés des occasions.", author: "Harry Truman" },
  { text: "Les grands esprits ont des buts, les autres ont des souhaits.", author: "Washington Irving" },
  { text: "Ce qui ne nous tue pas nous rend plus forts.", author: "Friedrich Nietzsche" },
  { text: "La motivation vous sert de départ. L'habitude vous fait continuer.", author: "Jim Ryun" },
  { text: "Fais de ta vie un rêve, et d'un rêve, une réalité.", author: "Antoine de Saint-Exupéry" },
  { text: "L'expérience est le nom que chacun donne à ses erreurs.", author: "Oscar Wilde" },
  { text: "Nous sommes ce que nous répétons chaque jour. L'excellence n'est alors plus un acte mais une habitude.", author: "Aristote" },
  { text: "Le bonheur n'est pas une destination à atteindre, mais une manière de voyager.", author: "Margaret Lee Runbeck" },
  { text: "Osez commencer et vous aurez déjà réussi.", author: "Proverbe" },
  { text: "La discipline est le pont entre les objectifs et l'accomplissement.", author: "Jim Rohn" },
  { text: "Il n'y a pas de réussite facile ni d'échecs définitifs.", author: "Marcel Proust" },
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
