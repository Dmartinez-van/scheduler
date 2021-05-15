import React from 'react';
import "components/Appointment/styles.scss"
import useVisualMode from "hooks/useVisualMode"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT";
// const ERROR = "ERROR";


export default function Appointment(props) {
  
  let { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
  }

  function deleteBooking() {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY))
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? 
        <Show student={props.interview.student} interviewer={props.interview.interviewer} /> 
        : <Empty />} */}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show 
                                student={props.interview.student} 
                                interviewer={props.interview.interviewer} 
                                onDelete={confirmDelete}
                                onEdit={() => transition(EDIT)}
                          />}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={deleteBooking} onCancel={() => back()}/>}
        {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer} onCancel={() => back()} onSave={save} />}

    
    </article>
  )
};