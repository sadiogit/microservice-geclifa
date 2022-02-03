import React, {useContext} from 'react' 
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


//Routeb prive si on est pas connecté on a pas accès au contenu 
const PrivateRoute = ({path, component}) => {

    const {isAuthenticated} = useContext(AuthContext)

    return isAuthenticated ? (<Route path={path} component={component} /> ) : ( <Redirect to="/login" /> )

}

export default PrivateRoute