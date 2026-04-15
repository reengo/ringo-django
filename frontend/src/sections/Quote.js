import background from '../assets/img/busuanga.jpeg';
import { useState } from 'react';

function Quote({next}) {
    const quotes = [
        { quote: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucious' },
        { quote: 'One machine can do the work of fifty ordinary men.  No machine can do the work of one extraordinary man.', author: 'Elbert Hubbard' },
        { quote: 'He who learns but does not think, is lost! He who thinks but does not learn is in great danger.', author: 'Confucious' },
        { quote: 'Technology is a word that describes something that doesn’t work yet.', author: 'Douglas Adams' },
        { quote: 'The real danger is not that computers will begin to think like men, but that men will begin to think like computers.', author: 'Sydney Harris' },
        { quote: 'It’s fine to celebrate success but it is more important to heed the lessons of failure.', author: 'Bill Gates' },
        { quote: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
        { quote: 'Innovation is the outcome of a habit, not a random act.', author: 'Sukant Ratnakar' },
        { quote: 'The human spirit must prevail over technology.', author: 'Albert Einstein ' },
        { quote: 'Every once in a while, a new technology, an old problem, and a big idea turn into an innovation.', author: 'Dean Kamen' },
        { quote: 'Any sufficiently advanced technology is indistinguishable from magic.', author: 'Arthur C. Clarke' },
        { quote: 'The most important thing is to make the technology inclusive – make the world change.', author: 'Jack Ma' },
        { quote: 'You affect the world by what you browse.', author: 'Tim Berners-Lee' },
        { quote: 'Technology expands our way of thinking about things, and expands our way of doing things.', author: 'Herbert Simon' },
        { quote: 'The human condition today is better than it’s ever been, and technology is one of the reasons for that.', author: 'Tom Clancy' },
        { quote: 'He who learns but does not think, is lost! He who thinks but does not learn is in great danger.', author: 'Confucious' }
    ];

    const changeQuote = (key) => {
        const i = Math.floor(Math.random() * quotes.length)
        return quotes[i]
    }

    const [activeQuote, setActiveQuote] = useState(changeQuote());

    const handleChange = (e) => {
        e.preventDefault();
        let newQuote = changeQuote();
        let i = 0;

        while(i < quotes.length){
            if(activeQuote != quotes[i]){
                return setActiveQuote(newQuote)
            }
            i++
        }
    }

    

    return (
        <div>
            {/* Dark scrim over parallax image for text legibility */}
            <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
            <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:px-8">
                <article className="py-16 sm:py-40">
                    <blockquote className="text-white drop-shadow-lg">
                        {activeQuote.quote}
                        <span className="block mt-3 font-sans text-base font-thin text-slate-300">— {activeQuote.author}</span>
                    </blockquote>

                    <button
                        onClick={handleChange}
                        className="mt-8 border border-white/60 bg-white/10 backdrop-blur-sm text-white px-5 py-2 rounded-lg text-sm hover:bg-white/20 transition">
                        Another quote
                    </button>
                </article>
            </div>
        </div>
    );
  }

  export default Quote