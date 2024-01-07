import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
   <>
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 5}}>
        <h2>Page not found</h2>
    <Link to={"/"}>
        Go back to home page.....
    </Link>
    </div>
    </>
  )
}

export default NotFoundPage