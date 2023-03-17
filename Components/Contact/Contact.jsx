import Link from 'next/link'
import styles from './Contact.module.css'

const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <h2 className={styles.contactTitle}>Contact</h2>
            <div className={styles.contactDetails}>
                <div className={styles.email}>
                    <a href="mailto:quaiantique@admin.xyz"> <p >quaiantique@admin.xyz</p></a>
                </div>
                <div className={styles.phone}>
                    <a href="tel:+33606060606"><p>
                         06.06.06.06.06</p></a>
                </div>
                <p className={styles.address}>185 avenue du petit poney</p>
                <p className={styles.addressSuite}>73000 Chambéry</p>
            </div>
        </div>
    )
}

export default Contact