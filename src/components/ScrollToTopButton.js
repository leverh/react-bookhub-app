import React from 'react';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import styles from '../styles/ScrollUpButton.module.css';

const ScrollToTopButton = ({ className }) => {
    return (
        <div className={`${styles.scrollButtonContainer} ${className}`}>
            <ScrollUpButton />
        </div>
    );
}

export default ScrollToTopButton;
