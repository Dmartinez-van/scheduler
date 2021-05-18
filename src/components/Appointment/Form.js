import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import DayListItem from "components/DayListItem";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.value || null);
  const [error, setError] = useState("");
  // ADD IN useRef to set focus to student name input upon no student name entered

  const reset = () => {
      setName("");
      setInterviewer(null);
  };

  const cancel = () => {
    props.onCancel();
    reset();
  };

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    // ********** To implement the below conditional, I need to figure out how to test a selection of an interviewer first ****** 
    // if (interviewer === null) {
    //   setError("Interviewer cannot be blank");
    //   return;
    // }
    setError("");
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left" data-testid="select-option" key={props.key} value={props.key}>
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid={"student-name-input"}
            /*
            This must be a controlled component
            */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={event => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
};
