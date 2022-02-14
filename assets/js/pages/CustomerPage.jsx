import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Field from "../components/forms/Field"
import FormContentLoader from "../components/loaders/FormContentLoader"
import CustomersAPI from "../services/customersAPI"


const CustomerPage = ({match, history}) => {

    const { id = "new" } = match.params

    const [customer, setCustomer ] = useState({
        lastName:"",
        firstName:"",
        email:"",
        company:""
    })

    const [errors, setErrors] = useState({
        lastName:"",
        firstName:"",
        email:"",
        company:""
    })
    const [editing, setEditing] = useState(false)
    const [loadin, setLoading]  = useState(false)

    // Cette fonction permet de récuperer un client en fonction de son identifiant
    const fetchCustomer = async id => { 
        try {
            const { firstName, lastName, email, company} = await CustomersAPI.find(id)

            setCustomer({ firstName, lastName, email, company})
            setLoading(false)
        }catch (eroor) {

            toast.error("Le client n'a pas pu être chargé ")
            history.replace('/customers')    
        }  
    }

    // Chargement du client si besoin au chargement du composant ou au changement de l'id
    useEffect(() => {
        if(id !== "new") { 
        setLoading(true)    
        setEditing(true)
        fetchCustomer(id)
        }
    }, [id])

    const handleChange = ({ currentTarget }) => {
        const {name, value } = currentTarget;
        setCustomer({...customer, [name]: value})
    }

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault()
        try {
                setErrors({})           
                if(editing){
                     await CustomersAPI.update(id, customer) 
                     toast.success("Le client a bien été modifié")
                }else{      
                   /* const response = await axios.post(
                        "http://localhost:8000/api/customers", customer)     
                   */   
                     await CustomersAPI.create(customer) 
            toast.success("Le client a bien été crée")
            history.replace("/customers")
        }
        } catch ({ response }) {
            
            const { violations } = response.data
            if(violations) {
                const apiErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })

                setErrors(apiErrors)
                toast.error("Des erreurs dans votre formulaire !")
            }
        }
    }

    return (
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Edition d'un client</h1>}

            {loadin && <FormContentLoader/> }
            {!loadin && (
            <form onSubmit={handleSubmit}>
                <Field 
                    name="lastName"
                    label="Nom de famille du client"
                    placeholder="nom"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field 
                    name="firstName"
                    label="Prénom du client"
                    placeholder="prénom"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field 
                    name="email"
                    label="Email du client"
                    placeholder="exemple@test.com"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}

                />
                <Field 
                    name="company"
                    label="compagnie du client"
                    placeholder="Etreprise"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Enregistrer
                    </button>
                    <Link to="/customers" className="btn btn-link">
                        Retour à la liste
                    </Link>
                </div>
            </form>
            )}

        </>
    )
}

export default CustomerPage