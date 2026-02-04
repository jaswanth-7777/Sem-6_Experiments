import { Box } from "@mui/material"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import AlbumCard from "../components/AlbumCard"
import PlayerBar from "../components/PlayerBar"

export default function Home() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <Box sx={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column",
        bgcolor: "#1c1c1c",
        color: "white"
      }}>
        
        {/* Topbar */}
        <Topbar />

        {/* Scrollable Content */}
        <Box
  sx={{
    flex: 1,
    overflowY: "auto",
    p: 3,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 3,
    alignContent: "start"
  }}
>

          <AlbumCard title="Blinding Lights" artist="The Weeknd" />
          <AlbumCard title="Levitating" artist="Dua Lipa" />
          <AlbumCard title="Shape of You" artist="Ed Sheeran" />
          <AlbumCard title="Stay" artist="Justin Bieber" />
          <AlbumCard title="Perfect" artist="Ed Sheeran" />
          <AlbumCard title="Believer" artist="Imagine Dragons" />
        </Box>

        {/* Player Bar fixed at bottom */}
        <PlayerBar />
      </Box>
    </Box>
  )
}
