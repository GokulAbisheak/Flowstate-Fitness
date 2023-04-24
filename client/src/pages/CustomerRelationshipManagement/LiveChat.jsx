import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
  },
  messageBox: {
    width: "100%",
    height: "calc(100vh - 200px)",
    overflowY: "auto",
    marginBottom: theme.spacing(2),
  },
}));

const Chat = ({ sender, receiver }) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:8090");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to socket");
    });
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      sender,
      receiver,
      message,
    });
    setMessage("");
  };

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item xs={12} className={classes.messageBox}>
        {messages.map((message, index) => (
          <div key={index}>
            {message.sender}: {message.message}
          </div>
        ))}
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSendMessage}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Chat;
