// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import ChatTable from "./ChatTable";
// import { io } from "socket.io-client";
// import { useLocation } from "react-router-dom";

// const Chat = () => {
//   const { commonId } = useSelector((state) => state.commonIdReducer);

//   const [newMessage, setNewMessage] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   // const [currentChat, setCurrentChat] = useState(commonId?.members);

//   // const [socket, setSocket] = useState(null);
//   const socket = useRef();
//   const doctorSignin = useSelector((state) => state.doctorSignin);
//   const { doctorInfo } = doctorSignin;
//   const patientSignin = useSelector((state) => state.patientSignin);
//   const { patientInfo } = patientSignin;

//   const activeUser = localStorage.getItem("activeUser");

//   let activeUserId;

//   if (activeUser === "doctor") {
//     activeUserId = doctorInfo?.user?._id;
//   } else if (activeUser === "patient") {
//     activeUserId = patientInfo?.user?._id;
//   }

//   console.log("arrivalMessage", arrivalMessage);
//   console.log("commonId", commonId);
//   console.log("currentChat", commonId?.members);

//   const location = useLocation();
//   const { patId } = location.state || {};

//   // const socket = useRef();

//   useEffect(() => {
//     socket.current = io("http://localhost:5000/", {
//       transports: ["websocket"],
//     });
//   }, []);

//   useEffect(() => {
//     // const newSocket = io("http://localhost:5000/api/v1", {
//     //   transports: ["websocket"],
//     // });

//     socket.current.on("getMessage", (data) => {
//       console.log("current message is", data);

//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     socket.current.emit("addUser", activeUserId);

//     socket.current.on("getUsers", (users) => {
//       console.log("users are after reconnect ", users);
//       alert("connected");
//     });
//   }, [activeUserId]);

//   useEffect(() => {
//     arrivalMessage &&
//       commonId?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, commonId?.members]);

//   useEffect(() => {
//     socket.current.emit("addUser", activeUserId);
//     socket.current.on("getUsers", (users) => {
//       console.log("users are ", users);
//     });
//   }, [activeUserId]);

//   // useEffect(() => {
//   //   if (socket) {
//   //     console.log("socket is", socket);
//   //     socket.on("welcome", (message) => {
//   //       console.log("message", message);
//   //     });
//   //   } else {
//   //     console.log("not connected");
//   //   }
//   // }, [socket]);

//   // commonId
//   // doctorId == senderId
//   // text

//   // console.log("patientInfo", doctors);
//   console.log("commonId", commonId);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: activeUserId,
//       // sender: "65166eddf35f3ce650247698",
//       text: newMessage,
//       conversationId: commonId?._id,
//     };

//     const receiverId = commonId?.members.find(
//       (member) => member !== activeUserId
//     );

//     socket.current.emit("sendMessage", {
//       senderId: activeUserId,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/v1/chat/submit-message",
//         message
//       );
//       setMessages([...messages, res.data]);
//       // console.log("added", res);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/v1/chat/${commonId?._id}`
//         );
//         setMessages(res.data);
//         // setCurrentChat(res.data.members);

//         // console.log("res ", res);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [commonId]);

//   return (
//     <div className="flex justify-between">
//       <div>
//         {/* {activeUser === "doctor" ? (
//           <ChatTable
//           // doctor data
//           // senderId of patient
//           // recieverId - doctorId
//           />
//         ) : (
//           ""
//         )} */}
//         {activeUser === "patient" ? (
//           <ChatTable
//           // doctor data
//           // senderId of patient
//           // recieverId - doctorId
//           />
//         ) : (
//           ""
//         )}

//         {/* <ChatTable
//         // doctor data and patient data
//         // senderId
//         // recieverId
//         /> */}
//       </div>
//       <div>
//         chats
//         {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={`${
//               msg.sender === activeUserId ? "text-right" : "text-left"
//             } p-2`}
//           >
//             <p className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">
//               {msg.text}
//             </p>
//           </div>
//         ))}
//         <div className="mt-4">
//           <input
//             placeholder="write a message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             className="border border-gray-300 px-4 py-2 rounded-md"
//           />
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// // patientId == recieverIdimport { useEffect, useState, useCallback } from "react";

import React, { useEffect, useState, useCallback } from "react";
import Talk from "talkjs";
import { Session, Chatbox } from "@talkjs/react";
import { useLocation } from "react-router-dom";

function ChatComponent({ userData, close }) {
  const location = useLocation();
  const { userId, userName } = userData;

  const [talkSession, setTalkSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const initializeTalk = async () => {
      try {
        await Talk.ready;

        const activeUser = localStorage.getItem("activeUser");

        let senderData;
        if (activeUser === "doctor") {
          senderData = JSON.parse(localStorage.getItem("doctorInfo"));
        } else if (activeUser === "patient") {
          senderData = JSON.parse(localStorage.getItem("patientInfo"));
        }

        if (!senderData) {
          console.error("Sender details not found in localStorage");
          return;
        }

        const newUser = new Talk.User({
          id: senderData.user._id,
          name: senderData.user.name,
          welcomeMessage: "Hi!",
          role: "default",
        });

        setCurrentUser(newUser);

        const newTalkSession = new Talk.Session({
          appId: "tGrrfq7e",
          me: newUser,
        });

        setTalkSession(newTalkSession);
      } catch (error) {
        console.error("Talk.js initialization failed:", error);
      }
    };

    initializeTalk();
  }, []);

  const syncUser = useCallback(() => currentUser, [currentUser]);

  const syncConversation = useCallback(
    (session) => {
      const participantIds = [currentUser.id, userId].sort();
      const conversationId = `dynamic_conversation_${participantIds[0]}_${participantIds[1]}`;
      const conversation = session.getOrCreateConversation(conversationId);

      const otherUser = new Talk.User({
        id: userId,
        name: userName,
        welcomeMessage: "Hey, how can I help?",
        role: "default",
      });

      conversation.setParticipant(session.me);
      conversation.setParticipant(otherUser);

      return conversation;
    },
    [currentUser, userId, userName]
  );

  return (
    <div>
      {talkSession && currentUser && (
        <div>
          <Session appId="tGrrfq7e" syncUser={syncUser}>
            <Chatbox
              syncConversation={syncConversation}
              style={{
                position: "fixed",
                bottom: "100px",
                right: "16px",
                width: "370px",
                height: "500px",
              }}
            />
          </Session>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
