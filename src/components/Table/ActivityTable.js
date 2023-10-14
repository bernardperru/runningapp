import React from "react";
import { prettyDate, addZones, average } from "../../funktioner";
import "./ActivityTable.css";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

function ActivityTable({ activities }) {
  const [sort, setSort] = React.useState({
    keyToSort: "start_date",
    direction: "asc",
  });
  //expand activities with zones
  addZones(activities);
  console.log(activities);

  const headers = [
    {
      id: 1,
      key: "start_date",
      label: "Date",
    },
    {
      id: 2,
      key: "distance",
      label: "Distance",
    },
    {
      id: 3,
      key: "average_cadence",
      label: "Avg. Cadence",
    },
    {
      id: 4,
      key: "elapsed_time",
      label: "Time",
    },
    {
      id: 5,
      key: "average_heartrate",
      label: "Avg. Heartrate",
    },
    {
      id: 6,
      key: "zone",
      label: "Zone",
    },
  ];

  function handleHeaderClick(header) {
    setSort({
      keyToSort: header.key,
      direction:
        header.key === sort.keyToSort
          ? sort.direction === "asc"
            ? "desc"
            : "asc"
          : "desc",
    });
  }

  function getSortedArray() {
    if (sort.direction === "asc") {
      return activities.sort((a, b) =>
        a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1
      );
    }
    return activities.sort((a, b) =>
      a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1
    );
  }

  return (
    <table className="center">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} onClick={() => handleHeaderClick(header)}>
              <div className="header-container">
                <span>{header.label}</span>
                {sort.keyToSort === header.key &&
                  (sort.direction === "asc" ? (
                    <BsFillCaretUpFill />
                  ) : (
                    <BsFillCaretDownFill />
                  ))}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr>
            {headers.map((header) => (
              <td> {activity[header.key]} </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ActivityTable;
