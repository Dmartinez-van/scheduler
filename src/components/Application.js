import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "David Martinez",
      interviewer: {
        id: 3,
        name: "Tommy Phillpo",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Garbango Rocket",
      interviewer: {
        id: 5,
        name: "Kaleb Longbow",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {

  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");
  
  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/days`)
      .then((res) => {
        // console.log(res)
        setDays([...res.data])
      })
  }, [])

  const appointmentArr = appointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={days}
              day={day}
              setDay={setDay}
            />
          </nav>
          <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {appointmentArr}
        {<Appointment key="last" time="5pm"/>}
      </section>
    </main>
  );
}
