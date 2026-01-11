"use client"

import { useState } from "react";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import EventList from "./components/EventList/EventList";

export default function Home() {
  const [refreshSignal, setRefreshSignal] = useState(false);
  return (
    <div
      style={{
        display:"flex",
        flexDirection:'column',
        alignItems:'center'
      }}
    >
      <CreateEvent onEventCreated={() => setRefreshSignal(prev => !prev)} />  
      <div>
        -- Filter space here --
      </div>
      <EventList refreshSignal={refreshSignal} />
    </div>
  );
}
