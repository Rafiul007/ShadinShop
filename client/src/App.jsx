import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, ProductPage, ShopPage, CategoryPage } from './Pages';
import Navbar from './components/Navbar';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category" element={<CategoryPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
