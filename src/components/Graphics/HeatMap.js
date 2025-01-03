import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './HeatMap.css';

//Displays a grid over the course of the past year where filled in squares indicate
//dates that have associated entries and displays differing shades depending on scores
const HeatMap = ({userId, scoreType})=>{
    const [contributions, setContributions] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5002/api/get/${userId}`)
          .then(response => response.json())
          .then(data => {
            setContributions(data.map(item => ({
              date: item.dates,
              count: item[scoreType]
            })));
          });
          
      }, [userId, scoreType]);
      let startDate = new Date();
      let startYear = parseInt(startDate.getFullYear().toString().slice(0,4)) - 1;
      let startMonth = startDate.getMonth() + 1;
      let startDay = startDate.getDay();

      return (
        <div className="contribution-calendar">
          <CalendarHeatmap
            startDate={new Date(`${startYear}-${startMonth}-${startDay}`)}
            endDate={new Date()}
            values={contributions}
            classForValue={(value) => {
              if (!value) return 'color-empty';
              return `color-scale-${Math.min(value.count, 5)}`;
            }}
            tooltipDataAttrs={value => {
              return { 'data-tip': `${value.date}: ${value.count || 0} reflections` };
            }}
          />
        </div>
      );
}

export default HeatMap;