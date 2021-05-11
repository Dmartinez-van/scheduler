import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

  storiesOf("DayListItem", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Unselected", () => <DayListItem name="Monday" spots={4} />)
    .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
    .add("Full", () => <DayListItem name="Monday" spots={0} />)
    .add("Clickable", () => <DayListItem name="Friday" setDay={action("setDay")} spots={3} />)


    const days = [
      {
        id: 1,
        name: "Monday",
        spots: 2,
      },
      {
        id: 2,
        name: "Tuesday",
        spots: 0,
      },
      {
        id: 3,
        name: "Wednesday",
        spots: 1,
      },
      {
        id: 4,
        name: "Thursday",
        spots: 1,
      },
    ];
    
    storiesOf("DayList", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
      })
      .add("Monday", () => (
        <DayList days={days} day={"Monday"} setDay={action("setDay")} />
      ))
      .add("Tuesday", () => (
        <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
      ))
      .add("Wednesday", () => (
        <DayList days={days} day={"Wednesday"} setDay={action("setDay")} />
      ))
      .add("Thursday", () => (
        <DayList days={days} day={"Thursday"} setDay={action("setDay")} />
      ))