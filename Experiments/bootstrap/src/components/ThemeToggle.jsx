import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { Button } from "@mui/material"

export default function ThemeToggle() {
  const { state, dispatch } = useContext(AppContext)

  return (
    <Button
      variant="contained"
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
    >
      {state.theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  )
}
