import React from "react";
import { prettyDate, addZones, average, format } from "../../funktioner";
import "./ActivityTable.css";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import RunMap from "../RunMap";

function ActivityTable({ activities }) {
  const [sort, setSort] = React.useState({
    keyToSort: "start_date",
    direction: "asc",
  });

  const [currentActivity, setActivity] = React.useState({
    activity: "",
    see: false,
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

  function handleRowClick(activity) {
    setActivity({ activity: activity, see: true });
  }

  function handleMapClick() {
    setActivity({ see: false });
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
    <div>
      {currentActivity.see == true ? (
        <div>
          <div onClick={() => handleMapClick()}>RETURN KNAP</div>
          <RunMap activity={currentActivity.activity}></RunMap>
        </div>
      ) : (
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
            {getSortedArray(activities).map((activity) => (
              <tr key={activity.id} onClick={() => handleRowClick(activity)}>
                {headers.map((header) => (
                  <td key={header.id}>
                    {" "}
                    {format(header.key, activity[header.key])}{" "}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivityTable;
