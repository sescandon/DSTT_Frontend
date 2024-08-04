import Row from "react-bootstrap/Row";
import KeyFollowInteractionCard from "../components/cards/KeyFollowInteractionCard";
import KeyMessageInteractionCard from "../components/cards/KeyMessageInteractionCard";

export default function Dashboard() {
  return (
    <Row className="DashboardContentContainer">
      <h1>Dashboard</h1>
      <h5 className="LightedText">
        Here you can execute functions that were key part of the technical test.
      </h5>
      <KeyFollowInteractionCard />
      <KeyMessageInteractionCard />
    </Row>
  );
}
