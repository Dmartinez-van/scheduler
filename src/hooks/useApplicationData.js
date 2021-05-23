import { useState, useEffect} from 'react'
import axios from 'axios';

const useApplicationData = () => {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev,
                            days: all[0].data,
                            appointments: all[1].data,
                            interviewers: all[2].data
                        }));
                      });
  }, [])

  const setDay = day => setState({...state, day});

  const updateSpots = function (dayName, days, appointments) {
    // grab day object we care about through a filter. It will be an object
    const day = days.filter(day => day.name === dayName)[0];
    
    // loop through appointments object using the array in day.appointments as the keys.
    let count = 0;
    for (const appointmentValue of day.appointments) {
      if (appointments[appointmentValue].interview === null) {
        count++;
      }
    }

    // create a new day object and overwrite the spots key with our new count vale.
    const newDay = {...day, spots: count};

    // create a new week array with our new day inserted.
    const newWeek = days.map(day => {
      // only passes once, for the day we passed into this function originally
      if (dayName === day.name) {
        return newDay;
      }
      // else return the day as normally, no modification
      return day;
    });

    return newWeek;
  };
  
  const bookInterview = (id, interview) => {  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state.day, state.days, appointments);
    return axios.put(`/api/appointments/${id}`, appointment)
                .then(res => setState({...state, days, appointments}));          
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
    const days = updateSpots(state.day, state.days, appointments);
    return axios.delete(`/api/appointments/${id}`, appointment)
                .then(res => setState({...state, days, appointments}));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  }
}

export default useApplicationData;
