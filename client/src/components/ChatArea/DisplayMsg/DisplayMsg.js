import React,{useRef, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import './DisplayMsg.css';

function DisplayMsg({ messages }) {

  const focusEffect = useRef(null)

  useEffect(()=>{
    if(focusEffect){
      focusEffect.current.addEventListener('DOMNodeInserted', event=>{
        const {currentTarget: target}= event;
        target.scroll({top: target.scrollHeight, behavior: 'smooth'})
      })
    }
  },[focusEffect])


   console.log(messages);
  return (
    <Container className='msgDisplay' ref ={focusEffect} >
      <div className='messages' >
        
        {messages.map((msg, i) => (
          <p key={i} ><span style={{color:'red'}}>{msg.userName}</span>: {msg.text}</p>
        ))}
      </div>
    </Container>
  );
}

export default DisplayMsg;
