import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainRoutes from './routes/index.jsx'

import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './providers/globalContext'
import { TasksProvider } from './providers/taskContext.jsx'
import { UserProvider } from './providers/userContext.jsx'
import './styles/global.scss'
import "./styles/responsiveness.scss"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <UserProvider>
          <TasksProvider>
            <MainRoutes />
          </TasksProvider>
        </UserProvider>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>,
)
