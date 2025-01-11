import { Outlet } from 'react-router'
import Header from '../Header'
import Footer from '../Footer'

const MainLayout = () => {
  return (
    <div>
      <Header />

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
export default MainLayout
