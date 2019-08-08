import React from "react";
import { range } from "lodash";

const Habit = props => {
  const isChecked = day => {
    const month = new Date(Date.now()).getMonth() + 1;
    if (
      props.data.records[month] &&
      props.data.records[month][day]
    ) {
      return "box active";
    } else {
      return "box";
    }
  };

  return (
    <tr>
      <td className="title">{props.data.title}</td>
      {range(1, 31, 1).map(day => (
        <td
          key={day}
          className={isChecked(day)}
          onClick={() => props.createNewEntry(props.data.title, day)}
        />
      ))}
      <td>
        <button onClick={() => props.deleteHabit(props.data.title)}>
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default Habit;
