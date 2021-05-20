import React from 'react';
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const days = props.days.map(day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        selected={day.name === props.day}
        spots={day.spots} 
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
}

