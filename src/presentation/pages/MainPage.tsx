import { Button } from "react-bootstrap";
import { useCustomNavigate } from "../../services/hooks/useCustomNavigate";
import Row from "react-bootstrap/Row";

export default function MainPage() {
  const customNavigate = useCustomNavigate();

  return (
    <Row className="ContentContainer">
      <h1>Welcome to this solution for a technical interview test!</h1>
      <h5 className="LightedText">
        This is a simple Frontend implementation of a Twitter-Like social
        network, connected to a fully functional Backend.
      </h5>
      <p>
        Frontend: Vite, React, TypeScript, Bootstrap, React-Bootstrap,
        React-Router-Dom.
      </p>
      <p>
        Backend: ASP.NET Core Web API, EntityFrameworkCore, SQL Server, XUnit.
      </p>
      <p className="ImportantText">
        Developed and deployed by{" "}
        <a
          href="https://www.linkedin.com/in/sescandon23/"
          target="_blank"
          className="ImportantLink"
        >
          @sescandon
        </a>{" "}
        (Sebastián Escandón).
      </p>
      <Button
        variant="primary"
        className="MainButton"
        onClick={() => customNavigate("/dashboard")}
      >
        Go to dashboard
      </Button>
    </Row>
  );
}
