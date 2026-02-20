import { useContext, useMemo } from "react"
import { AppContext } from "../context/AppContext"
import { Box, Typography, Button } from "@mui/material"

export default function Favorites() {
  const { state, dispatch } = useContext(AppContext)

  const totalFavorites = useMemo(() => {
    return state.favorites.length
  }, [state.favorites])

  return (
    <Box p={4}>
      <Typography variant="h4">
        Favorites ({totalFavorites})
      </Typography>

      {state?.favorites?.map((album) => (
        <Box key={album.id} mb={2}>
          <Typography>{album.title}</Typography>
          <Button
            onClick={() =>
              dispatch({
                type: "REMOVE_FAVORITE",
                payload: album.id
              })
            }
          >
            Remove
          </Button>
        </Box>
      ))}

      <Button
        variant="contained"
        onClick={() => dispatch({ type: "CLEAR_FAVORITES" })}
      >
        Clear All
      </Button>
    </Box>
  )
}
