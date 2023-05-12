import moment from 'moment';
import Session from '../models/Session.model.js';
import logger from '../utilities/logger.js'
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
    await newSession.save();
    res.status(201).json(newSession);
    logger.info("Session create successful");
} catch (error) {
    res.status(400).json({ message: error.message });
    logger.error("Session create failed");
}
},

//get session
getAllSessions: async (_req, res) => {
    try {
      // get all sessions from database
      const sessions = await Session.find();
      console.log(sessions.length);
      res.status(200).json(sessions);
    } catch (error) {
      console.error(error);
      res.status(500).send('Unable to fetch sessions');
    }
    Session.remove()
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

deleteSessionById: (req, res) => {
  Session.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Session Deleted"))
    .catch((err) => res.status(400).json("Error:" + err));
},


// deleteSessionById: async (req, res) => {
//   try {
//       const session = await session.findOneAndDelete({id: req.params.id});
//       if (!session) {
//           logger.error("Attendance " + req.params.id + " not found");
//           return res.status(404).json({ message: 'Attendance not found' });
//       }
//       res.status(200).json({ message: 'Attendance deleted' });
//       logger.info("Attendance " + req.params.id + " deleted successfully");
//   } catch (error) {
//       res.status(400).json({ message: error.message });
//       logger.info("Attendance " + req.params.id + " deleted successfully");
//   }
// }
 }

export default SessionController;