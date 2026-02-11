import {useState} from 'react'

import formStyles from './Form.module.css'

import Input from './input'
import Select from './Select'

function PetForm({ handleSubmit, petData, btnText }) {
    console.log('PetForm assembled with handleSubmit', handleSubmit)


    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const color = ["White", "Black", "Gray", "Caramel", "Merged"]

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setPet({...pet, images: [...e.target.files]})
    }

    function handleChange(e){
        setPet({...pet, [e.target.name]: e.target.value})
    }
    
    function handleColor (e){
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(pet)
    }

    return (
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={pet.name}
                            key={`${pet.name}+${index}`}
                        />
                    )) :
                    pet.images &&
                    pet.images.map((image, index) => (
                        <img
                            src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                            alt={pet.name}
                            key={`${pet.name}+${index}`}
                        />
                    ))                
                }
            </div>
            <Input
                text="Pet Images"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Pet's name"
                type="text"
                name="name"
                placeholder="Enter name"
                handleOnChange={handleChange}
                value={pet.name || ''}
            />
            <Input
                text="Pet Age"
                type="text"
                name="age"
                placeholder="Enter age"
                handleOnChange={handleChange}
                value={pet.age || ''}
            />
            <Input
                text="Pet Age"
                type="number"
                name="weight"
                placeholder="Enter the weight"
                handleOnChange={handleChange}
                value={pet.weight || ''}
            />
            <Select
                name="color"
                text="Select color"
                option={color}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />
            <input type="submit" value={btnText} />
        </form>
    )
}
export default PetForm