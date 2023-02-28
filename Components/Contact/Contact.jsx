import Link from 'next/link'
import styles from './Contact.module.css'

const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <h2 className={styles.contactTitle}>Contact</h2>
            <div className={styles.contactDetails}>
                <div className={styles.email}>
                    <Link href="quaiantique@admin.xyz"> <p >quaiantique@admin.xyz</p></Link>
                </div>
                <div className={styles.phone}>
                    <Link href="06.06.06.06.06"><p>
                         06.06.06.06.06</p></Link>
                </div>
                <p className={styles.address}>185 avenue du petit poney</p>
                <p className={styles.addressSuite}>73000 Chambéry</p>
            </div>
        </div>
    )
}

export default Contact