import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Card, CardContent, Typography, Button } from "@mui/material"

export default function AlbumCard({ album }) {
  const { dispatch } = useContext(AppContext)

  return (
    <Card sx={{ p: 2 }}>
      <img src={album.image} width="100%" />
      <CardContent>
        <Typography>{album.title}</Typography>
        <Typography>{album.artist}</Typography>

        <Button
          onClick={() =>
            dispatch({ type: "ADD_FAVORITE", payload: album })
          }
        >
          Add to Favorites
        </Button>
      </CardContent>
    </Card>
  )
}
