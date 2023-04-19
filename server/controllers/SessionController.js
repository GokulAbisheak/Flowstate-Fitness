import Session from '../models/Session.model.js';

const SessionController = {


//Add a session 
addSession: (req, res) => {
    const title = req.body.title;
    const date = req.body.date;
    const time = req.body.time;
    const description = req.body.description;
    const addedBy = req.body.addedBy;

    const newSession = new Session({
        title,
        date,
        time,
        description,
    });

    newSession.save()
    .then(()=> res.json('Session Added'))
    .catch(err => res.status(400).json('Error:' +err));
},

//Get all sessions
getAllSessions: (req, res) => {
    Review.find()
     .then(()=> res.json(Session))
     .catch(err => res.status(400).json('Error:' +err));
},

//Update a session
updateSessionById: (req, res) => {
    Session.findById(req.param.id)
     .then(session => {
     session.title = req.body.title;
     session.date = req.body.date
     session.time = req.body.time;
     session.description = req.body.description;
     session.addedBy = req.body.addedBy;

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