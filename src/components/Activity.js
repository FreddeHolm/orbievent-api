import React from 'react';
import { Link } from 'react-router-dom';

export default function Activity(props) {
  const item = props.item;
  const onClick = props.onClick;


  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/ö/g, 'o')
      .replace(/å/g, 'a')
      .replace(/ä/g, 'a')
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .replace(/^-|-$/g, ''); // Remove leading and trailing hyphens
  };

  const itemSlug = createSlug(item.title);
  //const dateString = `${new Date(item.startDate).getDate()}-${new Date(item.startDate).getMonth([], { month: "short" })}-${new Date(item.startDate).getFullYear()}`;
  const dateString = `-${new Date(item.startDate).getDate()}${new Date(item.startDate).getMonth()}${new Date(item.startDate).getFullYear()}`;

  const fullLink = itemSlug + dateString;


  return (
    <div className="grid-item events2">
          <Link to={`/activity/${fullLink}`}>

      <div className="full-content">
        <div className="icon">
          <p className="month">{new Date(item.startDate).toLocaleDateString([], { month: "short" })}</p>
          <p className="date">{new Date(item.startDate).getDate()}</p>
          <p className="year">{new Date(item.startDate).getFullYear()}</p>
        </div>
        <div className="text">
          <h4>{item.title}</h4>
          
            <h5>{fullLink}</h5>
          <div className="icons">
            <span>
              <i className="fas fa-clock"></i>
              {new Date(item.startDate).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })} kl:
              {new Date(item.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span>
              <i className="fas fa-clock"></i>
              {new Date(item.endDate).toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })} kl:
              {new Date(item.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span><i className="fas fa-map-marker-alt"></i>{item.location.label}</span>
          </div>
        </div>
      </div>
      </Link>
    </div>
    
  );
}