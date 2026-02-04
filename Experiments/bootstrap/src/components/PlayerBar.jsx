import { Box, Typography } from "@mui/material"

export default function PlayerBar() {
  return (
    <Box sx={{
      height: 70,
      bgcolor: "#111",
      borderTop: "1px solid #333",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }}>
      <Typography color="white">▶ Now Playing: Demo Song</Typography>
    </Box>
  )
}
