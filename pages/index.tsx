import Head from 'next/head'
import HomePage from '@/Components/HomePage/HomePage'


export default function Home({ opening_hours, images, formulas, categories }: any) {
  return (
    <>
      <Head>
        <title>Quai Antique Restaurant</title>
        <meta name="description" content="Venez découvir les bons plats de notre restaurant Quai-Antique concocter avec amour et passion par notre chef Arnaud Michant" />
        <meta name=" robots " content="index" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://quai-antique-front.vercel.app/" />
        <meta name="Identifier-Url" content="https://quai-antique-front.vercel.app/" />
        <meta name="Revisit-After" content="15 days" />
        <meta name="Robots" content="index" />
        <meta name="Rating" content="general" />
        <meta name="Distribution" content="global" />
        <meta name="Geography" content="Paris, france, 75" />
        <meta name="Category" content="shopping" />
        <HomePage opening_hours={opening_hours} images={images} formulas={formulas} categories={categories} />
      </Head>
    </>
  )
}

export async function getStaticProps() {

  const res = await fetch('https://quai-antique.xyz/api/opening_hours')
  const opening_hours = await res.json()

  const res2 = await fetch('https://quai-antique.xyz/api/images')
  const images = await res2.json()

  const res3 = await fetch('https://quai-antique.xyz/api/formulas')
  const formulas = await res3.json()

  const res4 = await fetch('https://quai-antique.xyz/api/categories')
  const categories = await res4.json()


  return {
    props: {
      opening_hours,
      images,
      formulas,
      categories
    },
  }
}