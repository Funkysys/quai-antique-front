import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Navbar from '@/Components/Navbar/Navbar'
import Menu from '@/Components/Menu/Menu'
import Gallery from '@/Components/Gallery/Gallery'
import Reservation from '@/Components/Reservation/Reservation'
import Footer from '@/Components/Footer/Footer'

export default function Home({ opening_hours, allergies }: any) {

  return (
    <>
      <Head>
        <title>Quai Antique </title>
        <meta name="description" content="Venez découvir les bons plats de notre restaurant Quai-Antique" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className={styles.main} id='home'>
        <div className={styles.homePage}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Bienvenu chez <br /><span className={styles.titleSpan}>Quai-Antique</span></h1>
          </div>
        </div>
        <section id="about">
          <div className={styles.welcome}>
            <p>{`Tout en s'inspirant de la cuisine traditionnelle de la savoie, le chef Arnaud Michant vous invite à redécouvrir cette belle région au travers d'un voyage culinaires emprunt d'un modernisme qui le caractérise si bien.`}</p>
          </div>
          <div className={styles.about}>
            <div className={styles.photoAbout}></div>
            <div className={styles.description}></div>
          </div>
          <Menu />
        </section>
        <section id="gallery">
          <Gallery />
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

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://quai-antique.xyz/api/opening_hours')
  const opening_hours = await res.json()

  const res2 = await fetch('https://quai-antique.xyz/api/allergies')
  const allergies = await res2.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      opening_hours,
      allergies
    },
  }
}