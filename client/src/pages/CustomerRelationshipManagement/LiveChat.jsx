import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    maxHeight: "70vh",
    overflowY: "scroll",
    padding: "10px",
    border: "1px solid gray",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "5px",
    border: "1px solid lightgray",
    borderRadius: "5px",
    marginBottom: "5px",
    maxWidth: "60%",
    backgroundColor: "white",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    marginBottom: "10px",
  },
});

const Chat = () => {
  const { sender, receiver } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const classes = useStyles();

  useEffect(() => {
    // Fetch messages from the server here using `fetch` or some other HTTP library
    // and update the `messages` state with the response data.
  }, [sender, receiver]);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      return;
    }
    // Send the message to the server using `fetch` or some other HTTP library.
    // Once the message is successfully sent, update the `messages` state with the
    // new message.
    setMessage("");
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Chat with FLOWSTATE{receiver}
      </Typography>
      <div className={classes.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={classes.message}>
            <Typography variant="subtitle2" className={classes.sender}>
              {msg.sender}
            </Typography>
            <Typography variant="body1">{msg.message}</Typography>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Type your message"
          variant="outlined"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={classes.textField}
        />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;

// Chat.js (frontend)

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import axios from "axios";

// const useStyles = makeStyles({
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100vh",
//   },
//   messagesContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     maxHeight: "70vh",
//     overflowY: "scroll",
//     padding: "10px",
//     border: "1px solid gray",
//     borderRadius: "5px",
//     marginBottom: "10px",
//   },
//   message: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     marginBottom: "10px",
//   },
//   sender: {
//     backgroundColor: "#3f51b5",
//     color: "white",
//     padding: "10px",
//     borderRadius: "10px",
//     alignSelf: "flex-end",
//   },
//   receiver: {
//     backgroundColor: "#f5f5f5",
//     padding: "10px",
//     borderRadius: "10px",
//     alignSelf: "flex-start",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   input: {
//     marginBottom: "10px",
//   },
// });

// const Chat = () => {
//   const classes = useStyles();
//   const { senderId, receiverId } = useParams();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleSendMessage = async () => {
//     try {
//       const response = await axios.post("/api/chats", {
//         sender: senderId,
//         receiver: receiverId,
//         message: message,
//       });
//       setMessage("");
//       console.log(response.data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const response = await axios.get(`/api/chats/${senderId}/${receiverId}`);
//         setMessages(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getMessages();
//   }, [senderId, receiverId]);

//   return (
//     <div className={classes.container}>
//       <Typography variant="h4">Chat with User {receiverId}</Typography>
//       <div className={classes.messagesContainer}>
//         {messages.map((message) => (
//           <div key={message._id} className={`${classes.message} ${message.sender._id === senderId ? classes.sender : classes.receiver}`}>
//             <Typography variant="subtitle2">{message.sender.username}</Typography>
//             <Typography variant="body1">{message.message}</Typography>
//           </div>
//         ))}
//       </div>
//       <form className={classes.form}>
//         <TextField className={classes.input} label="Message" variant="outlined" value={message} onChange={handleMessageChange} />
//         <Button variant="contained" color="primary" onClick={handleSendMessage}>
//           Send
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Chat;

