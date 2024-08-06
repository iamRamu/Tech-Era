import { useEffect, useReducer } from 'react'
import './index.css'
import axios from 'axios'
import TechnologiItem from '../TechnologiItem'
import Header from '../Header'
import {ThreeDots} from 'react-loader-spinner'

const initialValues = {
    loading : true,
    technologies : null,
    error : false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "success":
            return {
                ...state,
                technologies : action.payload,
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
                error : false
            }
        default:
            return state
    }
}

const Technologies = () => {
    const [state, dispatch] = useReducer(reducer, initialValues)

    const getAllTechnologies = async() => {
        const apiUrl = "https://apis.ccbp.in/te/courses"
        try {
            dispatch({type : "loading"})
            const response = await axios.get(apiUrl)
            const data = await response.data
            dispatch({type : "success", payload : data.courses})
        } catch (error) {
            dispatch({type : "failure"})
        }
    }

    useEffect(() => {
        getAllTechnologies()
    },[])

    const hanldeRetryButton = () => {
        getAllTechnologies()
    }

    return(
        <div className='technologies-bg-container'>
            <Header/>
            {state.loading ?
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
                state.error ?
                <div className='technologies-error-bg-container'>
                    <img src='https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png' alt='failure view'/>
                    <h2 className='technologies-error-heading'>Oops! Something Went Wrong</h2>
                    <p className='technologies-error-msg'>We cannot seem to find the page you are looking for.</p>
                    <button className='retry-button' onClick={hanldeRetryButton}>Retry</button>
                </div> 
                :
                <div>
                    <h1 style={{marginLeft : "20px", marginTop:"80px"}}>Courses</h1>
                    <div className='allTechnologies-bg-container'>
                        {state.technologies &&
                            state.technologies.map(eachTech => <TechnologiItem techDetails={eachTech} key={eachTech.id}/>)
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default Technologies
