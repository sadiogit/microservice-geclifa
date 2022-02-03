import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Field from '../components/forms/Field'
import AuthContext from '../context/AuthContext'
import AuthAPI from '../services/AuthAPI'



const LoginPage = ({ history }) => {
   
    const { setIsAuthenticated } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    //Gestion d'erreurs
    const [error, setError] = useState("")

    // Gestion des input
    const handleChange = ({currentTarget}) => {
        const {value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value})
    }

    //gestion du boutton soumission
    const handleSubmit = async event => {
        event.preventDefault();

        try{
            await AuthAPI.authenticate(credentials) 
            setError("")
            setIsAuthenticated(true)
            toast.success("Vous êtes désormais connecté !")
            history.replace("/customers")
        }catch (error){
           // console.log(error.response)
            setError(
                "Aucun compte ne possède cette adresse ou alors les information saisis ne correspondent pas"
            )
            toast.error("Une erreur est survenue")
        }
    }
    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
            <Field 
                label="Adresse email"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Adresse email"
                error=""
            />
            <Field
                label="mot de passe"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                type="password"
                placeholder="password"
                error={error}
            />    
            
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        je me connect
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginPage