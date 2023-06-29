import './navigation.styles.css'
import { NavLink } from 'react-router-dom'

function Navigation() {
    return (<nav>
        <NavLink end to="/" >Notes app</NavLink>
    </nav>)
}

export default Navigation