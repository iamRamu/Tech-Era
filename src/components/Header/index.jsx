import { useNavigate } from 'react-router-dom'
import './index.css'

const Header = () => {
    const navigate = useNavigate()
    return(
        <nav className='navbar'>
            <img src='https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png' alt='website-logo' className='header-logo' onClick={()=>navigate("/")}/>
        </nav>
    )
}
export default Header