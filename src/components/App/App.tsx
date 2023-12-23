import React from 'react'
import './App.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import SearchForm from '../SearchForm/SearchForm'

function App() {
  

  return (
    <React.Fragment>
      <Header />
      <SearchForm />
      <Main />
      <Footer />
    </React.Fragment>
  )
}

export default App
