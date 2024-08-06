import { useNavigate } from 'react-router-dom'
import './index.css'

const TechnologiItem = props => {
    const {techDetails} = props
    const {id, name, logo_url} = techDetails
    const navigate = useNavigate()
    const handleTechItem = () => {
        navigate("/courses", {state : {specificId : id}})
    }
    return (
        <div className='tech-item-bg-container' onClick={handleTechItem}>
            <img src={logo_url} className='tech-logo'/>
            <h3 style={{marginLeft:"10px"}}>{name}</h3>
        </div>
    )
}
export default TechnologiItem