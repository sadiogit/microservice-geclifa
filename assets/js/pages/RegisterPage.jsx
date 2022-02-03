import axios from 'axios'
import React, { useState } from 'react' 
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Field from '../components/forms/Field'
import UsersAPI from '../services/usersAPI'

const RegisterPage = ({ history }) => { 
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirm:""
    })

    const [errors, setErrors] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirm:""
    })

    const handleChange = ({currentTarget}) =>{
        const {name, value} = currentTarget;
        setUser({...user, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()
       
        const apiErros = {}

        if(user.password !== user.passwordConfirm) {
            apiErros.passwordConfirm = "vos mots de passe ne sont pas conforment !!!!!"
            setErrors(apiErros)
            toast.error("Des erreurs dans votre formulaires !")
            return
        }

       try{

           const response = await UsersAPI.register(user)
           
           setErrors({})
           toast.success("Vous êtes désormais inscrit, vous pouvez vous connecter !")
           history.replace("/login")
       }catch (error){
            console.log(error.response)
            const {violations} = error.response.data 

            if(violations){
                const apiErros = {}
                violations.forEach(violation => {
                    apiErros[violation.propertyPath] = violation.message
                }) 

                setErrors(apiErros)
            }
            toast.error("Des erreurs dans votre formulaires !")
       }

       //console.log(user)
    }

    return (
        <>  
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
               <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="votre prénom"
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
               /> 
               <Field
                    name="lastName"
                    label="Nom"
                    placeholder="votre nom de famille"
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
               /> 
               <Field
                    name="email"
                    label="email"
                    placeholder="donnez votre email"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
               /> 
               <Field
                    name="password"
                    label="mot de passe"
                    type="password"
                    placeholder="entrez votre mot de passe"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
               /> 
               <Field
                    name="passwordConfirm"
                    label="confirmation de votre mot de passe"
                    type="password"
                    placeholder="entrez une seconde fois pour confirmer votre mot de passe"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
               /> 

               <div className="form-group mt-3"> 
                    <button type="submit" className="btn btn-success">confirmation</button>
                    <Link to="/login" className="btn btn-link">
                        j'ai déjà un compte
                    </Link>
               </div>
               
            </form>
        </>
    )
}

export default RegisterPage