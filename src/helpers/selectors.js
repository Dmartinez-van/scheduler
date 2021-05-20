const getAppointmentsForDay = function(state, day) {
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

  return appointmentsForDay
}

const getInterview = function(state, interview) {
  if(!interview) {
    return null
  }

  const interviewObject = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return interviewObject
}

const getInterviewersForDay = function(state, day) {
  if (!state.days.length) {
    return [];
  }

  // Grab array from state.days, filter by our day parameter (returns one array of one element)
  const filteredDays = state.days.filter(days => day === days.name);

  if (!filteredDays.length) {
    return [];
  }

  // Find matching interviewers information in filteredDays in state.interviewers and return that array
  const interviewersForDay = filteredDays[0].interviewers.map((interviewerId) => {
    return state.interviewers[interviewerId] 
  });

  return interviewersForDay
}

export {getAppointmentsForDay, getInterview, getInterviewersForDay}