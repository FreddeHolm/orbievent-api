import React, { useState, useEffect, useRef } from 'react';
import { useRequest } from '../hooks/useRequest';
import Loading from '../components/Loading';
import Activity from './Activity';

export default function Activities() {
  const [activitiesData, activitiesIsPending, activitiesError, doActivitiesRequest] = useRequest(`/departments/activities`);

  useEffect(() => {
    console.log(Date.now());
    //const startOfJune2024 = 1715731200000; //old
    const startOfJune2024 = 1727765357589;
    doActivitiesRequest([`from=${startOfJune2024}`, 'interval=month']);
  }, []);

  if (activitiesIsPending) {
    return <Loading title="Fetching all activities, please wait..." />;
  }

  if (activitiesError) {
    return <div>Error: {activitiesError}</div>;
  }

  return (
    <div className="tagged-posts">
      <div className="grid-item-wrapper post-type-events2 col-3">
        {activitiesData.map(item => (
          <Activity key={item.activityKey} item={item} />
        ))}
      </div>
    </div>
  );
}