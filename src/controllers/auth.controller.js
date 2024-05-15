//Funciones de utilidad

export const signin = (req, res) => {
    res.send('Iniciando sesión')
}

export const signup = (req, res) => {
    res.send('Registrando usuario')
}

export const profile = (req, res) => { 
    res.send('Perfil de usuario')
}

export const signout = (req, res) => {
    res.send('Cerrando sesión')
}
