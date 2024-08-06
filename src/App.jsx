import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Technologies from './components/Technologies'
import BrowseDetailedView from './components/BrowseDetailedView'
import NotFound from './components/NotFound'

const App = () => {
  return(
    <div className='app-bg-container'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Technologies />}/>
                <Route path='/courses' element={<BrowseDetailedView />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App