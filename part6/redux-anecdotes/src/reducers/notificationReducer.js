import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{

        updateNotification(state, action){
            const anecdoteName = action.payload
            const notificationMessage = `You voted '${anecdoteName}'`
            return notificationMessage
        }
    }
})

export const {updateNotification} = notificationSlice.actions

export default notificationSlice.reducer