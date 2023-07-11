import React from "react";
import styles from './ComingSoon.module.css'

export default function ComingSoon({name}) {
    return (
        <div className={styles.comingContainer}>
            <h1>Em Breve...</h1>
            <h4>{name}</h4>
        </div>
    )
}