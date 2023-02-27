import { Box, Fade, useScrollTrigger } from "@mui/material"
import { ReactNode } from "react"

type ScrollProps = {
  children: ReactNode
}

// tutorial at https://mui.com/material-ui/react-app-bar/#back-to-top
export default function ScrollTop({children}: ScrollProps) {
  const trigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    window.scrollTo(0,0)
  };

  return(
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: "50%"}}
      >
        {children}
      </Box>
    </Fade>
  )
}