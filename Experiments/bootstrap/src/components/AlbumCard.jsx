import { Card, CardContent, Typography, Box } from "@mui/material"

export default function AlbumCard({ title, artist }) {
  return (
    <Card
      sx={{
        height: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 6,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" }
      }}
    >
      <Box
        sx={{
          height: 120,
          bgcolor: "#ddd",
          borderRadius: "8px 8px 0 0"
        }}
      />
      <CardContent>
        <Typography fontWeight="bold">{title}</Typography>
        <Typography color="text.secondary" variant="body2">
          {artist}
        </Typography>
      </CardContent>
    </Card>
  )
}
