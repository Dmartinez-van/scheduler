import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay} from "helpers/selectors"

const axios = require('axios');

export default function Application(props) {

  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      appointments: [
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
      ]
    }
  });
  const setDay = day => setState({...state, day});
  // const setDays = days => setState(prev => ({...prev, days}));
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  useEffect(() => {
    Promise.all([
      axios
        .get(`http://localhost:8001/api/days`),
      axios
        .get(`http://localhost:8001/api/appointments`),
      axios
        .get(`http://localhost:8001/api/interviewers`)
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      });
  }, [])

  const appointmentArr = dailyAppointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />
  })
  

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
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
