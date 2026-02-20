import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppProvider } from "./context/AppContext"
import Home from "./pages/Home.jsx"
import AlbumDetails from "./pages/AlbumDetails.jsx"
import Favorites from "./pages/Favorites.jsx"

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album/:id" element={<AlbumDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
