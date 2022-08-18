import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{

        createNotification(state, action){
            const notification = action.payload
            const notificationMessage = notification
            return notificationMessage
        
        },

        // votedNotification(state, action){
        //     const anecdoteName = action.payload
        //     const notificationMessage = `You voted '${anecdoteName}'`
        //     return notificationMessage
        // },

        // createdNotification(state, action){
        //     const anecdoteName = action.payload
        //     const notificationMessage = `You created '${anecdoteName}'`
        //     return notificationMessage    
        // },

        deleteNotification(state, action){
            return ''
        }
    }
})

export const setNotification = (notification, time) => {
    
    return async (dispatch) =>{
        dispatch(createNotification(notification))
        
        setTimeout(() => {
           dispatch(deleteNotification()) 
        }, (time * 1000));
        
    }
}


export const {createNotification, deleteNotification} = notificationSlice.actions

export default notificationSlice.reducer