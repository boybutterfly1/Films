import { defineStore } from 'pinia'
import {ref} from "vue";
import {Film, User} from "@/types/types";

export const useUsersStore = defineStore('users', () => {
    const Admin = ref({
        id: 1,
        name: 'Admin',
        login: '123',
        password: '123',
        regDate: '00.00.0000'
    })
    const users = ref<User[]>([
        Admin.value
    ])
    const isLoggedIn = ref(false)
    const logRegWindowIsOpen = ref(false)
    const currentUser = ref<User | null>(Admin.value)
    const seenRecently = ref<Film[]>([]);
    const registerUser = (user: User) => {
        users.value.push(user)
        isLoggedIn.value = true
        logRegWindowIsOpen.value = false
        currentUser.value = user
    }
    const loginUser = (login: String, password: String) => {
        if (login && password) {
            const user = users.value.filter(user => user.login === login && user.password === password)[0]
            if (user) {
                isLoggedIn.value = true
                logRegWindowIsOpen.value = false
                currentUser.value = user
            } else {
                alert('Wrong login or password!')
            }
        }
    }
    return {
        users,
        isLoggedIn,
        logRegWindowIsOpen,
        currentUser,
        seenRecently,
        registerUser,
        loginUser
    }
})
