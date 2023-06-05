import './App.css';
import Letter from './Letter';
import React from 'react';
import contextCapitals from '../contexts/Capitals.jsx';

function App() {
    const capitals = React.useContext(contextCapitals);
    const [word, setWord] = React.useState('');
    const [isPlaying, setPlay] = React.useState(true);
    const [popupText, setPpopupText] = React.useState('');
    const [lettersWord, setLettersWord] = React.useState({});
    const [question, setQuestion] = React.useState('');


    const onSubmit = React.useCallback(() => {
        const newCapital = capitals[randomIntFromInterval(1, 247)];
        setPlay(true);
        setWord('');
        setTimeout(() => {
            setQuestion(newCapital.country);
            setWord(newCapital.capital.split(' ').join('').toUpperCase());
        }, 0);
    },[]);

    const handleKey = React.useCallback(
        (e) => {
            const key = e.key.toUpperCase();
            if (e.key === 'Enter' && !isPlaying) {
                onSubmit();
            }
            if (word.indexOf(key) > -1 && lettersWord[key] > 0) {
                setLettersWord((prev) => ({ ...prev, [key]: 0 }));
            }
        },
        [lettersWord, word, isPlaying, onSubmit]
    );
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    React.useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    React.useEffect(() => {
        setLettersWord(
            word.split('').reduce((acc, curr) => {
                if (acc[curr]) {
                    ++acc[curr];
                } else {
                    acc[curr] = 1;
                }
                return acc;
            }, {})
        );
    }, [word]);

    React.useEffect(() => {
        if (Object.values(lettersWord).every((value) => value === 0)) {
            setPlay(false);
            setPpopupText('Вы угадали слово Так держать!');
        } else {
            setPlay(true);
        }
    }, [lettersWord]);

    React.useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [handleKey]);
    return (
        <div className='App'>
            <header className='header'>
                <h1 className='header__title'>Check your skill</h1>
            </header>
            <main className='content'>
                <section className='desk'>
                    <h2 className='desk__question'>{question}</h2>
                    <ul className='desk__container'>
                        {word.split('').map((letter, index) => (
                            <Letter key={index} isVisible={lettersWord[letter] === 0} letter={letter} />
                        ))}
                    </ul>
                </section>
                <section className={`popup ${!isPlaying && 'popup_opened'}`}>
                    <h2 className='popup__title'>{word}</h2>
                    <div className='popup__container'>
                        <p className='popup__subitile'>{popupText}</p>
                        <button onClick={onSubmit} className='popup__button'>
                            Сыграть еще
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
