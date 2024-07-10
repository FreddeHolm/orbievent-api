import React from 'react';

export default function Activity(props) {
  const item = props.item;
  const onClick = props.onClick;

  return (
    <div onClick={onClick} className="grid-item events2">
      <div className="full-content">
        <div className="icon">
          <p className="month">{new Date(item.startDate).toLocaleDateString([], { month: "short" })}</p>
          <p className="date">{new Date(item.startDate).getDate()}</p>
          <p className="year">{new Date(item.startDate).getFullYear()}</p>
        </div>
        <div className="text">
          <h4>{item.title}</h4>
          <div className="icons">
            <span>
              <i className="fas fa-clock"></i>
              {new Date(item.startDate).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })} kl:
              {new Date(item.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span><i className="fas fa-map-marker-alt"></i>{item.location.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}