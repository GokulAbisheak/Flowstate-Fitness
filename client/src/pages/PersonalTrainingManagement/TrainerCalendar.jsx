import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const Calendar = () => {

  const [sessions, setSessions] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Enter session title:');
    const description = prompt('Enter session description:');
    if (title) {
      const sessionData = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        description,
      };
      axios.post('http://localhost:8090/session/add', sessionData).then(() => {
        alert('Successfull!');
            setTitle(res.data.title);
            setStartDate(res.data.start);
            setEndDate(res.data.end);
            setDescription(res.data.description);
      }

      )
        .then(res => {
          setSessions([...sessions, res.data]);
        })
        .catch(err => {
          console.error(err);
          alert('Unable to add session' + err);
        });
    }
  };

  const handleEventClick = (eventInfo) => {
    const title = prompt('Edit event title:', eventInfo.event.title);
    const description = prompt('Edit event description:', eventInfo.event.extendedProps.description);
    if (title) {
      const sessionData = {
        ...sessionInfo.session.extendedProps,
        title,
        description,
      };
      axios.put(`http://localhost:8090/session/update/${sessionInfo.session.id}`, eventData)
        .then(res => {
          setEvents(events.map(event => (event.id === res.data.id ? res.data : event)));
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const handleEventRemove = (eventInfo) => {
    axios.delete(`http://localhost:8090/session/delete/${sessionInfo.session.id}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== eventInfo.event.id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleEventsFetch = (fetchInfo, successCallback) => {
    axios.get(`http://localhost:8090/session/${sessionInfo.session.id})`)
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