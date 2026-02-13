import { Card, CardContent, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function AlbumCard({ id, title, artist, image }) {
  const navigate = useNavigate()

  return (
    <Card
      onClick={() => navigate(`/album/${id}`)}
      sx={{
        height: 260,
        cursor: "pointer",
        borderRadius: 3,
        bgcolor: "#181818",
        color: "white",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" }
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          height: 160,
          width: "100%",
          objectFit: "cover",
          borderRadius: "12px 12px 0 0"
        }}
      />
      <CardContent>
        <Typography fontWeight="bold">{title}</Typography>
        <Typography variant="body2" color="gray">
          {artist}
        </Typography>
      </CardContent>
    </Card>
  )
}
