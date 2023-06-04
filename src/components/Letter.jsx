import React from 'react';
import './Letter.css';

function Letter({ letter, isVisible }) {
    return (
        <li className={`letter`}>
            <p className={`letter__title  ${isVisible && 'letter__title_active'}`}>{letter}</p>
            <div className='letter__border'></div>
        </li>
    );
}
export default Letter;
