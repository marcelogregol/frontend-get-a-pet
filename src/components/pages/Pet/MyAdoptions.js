import api from '../../../utils/api'

import { useState, useEffect} from 'react'

import styles from './Dashboard.module.css'

import RoudedImage from '../../layout/RoundedImage'

function MyAdoptions() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        // Criamos uma função async dentro do useEffect
        const fetchPets = async () => {
            try {
                const response = await api.get('/pets/myadoptions', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`, // passa o token correto
                    },
                })
                
                setPets(response.data.pets) // atualiza o estado
                console.log(response.data.pets) // log correto dos dados recebidos
            } catch (err) {
                // Tratamento de erro
                console.error(err.response?.data || err)
            }
        }

        // Chamamos a função apenas se houver token
        if (token) fetchPets()
    }, [token]) //

    return (
        <section>
            <div className={styles.petlist_header}>
                <h1>My adoptions</h1>
            </div>
            <div className={styles.petlist_container}>
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div className={styles.petlist_row} key={pet._id}>
                            <RoudedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span className='bold'>{pet.name}</span>
                            <div className={styles.contacts}>
                                <p>
                                    <span className="bold">Call: </span>{pet.user.phone}
                                </p>
                                <p>
                                    <span className="bold">Talk to: </span>{pet.user.name}
                                </p>
                            </div>
                            <div className={styles.actions}>
                                {pet.available ?
                                (<>
                                    <p>Adoption in process</p>
                                </>)
                                :
                                (
                                    <p>Congratulations on completing the adoption!</p>
                                )}
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 && <p>Pet adoptions are not yet available.</p>}
            </div>
        </section>
    )
}

export default MyAdoptions