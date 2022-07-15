import React from 'react';
import styles from '../styles/Home.module.css'

export const Box = ({children}:any) => (
    <div className={styles.box}>
        {children}
    </div>
)