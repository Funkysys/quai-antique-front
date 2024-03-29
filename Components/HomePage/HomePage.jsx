import React, { useEffect, useRef, useState } from 'react'
import styles from './HomePage.module.css'
import NavigationBar from '../Navbar/Navbar'
import MenuContainer from '../MenuContainer/MenuContainer'
import GalleryImages from '../GalleryImages/GalleryImages'
import Reservation from '../Reservation/Reservation'
import Footer from '../Footer/Footer'
import gsap from 'gsap'
import Link from 'next/link'
import { Button } from 'react-bootstrap'
import Image from 'next/image'

const HomePage = ({ opening_hours, images, formulas, categories }) => {
    const homeRef = useRef()
    const titleRef = useRef()

    useEffect(() => {
        homeRef &&
            gsap.to(
                homeRef.current, { opacity: '1', duration: '2' }
            )

        titleRef &&
            gsap.to(
                titleRef.current, { opacity: '1', top: '50%', duration: '3' }
            )

    }, [homeRef, titleRef])

    return (
        <>
            <header>
                <nav>
                    <NavigationBar />
                </nav>
            </header>
            <main className={styles.main} id='home'>
                <div className={styles.homePage} id='test' ref={homeRef}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title} ref={titleRef}>Bienvenue chez <br /><span className={styles.titleSpan}>Quai-Antique</span></h1>
                        <Link href='/#reservation'><Button variant='success' className="fs-3">Réserver</Button></Link>
                    </div>
                </div>
                <section id="about">
                    <div className={styles.welcome}>
                        <p>{`Tout en s'inspirant de la cuisine traditionnelle de la savoie, le chef Arnaud Michant vous invite à redécouvrir cette belle région au travers d'un voyage culinaire emprunt d'un modernisme qui le caractérise si bien.`}</p>
                    </div>
                    <div className={styles.about}>
                            <div className={styles.photoAbout}>
                                <Image
                                    src={"/Images/pexels-denys-gromov-4669303.jpg"}
                                    alt="photo du menu"
                                    fill
                                    className={styles.customImg}
                                    sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
                                />
                            </div>
                            <div className={styles.description}>
                                <p>
                                    {`Depuis 1990, le Quai Antique à toujours été en recherche de l'équilibre parfait entre modernisme et tradition. C'est ainsi que notre équipe vous acceuillera avec le plaisir de vous faire découvrir notre belle région à travers des plats emblématiques revisités par le chef Arnaud Michant.`}
                                </p>
                                <p>
                                    {`Au plaisir de voir à table !`}
                                </p>
                            </div>
                        </div>
                        <div id='Menu'>
                            <MenuContainer categories={categories} formulas={formulas} />
                        </div>
                </section>
                <section id="gallery">
                    <GalleryImages images={images} />
                </section>
                <section id="reservation">
                    <Reservation opening_hours={opening_hours} />
                </section>
            </main>
            <footer id="contact">
                <Footer opening_hours={opening_hours} />
            </footer>
        </>
    )
}

export default HomePage