import {useState} from 'react'
import {sendContactMessage} from '../../api/contact'
import './Contact.css'

const EMPTY_FORM = {name: '', email: '', message: '', website: ''}

function Contact() {
    const [form, setForm] = useState(EMPTY_FORM)
    const [status, setStatus] = useState('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (event) => {
        const {name, value} = event.target
        setForm((current) => ({...current, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setStatus('sending')
        setErrorMessage('')

        try {
            await sendContactMessage(form)
            setForm(EMPTY_FORM)
            setStatus('success')
        } catch (err) {
            setErrorMessage(err.message)
            setStatus('error')
        }
    }

    return (
        <section id="contact" className='contact'>
            <h2>Contact</h2>

            <form className='contact-form' onSubmit={handleSubmit}>
                <label>
                    Nom
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />
                </label>

                <label>
                    E-mail
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Message
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        minLength={10}
                        maxLength={5000}
                        required
                    />
                </label>

                {/* Honeypot : hidden from humans, bots tend to fill it */}
                <div className="contact-trap" aria-hidden="true">
                    <label>
                        Ne pas remplir
                        <input
                            type="text"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'sending'}
                >
                    {status === 'sending' ? 'Envoi...' : 'Envoyer'}
                </button>

                {status === 'success' && (
                    <p className="contact-feedback" role="status">
                        Message envoyé, merci !
                    </p>
                )}
                {status === 'error' && (
                    <p className="contact-feedback contact-error" role="alert">
                        {errorMessage}
                    </p>
                )}
            </form>

            <p className="contact-links">
                Ou retrouvez-moi sur{' '}
                <a href="https://github.com/Mulder-it" target="_blank" rel="noreferrer">
                    GitHub
                </a>
            </p>
        </section>
    )
}

export default Contact