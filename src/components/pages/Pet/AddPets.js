import api from '../../../utils/api'

import styles from './AddPet.module.css'

import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

/* components */
import PetForm from '../../form/PetForm'

function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    async function registerPet(pet) {

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        try {
            const response = await api.post('pets/create', formData, {
                headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })

        setFlashMessage(response.data.message, 'success')
        navigate('/pets/mypets')
        }catch (err) {
            console.log('Erro completo:', err.response)
            const message = err.response?.data?.message || 'Erro desconhecido ao cadastrar pet'
            setFlashMessage(message, 'error')
        }

    }

    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Register a Pet</h1>
                <p>After that, he will be available for adoption.</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Register Pet" />
        </section>
    )
}
export default AddPet