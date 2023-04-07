import React, { useState } from 'react'
import styles from './ContactModale.module.css'
import { useForm } from "react-hook-form";

const Footer = () => {
    const [toggle, setToggle] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [emailRequired, setEmailRequired] = useState(true)
    const [nameRequired, setNameRequired] = useState(true)

    const [isLoading, setIsLoading] = useState(false);
    const [isSended, setIsSended] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleOnClick = () => {
        setToggle(!toggle)
    }

    const onSubmitHandler = async (data) => {
        if (!isLoading) {
            setIsLoading(true);

            const endpoint = '/api/contact'
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
            const response = await fetch(endpoint, options)

            const result = await response.json();
            setIsLoading(false);

            if (!response.ok) {

            } else {
                reset();
                setIsSended(true);
            }
        }
    };

    return (
        toggle ?
            <div className={styles.contactContainer}>
                <button className={styles.closeButton} onClick={handleOnClick}>X</button>
                {!isSended ?
                    <>
                        < form className={styles.main} onSubmit={handleSubmit(onSubmitHandler)}>
                            < div className={styles.inputGroup} >
                                < label htmlFor='name' className={styles.inputLabel}>Nom</label>
                                {!nameRequired && <p className='text-danger fs-6'>Votre nom est obligatoire</p>}
                                < input
                                    type='text'
                                    name='name'
                                    className={styles.inputField}
                                    {...register("name", {
                                        required: true,
                                    })}
                                />
                            </div>
                            < div className={styles.inputGroup} >
                                < label htmlFor='email' className={styles.inputLabel}>Email</label>
                                {!emailRequired && <p className='text-danger fs-6'>Votre email est obligatoire</p>}
                                < input
                                    type='email'
                                    name='email'
                                    className={styles.inputField}
                                    {...register("email", {
                                        required: true,
                                    })}
                                />
                            </div>
                            < div className={styles.inputGroup} >
                                < label htmlFor='message' className={styles.inputLabel}>Message</label>
                                < textarea
                                    type='text'
                                    name='message'
                                    className={styles.textArea}
                                    {...register("message", {
                                        required: true,
                                    })}
                                />
                            </div>
                            {!isLoading && (
                                < button
                                    type='submit'
                                    // onClick={handleOnSubmit}
                                    className={styles.submitButton}
                                >
                                    Envoyer
                                </button>
                            )}
                        </form >
                    </>
                    :
                    <h3 className={styles.message}>Merci pour votre message, nous vous répondons au plus vite ! Sans réponse de notre part, contactez nous au  0630182644, Merci</h3>
                }
            </div>
            :
            <button className={styles.contactButton} onClick={handleOnClick}>Nous contacter</button>
    )
}

export default Footer