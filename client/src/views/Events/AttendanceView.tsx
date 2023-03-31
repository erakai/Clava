import React, {useEffect, useState} from "react"
import {
  Box, Typography,
} from "@mui/material";

import {_incrementEventAttendance} from "../../api/eventApi";
import {useParams} from "react-router-dom";
import to from 'await-to-js'


export default function AttendanceView() {
  const {eventId} = useParams()
  const [message, setMessage] = useState("Your attendance was successfully recorded.");

  useEffect(() => {
    const incrementAttendance = async () => {
      const [err, res] = await to(_incrementEventAttendance({_id: eventId!}))

      if (err) {
        setMessage("Failed to record attendance. Please try again.")
        return
      }

      if (res.data == "Event already passed") {
        setMessage("This event has already passed.")
      }
    }

    incrementAttendance()
  }, [])

  return (
    <Box className="flex w-full items-center">
      <Typography variant="h2" component="h1">
        {message}
      </Typography>
    </Box>
  )
}