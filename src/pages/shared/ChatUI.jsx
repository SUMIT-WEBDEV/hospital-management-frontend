import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { listPatients } from "../../action/PatientAction";
import Profile from "../../Assets/user/profile-image.png";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import { auth, db } from "../../firebase";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);
  const [image, setImage] = useState('')
  const [sender, setSender] = useState([])
  const [reciever, setReciever] = useState([])
 

  
  const [input, setInput] = useState('');

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients } = patientList;

  const dispatch = useDispatch()


  useEffect(()=>{
      dispatch(listPatients())
  },[dispatch])

  const sendMessage = async (e) => {
    const {uid, displayName} = auth.currentUser
    e.preventDefault()
    if(user){
    if (input === '') {
        alert('Please enter a valid message')
        return
    }
    const {uid, displayName} = auth.currentUser
    await addDoc(collection(db, 'messages'), {
        text: input,
        name: displayName,
        uid,
        timestamp: serverTimestamp()
    })
    setInput('')
  }
  }


  useMemo(() =>{ 
    // if(user){
    //   const {photoURL} =auth.currentUser
    //   console.log(photoURL)
    //   setImage(photoURL)
    // }                   
    if(user){
    const {uid} = auth.currentUser

    const filterMessages=messages.filter((e)=>e.uid === uid )
    const filterMessage2s=messages.filter((e)=>e.uid != uid )

    // console.log(filterMessages,'flss')
    setSender(filterMessages)
    setReciever(filterMessage2s)
    // console.log(user)

  }
   } , [user,messages])

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    
    });
    return () => unsubscribe();
  }, []);
  // if(messages.length>0 ){
  //   console.log(messages,'mess')
  // }
  return (
    <>
      {/* <h1 classNameName="text-lg font-medium font-Quicksand">Chat Box App</h1> */}

      <div className="chat__Flexbox">
        <div className="chat__Block sm:flex-2">
          <div className="user-profile text-center">
            <div className="chat__Profilebox">
              <img src={Profile} alt="user" className="block" />
            </div>
            <div className="chat__Username">
              User Name
            </div>
          </div>

          <div className="menu mt-8">
            <a
              className="chat__Menubox"
              href="/"
            >
              <span className="chat__Span chat__Gap--1">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </span>
              Chat
            </a>
          </div>
        </div>
        <div className="flex-1 chat__Flex--Container">
          <div className="main-body chat__Flex--Box">
            <div className="chat__Flex--Row flex-2">
              <div className="flex-1">
                <span className="chat__Flex--Block-Inline_1">
                  <span className="chat__Flex--Block-Span_1">
                    <svg
                      className="chat__Flex--Block-Svg"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  </span>
                </span>
                <span className="chat__Flex--Block-Inline_2">
                  <span className="chat__Flex--Block-Span_2">
                    <svg
                      className="chat__Flex--Block-Svg"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </span>
                </span>
              </div>
              <div className="flex-1 text-right">
                <span className="inline-block text-gray-700">
                  Status:{" "}
                  <span className="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>{" "}
                  <b>Online</b>
                </span>
              </div>
            </div>

            <div className="main flex-1 flex flex-col">
              <div className="hidden lg:block heading flex-2">
                <h1 className="text-3xl text-gray-700 mb-4">Chat</h1>
              </div>

              <div className="flex-1 flex h-full">
                <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
                  <div className="search flex-2 pb-6 px-2">
                    <input
                      type="text"
                      className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
                      placeholder="Search"
                    />
                  </div>
                  {loading ? <LoadingBox></LoadingBox>:
                   error? <MessageBox>{error}</MessageBox>:
                    patients.data && patients.data.map((itm,i)=>(
                  <div key={itm._id} className="flex-1 h-full overflow-auto px-2">
                    <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                      <div className="flex-2">
                        <div className="w-12 h-12 relative">
                          <img
                            className="w-12 h-12 rounded-full mx-auto"
                            src={Profile}
                            alt="chat-user"
                          />
                          <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <div className="truncate w-32">
                          <span className="text-gray-800">{itm.name}</span>
                        </div>
                        <div>
                          <small className="text-gray-600">Yea, Sure!</small>
                        </div>
                      </div>
                      <div className="flex-2 text-right">
                        <div>
                          <small className="text-gray-500">15 April</small>
                        </div>
                        <div>
                          <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                            23
                          </small>
                        </div>
                      </div>
                    </div>


                    {/* <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                      <div className="flex-2">
                        <div className="w-12 h-12 relative">
                          <img
                            className="w-12 h-12 rounded-full mx-auto"
                            src={Profile}
                            alt="chat-user"
                          />
                          <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <div className="truncate w-32">
                          <span className="text-gray-800">Karp Bonolo</span>
                        </div>
                        <div>
                          <small className="text-gray-600">Yea, Sure!</small>
                        </div>
                      </div>
                      <div className="flex-2 text-right">
                        <div>
                          <small className="text-gray-500">15 April</small>
                        </div>
                        <div>
                          <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
                            10
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-l-4 border-red-500">
                      <div className="flex-2">
                        <div className="w-12 h-12 relative">
                          <img
                            className="w-12 h-12 rounded-full mx-auto"
                            src={Profile}
                            alt="chat-user"
                          />
                          <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <div className="truncate w-32">
                          <span className="text-gray-800">
                            Mercedes Yemelyan
                          </span>
                        </div>
                        <div>
                          <small className="text-gray-600">Yea, Sure!</small>
                        </div>
                      </div>
                      <div className="flex-2 text-right">
                        <div>
                          <small className="text-gray-500">15 April</small>
                        </div>
                      </div>
                    </div>
                    <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                      <div className="flex-2">
                        <div className="w-12 h-12 relative">
                          <img
                            className="w-12 h-12 rounded-full mx-auto"
                            src={Profile}
                            alt="chat-user"
                          />
                          <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <div className="truncate w-32">
                          <span className="text-gray-800">Cadi Kajetán</span>
                        </div>
                        <div>
                          <small className="text-gray-600">Yea, Sure!</small>
                        </div>
                      </div>
                      <div className="flex-2 text-right">
                        <div>
                          <small className="text-gray-500">15 April</small>
                        </div>
                      </div>
                    </div>
                    <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
                      <div className="flex-2">
                        <div className="w-12 h-12 relative">
                          <img
                            className="w-12 h-12 rounded-full mx-auto"
                            src={Profile}
                            alt="chat-user"
                          />
                          <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <div className="truncate w-32">
                          <span className="text-gray-800">Rina Samuel</span>
                        </div>
                        <div>
                          <small className="text-gray-600">Yea, Sure!</small>
                        </div>
                      </div>
                      <div className="flex-2 text-right">
                        <div>
                          <small className="text-gray-500">15 April</small>
                        </div>
                      </div>
                    </div> */}
                  </div>
                   ))}
                </div>
                <div className="chat-area flex-1 flex flex-col">
                  <div className="flex-3">
                    <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200">
                      Chatting with <b>User Name</b>
                    </h2>
                  </div>


                  <div className="messages flex-1 overflow-auto max-width">
                    {reciever.length>0 && reciever.map((msg)=>(
                        <div className="message mb-4 flex" key={msg.id}>
                        <div className="flex-2">
                          <div className="w-12 h-12 relative">
                            <img
                              className="w-12 h-12 rounded-full mx-auto"
                              src={Profile}
                              alt="chat-user"
                            />
                            <span className="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                          </div>
                        </div>
                        <div className="flex-1 px-2">
                          <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                            <span>
                               {msg.text}
                            </span>
                          </div>
                          <div className="pl-4">
                            <small className="text-gray-500">15 April</small>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {sender.length > 0 && sender.map((sen)=>(

                    <div className="message me mb-4 flex text-right">
                        <div className="flex-1 px-2">
                        <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                          <span>{sen.text}</span>
                        </div>
                        <div className="pr-4">
                          <small className="text-gray-500">15 April</small>
                        </div>
                      </div>
                      
                    </div>
                 ))}

                  
                  </div>


                  <div className="flex-2 pt-4 pb-10">
                  <form action="" onSubmit={sendMessage}>

                    <div className="write bg-white shadow flex rounded-lg">
                      <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
                        <span className="block text-center text-gray-400 hover:text-gray-800">
                          <svg
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                          >
                            <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="flex-1">
                        <textarea
                         value={input}
                         onChange={(e) => setInput(e.target.value)}
                      
                          name="message"
                          className="outline-hidden w-full block outline-none py-4 px-4 bg-transparent"
                          rows="1"
                          placeholder="Type a messagess..."
                          autoFocus
                          
                        ></textarea>
                      </div>

                      <div className="flex-2 w-32 p-2 flex content-center items-center">
                        <div className="flex-1 text-center">
                          <span className="text-gray-400 hover:text-gray-800">
                            <span className="inline-block align-text-bottom">
                              <svg
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                              >
                                <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                              </svg>
                            </span>
                          </span>
                        </div>
                        <div className="flex-1">
                          <button className="bg-blue-400 w-10 h-10 rounded-full inline-block" type="submit">
                            <span className="inline-block align-text-bottom">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                className="w-4 h-4 text-white"
                              >
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUI;
