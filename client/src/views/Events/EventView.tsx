import { useEffect, useState } from "react"
import ClavaNavbar from "../../components/Navigation"

export default function EventView() {
  return (
    <div className="p-2 items-center">
      <ClavaNavbar currentRoute="Events"/>
      <h1>Events</h1>
    </div>
  )
}