import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ChatComponent from "../../chat/ChatComponent";
// import Chat from "../../chat/Chat";

const Doctors = () => {
  const patientProfileList = useSelector((state) => state.patientProfileList);
  const { loading, error, profile } = patientProfileList;

  const [selectedChatUser, setSelectedChatUser] = useState(false);
  const [selectedChatUserData, setSelectedChatUserData] = useState();

  let navigate = useNavigate();

  console.log("profile is", profile);

  const handlePatientChat = async (user) => {
    console.log("patdata is", user);

    const userData = {
      userId: user.doctorId,
      userName: user.name,
    };

    setSelectedChatUser(!selectedChatUser);
    setSelectedChatUserData(userData);

    // navigate(`/userrole/:roleid/dashboard/patient/mydata/chat/`, {
    //   state: { userData },
    // });

    // dispatch(getConversationId(usersData));
  };

  return (
    <div className="p-10">
      <h1 className="pb-5 ">My Doctors - </h1>

      {profile?.patient?.primaryTeamIds?.map((p, index) => (
        <div
          className="bg-red-400  p-2 w-fit mb-3"
          onClick={() => {
            handlePatientChat(p);
          }}
        >
          {p.name}
        </div>
      ))}
      {profile?.patient?.secondaryTeamIds?.map((p, index) => (
        <div
          className="bg-red-400 p-2 w-fit mb-3"
          onClick={() => {
            handlePatientChat(p);
          }}
        >
          {p.name}
        </div>
      ))}
      {selectedChatUser && <ChatComponent userData={selectedChatUserData} />}
    </div>
  );
};

export default Doctors;
