import { useContext } from "react"
import NotificationContext from "../contexts/NotificationContext"

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }
  const {notification, setNotification} = useContext(NotificationContext)

  if (!notification) return null

  if (notification.timeout)
    setTimeout(() => setNotification(null), notification.timeout * 1000)

  return <div data-testid="notification" style={style}>{notification.message}</div>
}

export default Notification
