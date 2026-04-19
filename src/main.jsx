import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainRoutes from './routes/index.jsx'

import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './providers/globalContext'
import { TasksProvider } from './providers/taskContext.jsx'
import { UserProvider } from './providers/userContext.jsx'
import './styles/global.scss'
import "./styles/responsiveness.scss"
import Footer from './components/Footer/index.jsx'
import ScrollToTop from './components/ScrollToTop/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <UserProvider>
          <TasksProvider>
            <ScrollToTop />
            <MainRoutes />
            <Footer />
          </TasksProvider>
        </UserProvider>
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>,
)