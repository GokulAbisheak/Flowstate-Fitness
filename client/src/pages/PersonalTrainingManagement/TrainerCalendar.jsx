import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const Calendar = () => {

  const [events, setEvents] = useState([]);

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter event title:');
    const description = prompt('Enter event description:');
    if (title) {
      const eventData = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        description,
      };
      axios.post('/api/events', eventData)
        .then(res => {
          setEvents([...events, res.data]);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleEventClick = (eventInfo) => {
    const title = prompt('Edit event title:', eventInfo.event.title);
    const description = prompt('Edit event description:', eventInfo.event.extendedProps.description);
    if (title) {
      const eventData = {
        ...eventInfo.event.extendedProps,
        title,
        description,
      };
      axios.put(`/api/events/${eventInfo.event.id}`, eventData)
        .then(res => {
          setEvents(events.map(event => (event.id === res.data.id ? res.data : event)));
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleEventRemove = (eventInfo) => {
    axios.delete(`/api/events/${eventInfo.event.id}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== eventInfo.event.id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleEventsFetch = (fetchInfo, successCallback) => {
    axios.get('/api/events')
      .then(res => {
        successCallback(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      events={events}
      dateClick={handleDateSelect}
      eventClick={handleEventClick}
      eventRemove={handleEventRemove}
      eventsFetch={handleEventsFetch}
    />
  );

}
export default Calendar;