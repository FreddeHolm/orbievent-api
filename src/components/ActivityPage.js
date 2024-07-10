import React, { useState } from "react";

export default function ActivityPage(props) {
  const activity = props.activity;
  const back = props.backFunc;
  const [hover, setHover] = useState(false);

  return (
    <div>
      <div
        onMouseEnter={() => { setHover(true); }}
        onMouseLeave={() => { setHover(false); }}
        onClick={back}
        style={{ padding: "10px", backgroundColor: hover ? "#d2d4d4" : "#161d49", display: "inline-block", borderRadius: "10vmin" }}
      >
        <h4 style={{ margin: "0", color: hover ? "#161d49" : "white" }}>
          <i className='fas fa-angle-left'></i> Back
        </h4>
      </div>

      <h1 style={{ marginTop: "10px" }}>{activity.title}</h1>

      <div style={{ marginBottom: "10px", marginRight: "10px", padding: "10px", backgroundColor: "#d2d4d4", display: "inline-block", borderRadius: "10vmin" }}>
        <h4 style={{ margin: "0", color: "#161d49" }}>
          {new Date(activity.startDate).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })} kl:
          {new Date(activity.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h4>
      </div>

      <div style={{ marginBottom: "10px", padding: "10px", backgroundColor: "#d2d4d4", display: "inline-block", borderRadius: "10vmin" }}>
        <h4 style={{ margin: "0", color: "#161d49" }}>{activity.location.label}</h4>
      </div>

      <p>{activity.description}</p>
    </div>
  );
}