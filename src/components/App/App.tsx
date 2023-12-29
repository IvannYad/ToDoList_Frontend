import './App.css'
import ITaskAPIService from '../../api/ITaskAPIService'
import TaskAPIService from '../../api/TaskAPIService'
import React from 'react'
// import MainHeader from '../MainHeader/MainHeader';
// import Main from '../Main/Main';
// import Footer from '../Footer/Footer';
import { getDefaultTask } from '../../helperFunctions/GetDummyTasks';
import CreateUpdateTaskFormModal from '../modals/CreateUpdateTaskFormModal/CreateUpdateTaskFormModal';


export const TaskAPIServiceContext = React.createContext<ITaskAPIService>(new TaskAPIService(""));

function App() {
  const taskAPIService: ITaskAPIService = new TaskAPIService(import.meta.env.VITE_API_URL);
  
  return (
    <TaskAPIServiceContext.Provider value={taskAPIService}>
      {/* <div>
        <MainHeader />
        <Main />
        <Footer />
      </div> */}
      <CreateUpdateTaskFormModal type="update" prevTaskData={getDefaultTask()} isOpen={true} closeHandler={() => {}} />
    </TaskAPIServiceContext.Provider>
  )
}

export default App
