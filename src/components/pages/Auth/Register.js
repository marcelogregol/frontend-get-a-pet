import {  useState, useContext } from "react"

import Input from "../../form/input"
import { Link }  from "react-router-dom" 

import styles from '../../form/Form.module.css'

/* contexts */
import { Context } from "../../../context/UserContext"

function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        // enviar o usuario para o banco
        register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input
                    text="Telephone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone"
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />
                <Input
                    text="E-mail"
                    type="text"
                    name="email"
                    placeholder="Enter your name"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    handleOnChange={handleChange}
                    value={user.password || ''}
                />
                <Input
                    text="Password confirmation"
                    type="password"
                    name="confirmpassword"
                    placeholder="Password confirmation"
                    handleOnChange={handleChange}
                    value={user.confirmpassword || ''}
                />
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to="/login">Click here</Link></p>
        </section>
    )
}
export default Register