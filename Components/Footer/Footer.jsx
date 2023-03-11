import Link from 'next/link'
import OpeningHours from '../OpeningHours/OpeningHours'
import Contact from '@/Components/Contact/Contact'
import PersonalAccount from '../PersonalAccount/PersonalAccount'
import styles from './Footer.module.css'

const Footer = ({ opening_hours }) => {
  
  return (
    <div className={styles.footerContainer}>
      <OpeningHours opening_hours={opening_hours}/>
      <Contact />
      <div className={styles.mentionsLegal}>
        <Link href='/mention-légales'> 
        <p>Mentions Légales</p></Link>
        <PersonalAccount />
      </div>
    </div>
  )
}

export default Footer