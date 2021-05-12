export function getAppointmentsForDay(state, day) {
  // console.log("Before", state)
  if (!state.days.length) {
    return [];
  }

  // Grab array from state.days, filter by our day parameter (returns one array of one element)
  const filteredDays = state.days.filter(days => day === days.name);

  if (!filteredDays.length) {
    return [];
  }

  // Find matching appointment information in filteredDays in state.appointments and return that array
  const appointmentsForDay = filteredDays[0].appointments.map((appointmentId) => {
    return state.appointments[appointmentId] 
  });

  // console.log("After", state)
  return appointmentsForDay
}