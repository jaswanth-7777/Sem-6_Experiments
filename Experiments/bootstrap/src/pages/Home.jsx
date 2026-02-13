import { Box } from "@mui/material"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import PlayerBar from "../components/PlayerBar"
import AlbumCard from "../components/AlbumCard"
import albums from "../data/albums"

export default function Home() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", bgcolor: "#1c1c1c", color: "white" }}>
        <Topbar />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 3
          }}
        >
          {albums.map((album) => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </Box>

        <PlayerBar />
      </Box>
    </Box>
  )
}
