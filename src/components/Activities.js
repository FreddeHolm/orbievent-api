import React, { useState, useEffect, useRef } from 'react';
import { useRequest } from '../hooks/useRequest';
import Loading from '../components/Loading';
import Activity from './Activity';
import ActivityPage from './ActivityPage';
//all activities + parameters



export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [savedIntro, setSavedIntro] = useState(null);
  const [locations, setLocations] = useState(null);
  const [filters, setFilters] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const [includedLocations, setIncludedLocations] = useState([]);
  const [includedFilters, setIncludedFilters] = useState([]);

  const [activitiesData, activitiesIsPending, activitiesError, doActivitiesRequest] = useRequest(`/departments/activities`);

  const parentRef = useRef();

  useEffect(() => { 
    const startOfJune2024 = 1715731200000; //parameters //1717200000000 = första juni
    doActivitiesRequest([`from=${startOfJune2024}`, 'interval=month']); // doActivitiesRequest([`from=${startOfJune2024}`, 'interval=week']); //parameters //https://apis.orbiapp.io/docs/#/default/get_departments_activities
  }, []);

  useEffect(() => {
    if (activitiesData == null) return;

    let l_locations = [];
    let l_filters = new Set([]);

    activitiesData.map(item => {
      const location = item.location.label.toLowerCase();
      const filters = item.description.match(/( \#[a-zA-ZåäöÅÄÖ]+)/g);

      if (filters != null) filters.forEach(item => l_filters.add(item.substring(2)));

      if (!l_locations.includes(location)) {
        l_locations.push(location);
      }
    });

    setLocations(l_locations);
    setFilters(Array.from(l_filters));
  }, [activitiesData]);

  if (activitiesIsPending) {
    return <Loading title="Fetching all activities, please wait..." />;
  }

  if (activitiesError) {
    return <div>Error: {activitiesError}</div>;
  }

  if (selectedActivity) {
    return <ActivityPage activity={selectedActivity} backFunc={() => setSelectedActivity(null)} />;
  }

  const onChange = (filter) => {
    if (includedFilters.includes(filter)) {
      setIncludedFilters(current => current.filter(_filter => _filter !== filter));
    } else {
      setIncludedFilters([...includedFilters, filter]);
    }
  };

  return (
    <div>
      <div className='orbi-filter'>
        <div className='orbi-filter-header' onClick={() => setShowFilter(!showFilter)}>
          <h4>Filter</h4>
          <i className={showFilter ? "fa fa-chevron-up" : "fa fa-chevron-down"} aria-hidden="true"></i>
        </div>

        {filters &&
          <div className='location-filter' ref={parentRef} style={{ height: showFilter ? parentRef.current.scrollHeight + "px" : "0px" }}>
            {filters.map(filter => (
              <div key={filter} className='filter-container'>
                <label>{filter.toUpperCase()}
                  <input type="checkbox" checked={includedFilters.includes(filter)} onChange={() => onChange(filter)} />
                  <span className="checkmark"></span>
                </label>
              </div>
            ))}
          </div>
        }
      </div>

      <div className="tagged-posts">
        <div className="grid-item-wrapper post-type-events2 col-3">
          {activitiesData.filter(activity => {
            const matches = activity.description.match(/( \#[a-zA-ZåäöÅÄÖ]+)/g);

            if (matches != null) {
              for (let i = 0; i < matches.length; i++) {
                if (includedFilters.includes(matches[i].substring(2))) return true;
              }
            }

            return includedFilters.length === 0;
          }).map(item => (
            <Activity key={item.activityKey} item={item} onClick={() => setSelectedActivity(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}