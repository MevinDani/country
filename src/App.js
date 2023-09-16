import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import CountryView from './CountryView'

const App = () => {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='viewcountry/:id' element={<CountryView />} />
      </Routes>

    </>
  )
}

export default App