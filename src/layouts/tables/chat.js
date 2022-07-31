// import ReactDOM from "react-dom";
import ChatBubble from "./ChatBubble";
// import store from "../../store"
import React, { useState, useEffect } from 'react';
import axios from "axios";



const adminImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZhNRDiy_4OCcPy_4ujFxO-pqK461OGjdfw&usqp=CAU';//'http://localhost:2400/public/adminImage';
const usserImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBZ_iwxqFhk3OdsNYldu0AZDwOKNs7W7t6UYaQ_aSTrryAPEYLDT4IXcAROCfi0DZp_MA&usqp=CAU';//'http://localhost:2400/public/usserImage';
const isAdmin = false;//store.getState().user.isAdmin : 
const myImage = isAdmin ? adminImage : usserImage;
const otherImage = isAdmin ? usserImage : adminImage;

// const image = 'https://www.rollingstone.com/wp-content/uploads/2021/08/domestic_1_stills_for_print_39.jpg?resize=1800,1200&w=450';


function Chat() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.post(`http://localhost:2400/message/getMessages`, { userId: '62de61c3c6017e950dad7b9e' }, { withCredentials: true })
      .then(res => res.data.msg)
      .then((res) => {
        console.log(res)
        setMessages(res.map(x => ({
          type: x.idTypeIsSender ? 0 : 1,
          image: x.idTypeIsSender ? myImage : otherImage,
          text: x.text
        })
        ))
      });
  }, []);

  const handleNewMessage = text => {
    setMessages(
      messages.concat([{
        text,
        type: 0,
        image: myImage,
      }])
    );
    axios.post("http://localhost:2400/message/postMessage",{userId:'62de61c3c6017e950dad7b9e', text, idTypeIsSender:true}, { withCredentials: true });
  }
  return (
    <ChatBubble
      messages={messages}
      onNewMessage={handleNewMessage}
    />
  );
}

export default Chat;