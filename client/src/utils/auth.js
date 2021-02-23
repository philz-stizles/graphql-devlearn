const tokenKey = 'token'

export const getToken = () => localStorage.getItem(tokenKey)

export const isLoggedIn = () => !!localStorage.getItem(tokenKey)

export const login = async (loginCredentials) => {
    const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginCredentials)
    })

    if(response.ok) {
        const { token, loggedInUser} = await response.json()
        localStorage.setItem(tokenKey, token)
        return loggedInUser
    }
}

export const logout = () => localStorage.removeItem(tokenKey)