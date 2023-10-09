import { defineStore } from 'pinia'
import {ref} from "vue";
import {User} from "@/types/types";

export const useDialogWindows = defineStore('dialogs', () => {
    const addToListIsOpen = ref<boolean>(false)
    const newListWindowIsOpen= ref<boolean>(false)
    return {
        addToListIsOpen,
        newListWindowIsOpen,
    }
})
