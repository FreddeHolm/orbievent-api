import React, { useState, useEffect } from 'react';
import Activity from './Activity';
import Loading from '../Loading';

export default function ActivitiesMiniPreview() {
  const [json, setJson] = useState("");
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const headers = {
      'x-api-key': 'efe04a0c-77dd-4d8e-8ce2-3107b1e64c8d',
      'Content-Type': 'application/json'
    };
    const dateParam = "?from=" + Date.now();
    const intervalParam = "&interval=month";

    fetch("https://apis.orbiapp.io/v1/departments/activities" + dateParam + intervalParam, { headers })
      .then(res => res.json())
      .then(json => {
        setLoaded(true);
        setJson(json);
      });
  }, []);

  if (isLoaded) {
    return (
      <div className="tagged-posts">
        <div className="grid-item-wrapper post-type-events2 col-2">
          {json.slice(0, json.length >= 4 ? 4 : json.length).map(item => (
            <Activity key={item.activityKey} item={item} />
          ))}
        </div>
      </div>
    );
  } else {
    return <Loading title="Fetching all activities, please wait..." />;
  }
}