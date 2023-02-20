import { getUsers } from "api/user"
import { Link } from "react-router-dom"

function Main() {
  return (
    <div className="Main">
      <h1>Sup</h1>
        <Link to="reset">Reset</Link>
      <p>This will be the main homepage of the site</p>
    </div>
  )
}
  
export default Main
  