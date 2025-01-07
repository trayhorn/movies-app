import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div>Error 404, the page is not found. Please click
       <Link to='/'>here</Link> to go back to the home page.
    </div>
  )
}