import { useSelector } from "react-redux"
import { deleteNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"


const Notification = () => {

  const dispatch = useDispatch()

  const notification = useSelector(state=> state.notification)

  // setTimeout(() => {
    dispatch(deleteNotification)
  // }, 5000)


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}> 
    {
    notification
  }
      {/* {
        setTimeout(() => {
          dispatch(deleteNotification)
        }, 5000)
        } */}
   </div>
  )
}

export default Notification