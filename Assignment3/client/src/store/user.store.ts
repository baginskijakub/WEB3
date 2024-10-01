import type { User } from '~/src/model'
import { UserService } from '~/src/services/user.services'

export const useUserStore = defineStore('user', () => {
  const user = computed<User | null>(() => {
    const userCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('user='))
    if (userCookie) {
      return JSON.parse(userCookie.split('=')[1])
    }
    return null
  })

  const login = async (email: string, password: string) => {
    const user = await UserService.login(email, password)
    setUser(user)
  }

  const register = async (email: string, name: string, password: string) => {
    const user = await UserService.register(email, name, password)
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  const setUser = (user: User | null) => {
    if (user) {
      document.cookie = `user=${JSON.stringify(user)}; path=/`
    } else {
      document.cookie = 'user=; path=/'
    }
  }

  return {
    user,
    setUser,
    login,
    register,
    logout
  }
})