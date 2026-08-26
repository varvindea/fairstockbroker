import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

function App() {
  const location = useLocation()

  return (
    <>
      <Header />
      <main key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
