



//  function App() {

//   const ws =  new WebSocket('ws://localhost:8080');

//   console.log(ws,'hhhh');
  
//    ws.onopen = () => {
//       console.log('Connected to server');
     
//   };

//   ws.onmessage = (event) => {
//       console.log(`Message from server: ${event.data}`);
//       const messageDisplay = document.getElementById('message-display');
//       const messageElement = document.createElement('div')
//        messageElement.textContent = event.data
//        messageDisplay.appendChild(messageElement)
      
//   };

//   ws.onclose = () => {
//       console.log('Disconnected from server');
//   };
//   console.log(ws);
  

//   function sendMessage() {
    
//       if (ws.readyState === WebSocket.OPEN) {
//           ws.send('Hello, server! THis message is from client');
//       } else {
//           console.log('WebSocket is not open');
//       }
//   }

//   return (
//     <>
//      <h1>WebSocket Client</h1> 
//      <button onClick={sendMessage}>Send Message</button>
     
//      <h1>Received Messages</h1>
//      <div id="message-display"></div>
//     </>
//   )
// }

// export default App



import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        // Create a new WebSocket connection
        
        
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to server');
            ws.send('Hello, server! This is from client');
        };

        ws.onmessage = (event) => {
            console.log(`Message from server: ${event.data}`);
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        ws.onclose = () => {
            console.log('Disconnected from server');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(ws);
        // Clean up the WebSocket connection when the component unmounts
        // Clean up the WebSocket connection when the component unmounts
        return () => {
          if (ws.readyState === WebSocket.OPEN) {
              ws.close();
          }
      };
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send('Hello, this is Dilshad');
        } else {
            console.log('WebSocket is not open');
        }
    };

    return (
        <div>
            <button onClick={sendMessage}>Send Message</button>
            <h1>Received Messages</h1>
            <div id="message-display">
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        </div>
    );
};

export default App;