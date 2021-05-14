import React from 'react';
import "components/Appointment/styles.scss"
import useVisualMode from "hooks/useVisualMode"
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
// const CONFIRM = "CONFIRM";
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
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
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
                          />}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
    
    </article>
  )
};