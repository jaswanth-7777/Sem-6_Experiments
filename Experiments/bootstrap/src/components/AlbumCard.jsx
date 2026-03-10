import { Card, CardContent, Typography, Button } from "@mui/material"

export default function AlbumCard({ title, artist, image }) {
  return (
    <Card sx={{ p: 2 }}>
      <img src={image} width="100%" />
      <CardContent>
        <Typography>{title}</Typography>
        <Typography>{artist}</Typography>
      </CardContent>
    </Card>
  )
}
