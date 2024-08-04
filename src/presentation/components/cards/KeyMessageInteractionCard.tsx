import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import MessageService from "../../../services/MessageService";
import UserService from "../../../services/UserService";
import { BaseAPIResponse, MessageIdAPIResponse, MessageAPIResponse, MessagesAPIResponse, UserAPIResponse  } from "../../../interfaces/apiResponsesInterfaces";

export default function KeyMessageInteractionCard() {
  const [selectedUser, setSelectedUser] = React.useState<string | null>(
    "Alfonso"
  );
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(
    "Post"
  );
  const [messageContent, setMessageContent] = React.useState<string | "">("");
  const [operationResult, setOperationResult] = React.useState<any | null>(
    null
  );

  const messageService = MessageService.getInstance();
  const userService = UserService.getInstance();

  const map = new Map();

  function getHourFromTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return formattedTime;
  }

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
        map.set(user.id, user.username);
      }
    }

    if (!selectedUser) {
      setOperationResult("No user selected");
      return;
    }

    const selectedUserId = map.get(selectedUser);
    switch (selectedMethod) {
      case "Post":
        const resultPost = await messageService.createMessage(
          selectedUserId,
          messageContent
        );
        if ((resultPost as BaseAPIResponse).status === 200) {
          const messageId = (resultPost as MessageIdAPIResponse).data.messageID;
          const resultGet = await messageService.getMessage(messageId);
          const messageContent = (resultGet as MessageAPIResponse ).data.message.content;
          var messageDate = (resultGet as MessageAPIResponse).data.message.createdDate;
          messageDate = getHourFromTimestamp(messageDate);
          setOperationResult(
            `${selectedUser} posted: "${messageContent}" @ ${messageDate}`
          );
        } else {
          setOperationResult("Error creating message");
        }
        break;
      case "GetTimeline":
        const resultTimeline = await messageService.getTimelineMessages(
          selectedUserId
        );
        if ((resultTimeline as BaseAPIResponse).status === 200) {
          const messages = (resultTimeline as MessagesAPIResponse).data.messages;
          if (messages.length === 0) {
            setOperationResult("No messages found");
          } else {
            var messagesOnString = "";
            for (const message of messages) {
              const messageContent = message.content;
              var messageDate = message.createdDate;
              messageDate = getHourFromTimestamp(messageDate);
              messagesOnString += `"${messageContent}" @${selectedUser} @${messageDate}\n`;
            }
            setOperationResult(messagesOnString);
          }
        } else {
          setOperationResult("Error fetching timeline messages");
        }
        break;
      case "GetDashboard":
        const resultDashboard = await messageService.getDashboardMessages(
          selectedUserId
        );

        if ((resultDashboard as BaseAPIResponse).status === 200) {
          const messages = (resultDashboard as MessagesAPIResponse).data.messages;
          if (messages.length === 0) {
            setOperationResult("No messages found");
          } else {
            var messagesOnString = "";
            for (const message of messages) {
              const messageContent = message.content;
              var messageDate = message.createdDate;
              messageDate = getHourFromTimestamp(messageDate);
              messagesOnString += `"${messageContent}" @${selectedUser} @${messageDate}\n`;
            }
            setOperationResult(messagesOnString);
          }
        } else {
          setOperationResult("Error fetching timeline messages");
        }
        break;
      default:
        setOperationResult("No method selected");
        break;
    }

    setMessageContent("");
    return;
  };

  return (
    <div className="CardContainer">
      <h3>Messages</h3>
      <Row>
        <Col>
          <div>
            <label>
              <input
                type="radio"
                value="Alfonso"
                checked={selectedUser === "Alfonso"}
                onChange={() => setSelectedUser("Alfonso")}
              />
              Alfonso
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Ivan"
                checked={selectedUser === "Ivan"}
                onChange={() => setSelectedUser("Ivan")}
              />
              Ivan
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Alicia"
                checked={selectedUser === "Alicia"}
                onChange={() => setSelectedUser("Alicia")}
              />
              Alicia
            </label>
          </div>
        </Col>
        <Col>
          <div>
            <label>
              <input
                type="radio"
                value="Post"
                checked={selectedMethod === "Post"}
                onChange={() => setSelectedMethod("Post")}
              />
              Post
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="GetTimeline"
                checked={selectedMethod === "GetTimeline"}
                onChange={() => setSelectedMethod("GetTimeline")}
              />
              GetTimeline
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="GetDashboard"
                checked={selectedMethod === "GetDashboard"}
                onChange={() => setSelectedMethod("GetDashboard")}
              />
              GetDashboard
            </label>
          </div>
        </Col>
        <Col>
          {selectedMethod === "Post" && (
            <div>
              <input
                type="text"
                value={messageContent}
                onChange={(e) =>
                  setMessageContent(e.target.value ? e.target.value : "")
                }
                placeholder="Enter message content"
              />
            </div>
          )}
        </Col>
        <Col>
          <Button
            onClick={handleOperation}
            disabled={selectedMethod === "Post" && messageContent === ""}
            className="DashboardButton"
          >
            {selectedMethod
              ? `${
                  selectedMethod.charAt(0).toUpperCase() +
                  selectedMethod.slice(1)
                }`
              : "Select an option"}
          </Button>
        </Col>
        <Col>
          {operationResult && (
            <div>
              {operationResult.split("\n").map((line:number, index:number) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
