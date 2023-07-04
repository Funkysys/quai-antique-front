import styles from './Contact.module.css';
import ContactModale from './ContactModale';

const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <h2 className={styles.contactTitle}>Contact</h2>
            <div className={styles.contactDetails}>
                <ContactModale />
                <p className={styles.address}>185 avenue du petit poney</p>
                <p className={styles.addressSuite}>73000 Chambéry</p>
            </div>
        </div>
    )
};

export default Contact;