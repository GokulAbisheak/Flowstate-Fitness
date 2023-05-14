import React, { useState, useEffect, useCallback } from 'react';
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

const UserCalendar = () => {

  // const loggedUser = useSelector((state) => state.user)

  // const[id, setID] =useState(loggedUser.email)
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [description, setDescription] = useState("");


  const handleFormSubmit = (event) => {
    event.preventDefault();
    // setTitle("");
    // setStartDate(selectInfo.startStr);
    // setEndDate(selectInfo.endStr);
    // setDescription("");
    const sessionData = {
      title: event.title,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      description: event.description,
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

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   if (name === "title") {
  //     setTitle(value);
  //   } else if (name === "start") {
  //     setStartDate(value);
  //   } else if (name === "end") {
  //     setEndDate(value);
  //   } else if (name === "description") {
  //     setDescription(value);
  //   }
  // };

  



  const deleteSession = (id) => {
    axios
    .delete(`http://localhost:8090/session/delete/${id}`)
    .then((data) => {
      if (data.status === 200) {
        setEvents((prevData) => {
          return prevData.filter((e) => e._id !== id);
        });
      }
    });
  };


  const getAllSessions = useCallback(() => {
    axios
      .get(`http://localhost:8090/session`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  useEffect(() => {
    getAllSessions();
  }, [getAllSessions]);

  // const classes = useStyles();

 console.log(events);
  return (

    <div>
      <form onSubmit={handleFormSubmit}>

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
          eventAllow={(dropInfo, draggedEvent) => {
            return draggedEvent ? true : false; // Allow event deletion if event is not being dragged
          }}
          eventClick={
            (clickInfo) => {
            if (confirm("Are you sure you want to delete this event?")) {
              clickInfo.event.remove();
              const id = clickInfo.event.extendedProps._id;
              deleteSession(id)
              // Call API to delete event from database
              axios.delete(`http://localhost:8090/session/delete/${id}`)
                .then(() => {
                  console.log("Event deleted successfully");
                  console.log(id)
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          }
        }
          const handleEventClick = {(args) => {
            const id = args.event.extendedProps._id;
            deleteSession(id)
          }}
          
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events}
          
        />

      </form>
    </div>

  );
}

export default UserCalendar;