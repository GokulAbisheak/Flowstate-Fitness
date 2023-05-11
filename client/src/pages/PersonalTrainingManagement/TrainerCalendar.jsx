import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Grid } from '@mui/material';
//import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';

const Calendar = () => {

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  // const addSession = (selectInfo) => {
  //   setTitle("");
  //   setStartDate(selectInfo.startStr);
  //   setEnd(selectInfo.endStr);
  //   setDescription("");
  // };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // setTitle("");
    // setStartDate(selectInfo.startStr);
    // setEndDate(selectInfo.endStr);
    // setDescription("");
    const sessionData = {
      title,
      start,
      end,
      description,
    };
    axios.post('http://localhost:8090/session/add', sessionData)
      .then(res => {
        setEvents([...events, res.data]);
        alert('Session added');
      })
      .catch(err => {
        console.error(err);
        alert('Unable to add session' + err);
      });
    setTitle("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "start") {
      setStartDate(value);
    } else if (name === "end") {
      setEndDate(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  // const updateSessionById = (eventInfo) => {
  //   const title = prompt('Edit session title:', eventInfo.event.title);
  //   const description = prompt('Edit session description:', eventInfo.event.extendedProps.description);
  //   if (title) {
  //     const eventData = {
  //       ...eventInfo.event.extendedProps,
  //       title,
  //       description,
  //     };
  //     axios.patch(`http://localhost:8090/session/update/${eventInfo.event.id}`, eventData)
  //       .then(res => {
  //         setEvents(events.map(event => (event.id === res.data.id ? res.data : event)));
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   }
  // };

  // const deleteSessionById = (eventInfo) => {
  //   axios.delete(`http://localhost:8090/session/delete/${sessionInfo.session.id}`)
  //     .then(() => {
  //       setEvents(events.filter(event => event.id !== eventInfo.event.id));
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };

  const getAllSessions = (fetchInfo, successCallback) => {
    axios.get(`http://localhost:8090/session/${fetchInfo.event.id})`)
      .then(res => {
        successCallback(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // const classes = useStyles();

  return (

    <div>
      <form onSubmit={handleFormSubmit}>
        {/* <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <br />
        <label>
          Start Date:
          <input type="datetime-local" value={start} onChange={e => setStartDate(e.target.value)} required />
        </label>
        <br />
        <label>
          End Date:
          <input type="datetime-local" value={end} onChange={e => setEndDate(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </label>
        <br /> */}

        <Grid 
          container spacing={1}
          display="flex" alignItems="center" justifyContent="space-between"   direction={"row"}
        >

          <Button size="small" color="primary" variant='contained' href="/admin/addSession" style={{marginBottom:'10px', marginLeft:'10px'}}>Add Session</Button>

          <Button size="small" color="primary" variant='contained' href="/admin/addAttendance" style={{marginBottom:'10px'}}> Attendance</Button>

        </Grid>



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
          // eventClick={updateSessionById}
          // eventRemove={deleteSessionById}
          eventsFetch={getAllSessions}
          eventAdd={handleInputChange}
        />

      </form>
    </div>

  );
}

export default Calendar;



