import './App.css'
import MainHeader from '../MainHeader/MainHeader'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import ITaskAPIService from '../../api/ITaskAPIService'
import TaskAPIService from '../../api/TaskAPIService'
import React from 'react'

export const TaskAPIServiceContext = React.createContext<ITaskAPIService>(new TaskAPIService(""));

function App() {
  const taskAPIService: ITaskAPIService = new TaskAPIService(import.meta.env.VITE_API_URL);
  
  return (
    <TaskAPIServiceContext.Provider value={taskAPIService}>
      <div>
        <MainHeader />
        <Main />
        <Footer />
        <div id="curtains"></div>
        <div id="additional-elements-holder"></div>
      </div>
    </TaskAPIServiceContext.Provider>
  )
}

export default App
