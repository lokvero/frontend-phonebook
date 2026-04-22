const Notification = ({message}) => {
    if(message.text){
        return(
            <div className={message.isSuccess?'success':'error'}>
                {message.text}
            </div>
        )
    }
}
export default Notification
