import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainLayout from './core/Layout/MainLayout'
import List from './modules/transactions'
import Dashboard from './modules/dashboard'
import Create from './modules/transactions/create'
import Edit from './modules/transactions/edit'
import View from './modules/transactions/view'
import Performance from './modules/Performance'
import Snapshot from './modules/Snapshot'
import Report from './modules/report'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<List />} />
          <Route path="/report" element={<Report />} />
          <Route path="/transactions/create" element={<Create />} />
          <Route path="/transactions/edit/:id" element={<Edit />} />
          <Route path="/transactions/view/:id" element={<View />} />
          <Route path="/performance-overview" element={<Performance />} />
          <Route path="/holdings-snapshot" element={<Snapshot />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
