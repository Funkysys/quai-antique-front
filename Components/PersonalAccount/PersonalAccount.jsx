import { useContext } from 'react'
import Button from 'react-bootstrap'
import styles from './PersonalAccount.module.css'
import { Context } from '@/lib/context';
const PersonalAccount = () => {
    const {state, dispatch} = useContext(Context)
    console.log(state);

    return (
        <div
          className={styles.container}
        >
          <h2>Bienvenu !</h2>

          
        </div>
    )
}

export default PersonalAccount