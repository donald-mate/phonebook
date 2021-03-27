import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    } else if (message.includes("removed")) {
        return (
            <div className="error">
              {message}
            </div>
        )
    } else {
        return (
            <div className="added">
              {message}
            </div>
        )
    }
  }

export default Notification