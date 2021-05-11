import React from "react";
import "components/DayListItem.scss";

const classNames = require("classnames");

export default function DayListItem(props) {

  const formatSpots = () => {
    return props.spots ? 
      (props.spots > 1 ? `${props.spots} spots remaining` : `${props.spots} spot remaining`) 
      : "no spots remaining";
  }

  let dayListItemClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const {name, spots, setDay} = props;

  return (
    <li onClick={() => setDay(props.name)} className={dayListItemClass} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}