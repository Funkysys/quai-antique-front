import { useState, useContext, useEffect } from 'react'
import { Context } from '@/lib/context';
import Link from 'next/link'
import OpeningHours from '../OpeningHours/OpeningHours'
import Contact from '@/Components/Contact/Contact'
import PersonalAccount from '../PersonalAccount/PersonalAccount'
import styles from './Footer.module.css'
import { Button } from 'react-bootstrap'

const Footer = ({ opening_hours }) => {
  const { state } = useContext(Context)
  const [toggle, setToggle] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (state?.user.name) {
        setUser(state.user)
      } else if (state === null) {
        setUser(null)
      }
    }
  }, [state])

  return (
    <div className={styles.footerContainer}>
      <OpeningHours opening_hours={opening_hours} />
      <Contact />
      <div className={styles.link}>
        {
          user &&
          <>
            {
              !toggle ?
                <Button className='mb-5 mt-3' onClick={() => setToggle(!toggle)} variant="outline-danger"> Mon Compte</Button>
                :
                <div className={styles.personalAccount}>
                  <Button onClick={() => setToggle(!toggle)} variant="danger" className={styles.closeButton}>X</Button>
                  <PersonalAccount />
                </div>
            }
          </>
        }
        <a href='https://quai-antique.xyz/panel' >
          <p>admin</p>
        </a>
        <a href='/mention-légales'>
          <p>Mentions Légales</p>
        </a>
      </div>
    </div>
  )
}

export default Footer