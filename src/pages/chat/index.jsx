import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router";
import "./index.css";
import CreateSocket from "@/utils/socket";
import { useSelector } from "react-redux";
import { RETRIEVE_CHAT } from "../../utils/constants";
import fetchData from "../../utils/fetchData";
import { createObjectWithTimeStamp } from "@/utils/helperFunction";
import { sortedData } from "../../utils/helperFunction";


export default function ChatBox() {
    const targetParams= useParams();
    const targetObj = targetParams?.targetId;
    const sessionData = sessionStorage.getItem("currentLoggedInUser");
    const chattingPerson = sessionStorage.getItem("chattingInfo");
    const chattingInfo = JSON.parse(chattingPerson);
    const currentLoggedInUser = JSON.parse(sessionData);
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    const fetchChat = async () => {
        const findTargetID = targetObj.replace(currentLoggedInUser.id, "").replace("_", "");
        const newURL = RETRIEVE_CHAT.replace(":targetId", findTargetID)
        const fetcher = await fetchData(newURL);
        let newArr = fetcher?.data?.chatMessage?.map(item => {
            let obj = {
                text: item.message,
                userInfo: `${item.fromUserId.firstName} ${item.fromUserId.lastName}`,
                id: new Date(item.updatedAt).getTime(),
                userId: item.fromUserId._id
            }
            return obj;
        });
        // const createObjectWithTimeStamp = newArr.reduce((acc,curr) => {
        //     const currentDay = new Date(curr.id).toLocaleDateString();
        //     if(!acc[currentDay]) {
        //         acc[currentDay] = []
        //     }
        //     acc[currentDay].push(curr);
        //     return acc;

        // },{});
        const createObj = createObjectWithTimeStamp(newArr);
        setMessages(createObj);
        console.log(createObj);

    }
    fetchChat();
  }, [])
  useEffect(() => {
    const socket = CreateSocket();
    if(targetObj) {
        socket?.emit("joinChat", {targetObj });
    }
    socket?.on("updatedMessage", ({userInfo, text, id, fromUserId, messages }) => {
        const newMessage = {
            id: id,
            text: text,
            userInfo: userInfo,
            userId: fromUserId
            };
        // const createObj = updateObjectWithTimeStamp(messages, newMessage);
        let updatedMessage = JSON.parse(JSON.stringify(messages));
        const currentKey = new Date(id).toLocaleDateString('en-GB');
        if(!updatedMessage[currentKey]) {
            updatedMessage[currentKey] = [];
        }
        updatedMessage[currentKey].push(newMessage);
        const sortUpdatedData = sortedData(updatedMessage);
        setMessages(sortUpdatedData);

    }) 
    return () => {
        socket?.disconnect();
    }
  }, [targetObj])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const socket = CreateSocket();

    const newMessage = {
      id: Date.now(),
      text: input,
      userInfo: `${currentLoggedInUser?.firstName} ${currentLoggedInUser?.lastName}`,
      fromUserId: currentLoggedInUser.id,
      targetObj: targetObj
    };
    socket?.emit("sendMessage", { newMessage, messages });

    // setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // fake bot reply (optional)
    // setTimeout(() => {
    //   setMessages((prev) => [
    //     ...prev,
    //     { id: Date.now() + 1, text: "Got it 👍", sender: "bot" },
    //   ]);
    // }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  const getDate = (timing) => {
    const date = new Date(timing);
    const hours = date.getHours(); // 0-23
    const minutes = date.getMinutes() < 9 ? `0${date.getMinutes()}`: date.getMinutes()
    const amPm = hours >= 12 ? "PM" : "AM";
    return `${date.getHours()}: ${minutes} ${amPm}`
  }

  return (
    <div className="chat-container w-[90vw] h-[78vh] lg:w-[70vw] lg:h-[90vh]">
      {/* Header */}
      <div className="chat-header">
        {`Chatting with ${chattingInfo?.firstName} ${chattingInfo?.lastName}`}
      </div>

      {/* Messages */}
      <div className="chat-body">
        {
            Object.keys(messages).map((item, index) =>  {
                return (
                    <div key={index}>
                        <div className="text-base text-gray-500 text-center">{item}</div>
                        {
                            messages[item]?.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`${msg.userId ===  currentLoggedInUser.id? "self-end w-full flex flex-col items-end" : ""}`}
                                >
                                    <div className="text-sm px-3 text-gray-500 w-fit">{msg.userInfo}</div>
                                    <div className={`chat-message min-w-48 ${
                                    msg.userId ===  currentLoggedInUser.id? "user w-[70%] text-end" : "bot"
                                    }`}>{msg.text}</div>
                                    <div className="text-sm px-3 text-gray-500 w-fit">{getDate(msg.id)}</div>
                                </div>
                            ))
                        }
                    </div>
                )
            })
        }
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}