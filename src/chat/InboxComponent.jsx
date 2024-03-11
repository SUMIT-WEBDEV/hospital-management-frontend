import Talk from "talkjs";
import { Session, Inbox } from "@talkjs/react";
import { useCallback, useEffect, useState } from "react";

function Chat() {
  const [talkSession, setTalkSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [inbox, setInbox] = useState(null);

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

        const newInbox = newTalkSession.createInbox({ selected: null });
        setInbox(newInbox);
      } catch (error) {
        console.error("Talk.js initialization failed:", error);
      }
    };

    initializeTalk();
  }, []);

  const syncUser = useCallback(() => currentUser, [currentUser]);

  return (
    <div className="flex justify-center items-center h-3/4 bg-gray-200">
      {talkSession && currentUser && inbox && (
        <Session appId="tGrrfq7e" syncUser={syncUser}>
          <Inbox
            inbox={inbox}
            style={{ width: "100%", height: "700px" }}
            className="border p-4 rounded shadow"
          />
        </Session>
      )}
    </div>
  );
}

export default Chat;
