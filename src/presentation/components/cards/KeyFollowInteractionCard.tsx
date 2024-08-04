import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import FollowService from "../../../services/FollowService";
import UserService from "../../../services/UserService";
import { BaseAPIResponse, UserAPIResponse } from "../../../interfaces/apiResponsesInterfaces";

export default function KeyFollowInteractionCard() {
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(
    "follow"
  );
  const [userName1, setUserName1] = React.useState<string | "">("");
  const [userName2, setUserName2] = React.useState<string | "">("");
  const [operationResult, setOperationResult] = React.useState<string| null>(
    null
  );

  const followService = FollowService.getInstance();
  const userService = UserService.getInstance();

  const map = new Map();

  const handleOperation = async () => {
    const getUsersResult = await userService.getAllUsers();
    if((getUsersResult as BaseAPIResponse).status === 500) {
      setOperationResult("Internal server error");
      return;
    };
    const userList = (getUsersResult as UserAPIResponse).data.users;
    for(const user of userList) {
      if (!map.has(user.username)){
        map.set(user.username, user.id);
      }
    }

    const userId1 = map.get(userName1);
    const userId2 = map.get(userName2);

    if (!userId1) {
      setOperationResult("No user found with name " + userName1);
      return;
    }
    if (!userId2) {
      setOperationResult("No user found with name " + userName2);
      return;
    }

    const id1 = Number(userId1);
    const id2 = Number(userId2);

    let result;
    if (selectedMethod === "follow") {
      result = await followService.followUser(userId1, userId2);
      const code = (result as BaseAPIResponse).status;
      if (code === 400) {
        if (id1 === id2) {
          setOperationResult("A user cannot follow itself");
        } else {
          setOperationResult(`${userName1} is already following ${userName2}`);
        }
      } else if (code === 404) {
        setOperationResult("User not found");
      } else if (code === 500) {
        setOperationResult("Internal server error");
      } else {
        setOperationResult(`${userName1} is now following ${userName2}`);
      }
    } else if (selectedMethod === "unfollow") {
      result = await followService.unfollowUser(userId1, userId2);
      const code = (result as BaseAPIResponse).status;
      if (code === 400) {
        if (id1 === id2) {
          setOperationResult("A user cannot unfollow itself");
        } else {
          setOperationResult(`${userName1} is not following ${userName2}`);
        }
      } else if (code === 404) {
        setOperationResult("User not found");
      } else if (code === 500) {
        setOperationResult("Internal server error");
      } else {
        setOperationResult(`${userName1} stopped following ${userName2}`);
      }
    }

    return;
  };

  return (
    <div className="CardContainer">
      <h3>Follow Users</h3>
      <Row>
        <Col>
          <div>
            <label>
              <input
                type="radio"
                value="follow"
                checked={selectedMethod === "follow"}
                onChange={() => setSelectedMethod("follow")}
              />
              Follow
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="unfollow"
                checked={selectedMethod === "unfollow"}
                onChange={() => setSelectedMethod("unfollow")}
              />
              Unfollow
            </label>
          </div>
        </Col>
        <Col>
          <div>
            <input
              type="text"
              value={userName1}
              onChange={(e) =>
                setUserName1(e.target.value ? e.target.value : "")
              }
              placeholder="Enter User name 1"
            />
          </div>
          <div>
            <input
              type="text"
              value={userName2}
              onChange={(e) =>
                setUserName2(e.target.value ? e.target.value : "")
              }
              placeholder="Enter User name 2"
            />
          </div>
        </Col>
        <Col>
          <Button
            onClick={handleOperation}
            disabled={!selectedMethod || userName1 === "" || userName2 === ""}
            className="DashboardButton"
          >
            {selectedMethod
              ? `${
                  selectedMethod.charAt(0).toUpperCase() +
                  selectedMethod.slice(1)
                } User`
              : "Select an option"}
          </Button>
        </Col>
        <Col>{operationResult && <div>{operationResult}</div>}</Col>
      </Row>
      <Row>
        <p>Valid user names: Alfonso, Ivan, Alicia</p>
      </Row>
    </div>
  );
}
