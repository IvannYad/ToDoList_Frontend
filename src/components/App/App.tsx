import './App.css'
import ITaskAPIService from '../../api/ITaskAPIService'
import TaskAPIService from '../../api/TaskAPIService'
import React from 'react'
import MainHeader from '../MainHeader/MainHeader';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';


export const TaskAPIServiceContext = React.createContext<ITaskAPIService>(new TaskAPIService(""));

function App() {
  const taskAPIService: ITaskAPIService = new TaskAPIService(import.meta.env.VITE_API_URL);
  
  return (
    <TaskAPIServiceContext.Provider value={taskAPIService}>
      <div>
        <MainHeader />
        <Main />
        <Footer />
      </div>
    </TaskAPIServiceContext.Provider>
  )
}

export default App
