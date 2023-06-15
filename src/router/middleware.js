import { useAuthStore } from '@/stores/auth.js'

export default (to, from, next) => {
	const authStore = useAuthStore()

	let exceptionalRoutes = ['login']
	let isGoingExceptionalRoutes = exceptionalRoutes.includes(to.name)

	if (!authStore.isLogged) {
		return isGoingExceptionalRoutes ? next() : next({ name: 'login' })
	}
	return authStore.isLogged && isGoingExceptionalRoutes ? next({ name: 'home' }) : next()

}
