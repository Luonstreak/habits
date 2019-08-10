import React from "react";
import { range } from "lodash";

const Habit = props => {
  var count = 0;

  const isChecked = day => {
    const month = new Date(Date.now()).getMonth() + 1;
    if (props.data[month] && props.data[month][day]) {
      count++
      return "box active";
    } else {
      return "box";
    }
  };

  return (
    <tr>
      <td className="title">{props.title}</td>
      {range(1, 31, 1).map(day => (
        <td
          key={day}
          className={isChecked(day)}
          onClick={() => props.createNewEntry(props.title, day)}
        />
      ))}
      <td>{count}</td>
      <td>
        <button onClick={() => props.deleteHabit(props.title)}>DELETE</button>
      </td>
    </tr>
  );
};

export default Habit;
