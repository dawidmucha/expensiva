import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid) => ({
	type: 'LOGIN',
	uid
})

export const startLogIn = () => {
	return () => {
		return firebase.auth().signInWithPopup(googleAuthProvider)
	}
}

export const logout = (uid) => ({
	type: 'LOGOUT'
})

export const startLogOut = () => {
	return () => {
		return firebase.auth().signOut()
	}
}