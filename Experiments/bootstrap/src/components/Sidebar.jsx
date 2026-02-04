import { Box, List, ListItem, ListItemText, Typography } from "@mui/material"

export default function Sidebar() {
  return (
    <Box sx={{ 
      width: 240, 
      bgcolor: "#000", 
      color: "white", 
      height: "100vh", 
      p: 2 
    }}>
      <Typography variant="h5" mb={3}>🎧 MusicX</Typography>
      <List>
        <ListItem button><ListItemText primary="Home" /></ListItem>
        <ListItem button><ListItemText primary="Search" /></ListItem>
        <ListItem button><ListItemText primary="Your Library" /></ListItem>
      </List>
    </Box>
  )
}
