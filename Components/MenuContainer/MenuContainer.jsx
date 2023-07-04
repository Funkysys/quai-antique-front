import React, { useEffect, useState } from 'react';
import styles from './MenuContainer.module.css';
import Menu from '../Menu/Menu';
import Image from 'next/image';
import useScreenSize from '@/hooks/useScreenSize';

const MenuContainer = ({ formulas, categories }) => {
    const width = useScreenSize().width;

    return (
        width > 767 ?
            <div className={styles.menu} >
                <div className={styles.dishes}><Menu categories={categories} formulas={formulas} /></div>
                <div className={styles.photoMenu}>
                    <Image
                        src={"/Images/pexels-rajesh-tp-1600727.jpg"}
                        alt="photo du menu"
                        fill
                        className={styles.customImg}
                        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
                    />
                </div>
            </div>
            :
            <div className={styles.menu}>
                <div className={styles.photoMenu}>
                    <Image
                        src={"/Images/pexels-rajesh-tp-1600727.jpg"}
                        alt="photo du menu"
                        fill
                        className={styles.customImg}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className={styles.dishes}><Menu categories={categories} formulas={formulas} /></div>
            </div>
    )
};

export default MenuContainer;