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
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("Inside Appointment component, props.interviewers", props.interviewers)
  console.log("Is it an array?", Array.isArray(props.interviewers))
  
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
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} />}
    
    </article>
  )
};