import { useEffect, useState } from "react"
import ClavaNavbar from "../../components/Navigation"

export default function FinanceView() {
  return (
    <div className="p-2 items-center">
      <ClavaNavbar currentRoute="Finances"/>
      <h1>Finances</h1>
    </div>
  )
}