import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

const axios = require('axios');

export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
                .then(res => setState({...state, appointments}));
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
                .then(res => setState({...state, appointments}));
  }

  const setDay = day => setState({...state, day});
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
        setState(prev => ({...prev,
                            days: all[0].data,
                            appointments: all[1].data,
                            interviewers: all[2].data
                          }));
      });
  }, [])

  const appointmentArr = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewerArr = getInterviewersForDay(state, state.day)

    return (
      <Appointment 
      key={appointment.id}
      {...appointment}
      // key={appointment.id} 
      // id = {appointment.id}
      // time = {appointment.time}
      interview={interview}
      interviewers={interviewerArr}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
    );
  });

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
