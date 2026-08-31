import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { AboutPage } from './pages/AboutPage'
import { BrokersPage } from './pages/BrokersPage'
import { CalculatorsPage } from './pages/CalculatorsPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { IPOPage } from './pages/IPOPage'
import { PricingPage } from './pages/PricingPage'
import { ServicesPage } from './pages/ServicesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'ipo', element: <IPOPage /> },
      { path: 'brokers', element: <BrokersPage /> },
      { path: 'calculators', element: <CalculatorsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
], { basename: import.meta.env.BASE_URL })

