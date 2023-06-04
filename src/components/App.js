import './App.css';
import Letter from './Letter';
import React from 'react';
function App() {
    const [word, setWord] = React.useState('ТЕСТОВЫЙ');
    const [isPlaying, setPlay] = React.useState(true);
    const [popupText, setPpopupText] = React.useState('');
    const [lettersWord, setLettersWord] = React.useState({});

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

    function onSubmit() {
        setPlay(true);
        setWord('')
        setTimeout(() => {
            setWord('ТЕСТОВЫЙ');
        }, 0);
    }
    const handleKey = React.useCallback(
        (e) => {
            const key = e.key.toUpperCase();
            if (word.indexOf(key) > -1 && lettersWord[key] > 0) {
                setLettersWord((prev) => ({ ...prev, [key]: 0 }));
            }
        },
        [lettersWord, word]
    );

    React.useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
        };
    }, [handleKey]);
    return (
        <div className='App'>
            <header className='header'>
                <h1 className='header__title'>Game Word</h1>
            </header>
            <main className='content'>
                <section className='desk'>
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
