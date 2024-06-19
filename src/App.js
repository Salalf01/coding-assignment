import { Routes, Route } from "react-router-dom"
import 'reactjs-popup/dist/index.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import './app.scss'
import { searchMovies } from './data/utils'

const App = () => {

  return (
    <div className="App">
      <Header searchMovies={searchMovies} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/starred" element={<Starred  />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
