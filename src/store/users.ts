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
    const users = ref<User[]>([
        {
            id: 1,
            name: 'Admin',
            login: '123',
            password: '123',
            regDate: '13.02.2000'
        }
    ])
    const isLoggedIn = ref(false)
    const isOpen = ref(false)
    const registerUser = (user: User) => {
        users.value.push(user)
        isLoggedIn.value = true
        isOpen.value = false
    }
    const loginUser = (login: String, password: String) => {
        if (users.value.some(user => user.login === login && user.password === password)) {
            isLoggedIn.value = true
            isOpen.value = false
        } else {
            alert('Wrong login or password!')

        }
    }

    return {
        users,
        isLoggedIn,
        isOpen,
        registerUser,
        loginUser
    }
})