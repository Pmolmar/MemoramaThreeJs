import React from 'react';
import './App.css';

function Interface(props: { clicked: String }) {
    return (
        <span>{props.clicked}</span>
    )
}

export default Interface;