import { useState } from "react";
import "./App.css";
import RoutesApp from './routes/routes'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <nav>
        <div className="navlinks">
          <a href="#home">Home</a>
          <a href="#perfil">Perfil</a>
          <a href="#chat">Chat</a>
        </div>
      </nav>
      <main>
        <RoutesApp/>
      </main>
      <footer className="footer">
        <p>
          Desenvolvido por <strong>abreujay</strong>
        </p>
      </footer>
    </>
  );
}

export default App;
