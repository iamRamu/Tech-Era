import { useLocation, useNavigate } from 'react-router-dom'
import './index.css'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import Header from '../Header'
import { ThreeDots } from 'react-loader-spinner'

const initialValues = {
    loading : true,
    specificIdData : null,
    error : false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "success":
            return {
                ...state,
                specificIdData : action.payload,
                loading : false, 
                error : false
            }
        case "failure":
            return {
                ...state,
                error : true,
                loading : false
            }
        case "loading":
            return {
                ...state,
                loading : true,
                error : false,
            }
    
        default:
            return state
    }
}

const BrowseDetailedView = () => {
    const [stateData, dispatch] = useReducer(reducer, initialValues)
    const location = useLocation()
    const {state} = location
    const {specificId} = state
    const navigate = useNavigate()

    const getSpecificIdData = async() => {
        const apiUrl = `https://apis.ccbp.in/te/courses/${specificId}`
        try {
            dispatch({type : "loading"})
            const response = await axios.get(apiUrl)
            const data = await response.data
            dispatch({type : "success", payload : data.course_details})
        } catch (error) {
            dispatch({type : "failure"})
        }
    } 
    useEffect(()=>{
        if(!state){
            navigate("/")
        }
        getSpecificIdData()
    },[])
    
    const hanldeRetryButton = () => {
        getSpecificIdData()
    }

    return(
        <div className='browse-detailed-view-bg-container'>
            <Header/>
           {stateData.loading ?
                <div>
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
                        wrapperClass=""
                    />
                </div> 
                :
                stateData.error ?
                <div className='technologies-error-bg-container'>
                    <img src='https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png' alt='failure view'/>
                    <h2 className='technologies-error-heading'>Oops! Something Went Wrong</h2>
                    <p className='technologies-error-msg'>We cannot seem to find the page you are looking for.</p>
                    <button className='retry-button' onClick={hanldeRetryButton}>Retry</button>
                </div> 
                :
                <div className='browse-detailed-view-main-container'>
                    <div className='browse-detailed-view-img-container'>
                        <img src={stateData.specificIdData.image_url} alt='specificData logo' className='browse-detailed-view-img'/>
                    </div>
                    <div className='browse-detailed-details-container'>
                        <h2 style={{marginTop:"-10px", marginBottom:"0px"}}>{stateData.specificIdData.name}</h2>
                        <p>{stateData.specificIdData.description}</p>
                    </div>
                </div>
           }
        </div>
    )
}
export default BrowseDetailedView