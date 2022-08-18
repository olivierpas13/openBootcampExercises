import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{

        votedNotification(state, action){
            const anecdoteName = action.payload
            const notificationMessage = `You voted '${anecdoteName}'`
            return notificationMessage
        },

        createdNotification(state, action){
            const anecdoteName = action.payload
            const notificationMessage = `You created '${anecdoteName}'`
            return notificationMessage    
        },

        deleteNotification(state, action){
            return ''
        }
    }
})

export const {votedNotification, createdNotification, deleteNotification} = notificationSlice.actions

export default notificationSlice.reducer