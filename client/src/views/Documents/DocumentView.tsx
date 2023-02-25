import { useEffect, useState } from "react"
import ClavaNavbar from "../../components/Navigation"

export default function DocumentView() {
  return (
    <div className="p-2 items-center">
      <ClavaNavbar currentRoute="Documents"/>
      <h1>Documents</h1>
    </div>
  )
}