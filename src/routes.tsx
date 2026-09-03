import { createHashRouter } from 'react-router-dom'
import App from './App'
import { AboutPage } from './pages/AboutPage'
import { BrokersPage } from './pages/BrokersPage'
import { BrokerDetailPage } from './pages/BrokerDetailPage'
import { BrokerComparisonPage } from './pages/BrokerComparisonPage'
import { CalculatorsPage } from './pages/CalculatorsPage'
import { CalculatorDetailPage } from './pages/CalculatorDetailPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { GuidePage } from './pages/GuidePage'
import { IPOPage } from './pages/IPOPage'
import { PricingPage } from './pages/PricingPage'
import { ServicesPage } from './pages/ServicesPage'
import { SourcePagesPage } from './pages/SourcePagesPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'ipo', element: <IPOPage /> },
      { path: 'brokers', element: <BrokersPage /> },
      { path: 'brokers/:slug', element: <BrokerDetailPage /> },
      { path: 'compare/:slug', element: <BrokerComparisonPage /> },
      { path: 'calculators', element: <CalculatorsPage /> },
      { path: 'calculators/:slug', element: <CalculatorDetailPage /> },
      { path: 'guides/:slug', element: <GuidePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'pages', element: <SourcePagesPage /> },
    ],
  },
])

