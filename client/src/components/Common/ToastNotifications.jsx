import { ToastContainer } from 'react-toastify'

function ToastNotifications() {
  return <ToastContainer position="top-right" autoClose={3000} newestOnTop pauseOnFocusLoss />
}

export default ToastNotifications
