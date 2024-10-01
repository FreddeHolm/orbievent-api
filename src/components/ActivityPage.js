import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from '../hooks/useRequest';

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

const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate(); // No leading zero
  const month = d.getMonth(); // No leading zero, Months are zero-based, add 1
  const year = d.getFullYear();
  return `${day}${month}${year}`;
};

export default function ActivityPage() {
  const { slug } = useParams();
  const [activity, setActivity] = useState(null);
  const [hover, setHover] = useState(false);
  const [activitiesData, activitiesIsPending, activitiesError, doActivitiesRequest] = useRequest(`/departments/activities`);

  useEffect(() => {
    console.log(Date.now());
    //const startOfJune2024 = 1715731200000; //old
    const startOfJune2024 = 1727765357589;
    doActivitiesRequest([`from=${startOfJune2024}`, 'interval=month']);
  }, []);

  useEffect(() => {
    if (!activitiesData) return;

    console.log('Loaded activities:', activitiesData); // Log all activities

    const foundActivity = activitiesData.find((item) => {
      console.log(item.title);
      console.log("createSlug(item.title)" + createSlug(item.title));

      const itemSlug = `${createSlug(item.title)}-${formatDate(item.startDate)}`;
      console.log("itemSlug" + itemSlug);

      return itemSlug === slug;
    });

    setActivity(foundActivity);
  }, [activitiesData, slug]);

  if (activitiesIsPending) {
    return <div>Loading...</div>;
  }

  if (activitiesError) {
    return <div>Error: {activitiesError}</div>;
  }

  if (!activity) {
    return <div>Activity not found</div>;
  }

  return (
    <div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => window.history.back()}
        style={{ padding: '10px', backgroundColor: hover ? '#d2d4d4' : '#161d49', display: 'inline-block', borderRadius: '10vmin' }}
      >
        <h4 style={{ margin: '0', color: hover ? '#161d49' : 'white' }}>
          <i className='fas fa-angle-left'></i> Back
        </h4>
      </div>

      <h1 style={{ marginTop: '10px' }}>{activity.title}</h1>

      <div style={{ marginBottom: '10px', marginRight: '10px', padding: '10px', backgroundColor: '#d2d4d4', display: 'inline-block', borderRadius: '10vmin' }}>
        <h4 style={{ margin: '0', color: '#161d49' }}>
          {new Date(activity.startDate).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })} kl:
          {new Date(activity.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h4>
        -
        <h4 style={{ margin: '0', color: '#161d49' }}>
          {new Date(activity.endDate).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })} kl:
          {new Date(activity.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h4>
      </div>

      <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#d2d4d4', display: 'inline-block', borderRadius: '10vmin' }}>
        <h4 style={{ margin: '0', color: '#161d49' }}>{activity.location.label}</h4>
      </div>

      {activity.ticketData && (
        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#d2d4d4', display: 'inline-block', borderRadius: '10vmin' }}>
          <h4 style={{ margin: '0', color: '#161d49' }}>Tickets</h4>
          {activity.ticketData.map(ticket => (
            <div key={ticket.ticketTypeKey} style={{ marginBottom: '5px' }}>
              <p><strong>{ticket.ticketTypeName}</strong></p>
              <p>Price: {ticket.price / 100} {ticket.currency}</p>
            </div>
          ))}
        </div>
      )}

      <p>{activity.description}</p>

      <img src={activity.shortlivedCoverImageUrl} alt={activity.title} />
    </div>
  );
}