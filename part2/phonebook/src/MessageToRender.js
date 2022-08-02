export const MessageToRender = ({message, type}) =>{
    return(
        <div className={type}> {message}</div>
    )
}