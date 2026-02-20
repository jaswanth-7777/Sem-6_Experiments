import { useParams } from "react-router-dom"
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material"
import albums from "../data/albums"
import Sidebar from "../components/Sidebar"
import PlayerBar from "../components/PlayerBar"

export default function AlbumDetails() {
  const { id } = useParams()
  if (!album) return <div>Album not found</div>

  if (!album) return <Typography>Album not found</Typography>

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box sx={{ flex: 1, bgcolor: "#1c1c1c", color: "white", p: 4 }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box
            component="img"
            src={album.image}
            alt={album.title}
            sx={{ width: 250, borderRadius: 3 }}
          />

          <Box>
            <Typography variant="h3">{album.title}</Typography>
            <Typography variant="h6" color="gray">
              {album.artist}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" mb={2}>
            Songs
          </Typography>
          <List>
            {album.songs.map((song, index) => (
              <ListItem key={index}>
                <ListItemText primary={song} />
              </ListItem>
            ))}
          </List>
        </Box>

        <PlayerBar />
      </Box>
    </Box>
  )
}
