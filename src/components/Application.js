import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";

export default function Application(props) {
  
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 0,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 1,
    },
    {
      id: 4,
      name: "Thursday",
      spots: 1,
    },
  ];

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={days}
              day={"Monday"}
              setDay={day => console.log(day)}
            />
          </nav>
          <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements during the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
