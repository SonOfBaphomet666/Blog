// TODO: DON'T WORK, BECAUSE USE BOTH THE REACT AND PREACT INTEGRATION

import { useState } from "preact/hooks";

function Greeting({ messages }) {
  const randomMessage = () =>
    messages[Math.floor(Math.random() * messages.length)];
  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div className="greeting">
      <h3>{greeting}! Thank you for visiting!</h3>
      <button onClick={() => setGreeting(randomMessage())}>New Greeting</button>
    </div>
  );
}

export default Greeting;
