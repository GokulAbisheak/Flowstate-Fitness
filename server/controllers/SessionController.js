import Session from '../models/Session.model.js';

const SessionController = {


//Add a session 
addSession: async (req, res) => {
  try {
    logger.info(req.body)
    const { title, start, end, description } = req.body;

    const newSession = new Session({
        title,
        start,
        end,
        description,
    });
    await attendance.save();
    res.status(201).json(newSession);
    logger.info("Session create successful");
} catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Session create failed");
}
},
// //Get all sessions
// getAllSessions: (req, res) => {
//     Session.find()
//      .then(()=> res.json(Session))
//      .catch(err => res.status(400).json('Error:' +err));
// },

getAllSessions: async (_req, res) => {
    try {
      // get all sessions from database
      const sessions = await Session.findAll();
      // return sessions array to client
      if (sessions.length === 0) {
        res.status(404).send('No sessions found');
      } else {
        res.status(200).json(sessions);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Unable to fetch sessions');
    }
  },

//Update a session
updateSessionById: (req, res) => {
    Session.findById(req.param.id)
     .then(session => {
     session.title = req.body.title;
     session.date = req.body.date
     session.time = req.body.time;
     session.description = req.body.description;

     session.save()
    .then(()=> res.json('Session Updated'))
    .catch(err => res.status(400).json('Error:' +err));
     })
     .catch(err => res.status(400).json('Error:' +err));
},

//Delete a session
deleteSessionById: (req, res) => {
    Session.findByIdAndDelete(req.param.id)
    .then(()=> res.json('Session Deleted'))
    .catch(err => res.status(400).json('Error:' +err));
},

}

export default SessionController;

// app.post('/events', async (req, res) => {
//     const { title, start, end, description } = req.body;
//     const event = new Event({ title, start, end, description });
//     await event.save();
//     res.json(event);
//   });
  
//   app.get('/events', async (req, res) => {
//     const events = await Event.find();
//     res.json(events);
//   });
  
//   app.put('/events/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, start, end, description } = req.body;
//     const event = await Event.findById(id);
//     event.title = title;
//     event.start = start;
//     event.end = end;
//     event.description = description;
//     await event.save();
//     res.json(event);
//   });
  
//   app.delete('/events/:id', async (req, res) => {
//     const { id } = req.params;
//     await Event.findByIdAndDelete(id);
//     res.json({ message: 'Event deleted' });
//   });

//   app.post('/events', async (req, res) => {
//     const { title, start, end, description } = req.body;
//     const event = new Event({ title, start, end, description });
//     await event.save();
//     res.json(event);
//   });
  
//   app.get('/events', async (req, res) => {
//     const events = await Event.find();
//     res.json(events);
//   });
  
//   app.put('/events/:id', async (req, res) => {
//     const { id } = req.params;
//     const { title, start, end, description } = req.body;
//     const event = await Event.findById(id);
//     event.title = title;
//     event.start = start;
//     event.end = end;
//     event.description = description;
//     await event.save();
//     res.json(event);
//   });
  
//   app.delete('/events/:id', async (req, res) => {
//     const { id } = req.params;
//     await Event.findByIdAndDelete(id);
//     res.json({ message: 'Event deleted' });
//   });