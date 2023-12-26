import './App.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import ITaskAPIService from '../../api/ITaskAPIService'
import TaskAPIService from '../../api/TaskAPIService'
import React from 'react'
import { apiUrl } from '../../static-data/StaticData'
import CreateTaskFrom from '../CreateTaskForm/CreateTaskFrom'

export const TaskAPIServiceContext = React.createContext<ITaskAPIService>(new TaskAPIService(""));

function App() {
  const taskAPIService: ITaskAPIService = new TaskAPIService(apiUrl);
  
  return (
    <TaskAPIServiceContext.Provider value={taskAPIService}>
      <div>
        {/* <Header />
        <Main />
        <Footer />
        <div id="curtains"></div>
        <div id="additional-elements-holder"></div> */}
        <CreateTaskFrom />
      </div>
    </TaskAPIServiceContext.Provider>
  )
}

export default App
