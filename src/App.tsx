import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

function App() {
  const location = useLocation()

  return (
    <div className="page-shell">
      <Header />
      <main>
        <div key={location.pathname} className="page-content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
