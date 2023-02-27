import { useEffect, useState } from "react"
import { useParams } from 'react-router';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ClavaNavbar from "../../components/Navigation"

import MemberView from "../Members"
import EventView from "../Events"
import DocumentView from "../Documents"
import FinanceView from "../Finances";
import _404View from "../Error";

export default function ClubCompositie() {
  const { clubId, clubRoute } = useParams<{clubId: string, clubRoute: string}>();

  const getRoute = () : JSX.Element  => {
    switch (clubRoute) {
      case ("members"):
        return <MemberView />
      case ("events"):
        return <EventView />
      case ("documents"):
        return <DocumentView />
      case ("finances"):
        return <FinanceView />
      default:
        return <_404View />
    }
  }

  return (
    <div className="p-2 items-center">
      <ClavaNavbar currentRoute={clubRoute || "null" } clubId={clubId || "null"} clubName={"Bookclub!"} />
      {getRoute()}
    </div>
  )
}
