import { Outlet } from 'react-router'
import Header from '../Header'
import Footer from '../Footer'

const MainLayout = () => {
  return (
    <>
      <Header />

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
export default MainLayout
