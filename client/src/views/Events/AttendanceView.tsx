import React, {useEffect, useState} from "react"
import {
  Box, Typography,
} from "@mui/material";

import {_incrementEventAttendance} from "../../api/eventApi";
import {useParams} from "react-router-dom";
import to from 'await-to-js'


export default function AttendanceView() {
  const {eventId} = useParams()
  const [error, setError] = useState(0);

  useEffect(() => {
    const incrementAttendance = async () => {
      const [err, res] = await to(_incrementEventAttendance({_id: eventId!}))

      if (err) {
        setError(1)
        return
      }

      if (res.data == "Event already passed") {
        setError(2)
      }
    }

    incrementAttendance()
  }, [])

  if (error == 1) {
    return (
      <Box className="flex w-full items-center">
        <Typography variant="h2" component="h1">
          Failed to record attendance. Please try again.
        </Typography>
      </Box>
    )
  } else if (error == 2) {
    return (
      <Box className="flex w-full items-center">
        <Typography variant="h2" component="h1">
          This event has already passed.
        </Typography>
      </Box>
    )
  } else {
    return (
      <Box className="flex w-full items-center">
        <Typography variant="h2" component="h1">
          Your attendance was successfully recorded.
        </Typography>
      </Box>
    )
  }
}