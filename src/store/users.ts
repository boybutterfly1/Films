import { defineStore } from 'pinia'
import {ref} from "vue";

interface User {
    id: Number,
    name: String,
    login: String,
    password: String,
    regDate: String
}
export const useUsersStore = defineStore('users', () => {
    const Admin = ref({
        id: 1,
        name: 'Admin',
        login: '123',
        password: '123',
        regDate: '13.02.2000'
    })
    const users = ref<User[]>([
        Admin.value
    ])
    const isLoggedIn = ref(false)
    const isOpen = ref(false)
    const registerUser = (user: User) => {
        users.value.push(user)
        isLoggedIn.value = true
        isOpen.value = false
        currentUser.value = user
    }
    const currentUser = ref<User | null>(Admin.value)

    const loginUser = (login: String, password: String) => {
        if (login && password) {
            const user = users.value.filter(user => user.login === login && user.password === password)[0]
            if (user) {
                isLoggedIn.value = true
                isOpen.value = false
                currentUser.value = user
            } else {
                alert('Wrong login or password!')
            }
        }
    }

    return {
        users,
        isLoggedIn,
        isOpen,
        currentUser,
        registerUser,
        loginUser
    }
})
