import React, { useState, useEffect } from "react";
import style from "../css/ChatBot.module.css";

let chats = [];
function ChatBot() {
  const [msg, setMsg] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [botMsg, setBotMsg] = useState("");
  const [isMsgVisible, setIsMsgVisible] = useState(false);
  const messages = [
    {
      q: "how to see my order?",
      a: "Go to orders from the menu to see orders.",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      chats = [
        ...chats,
        { msg: "Hi there!", tag: "bot" },
        { msg: "how may I help you?", tag: "bot" },
      ];
      setMsg(chats);
    }, 1000);
    setTimeout(() => {
      setIsMsgVisible(true);
    }, 2000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userMsg) {
      chats = [...chats, { msg: userMsg, tag: "user" }];
      setMsg(chats);
      setIsMsgVisible(false);
    }

    setTimeout(() => {
      if (botMsg) {
        chats = [...chats, { msg: botMsg, tag: "bot" }];
        setMsg(chats);
      }
    }, 1000);
    setTimeout(() => {
      setIsMsgVisible(true);
    }, 2000);

    setUserMsg("");
    setBotMsg("");
  };

  useEffect(() => {
    const scroll = () => {
      var elem = document.getElementById("data");
      if (elem.scrollHeight > elem.offsetHeight) {
        elem.scrollTop = elem.scrollHeight;
      }
    };
    scroll();
  }, [msg]);

  useEffect(() => {
    let ans = null;

    messages.forEach((message) => {
      ans =
        message.q === chats[chats.length - 1]
          ? message.a
          : "Did not get your question.";
    });
    setBotMsg(ans);

    // eslint-disable-next-line
  }, [botMsg]);

  return (
    <div className={style.chatbot}>
      <section className={style.chatbot_messasges} id="data">
        {msg.map((message, index) =>
          message.tag === "user" ? (
            <div key={index} className={style.chatbot_user_msg}>
              <small className={style.chatbot_username}>User</small>
              {message.msg}
            </div>
          ) : (
            <div key={index} className={style.chatbot_bot_msg}>
              <small className={style.chatbot_botname}>Bot</small>

              {!isMsgVisible && index === msg.length - 1 ? (
                <div className={style.chatbot_ticontainer}>
                  <div className={style.chatbot_tiblock}>
                    <div className={style.chatbot_tidot} />
                    <div className={style.chatbot_tidot} />
                    <div className={style.chatbot_tidot} />
                  </div>
                </div>
              ) : (
                message.msg
              )}
            </div>
          )
        )}
      </section>
      <form onSubmit={handleSubmit} className={style.chatbot_input}>
        <input
          autoFocus
          type="text"
          className={style.chatbot_msg}
          placeholder="Type message ..."
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          onSubmit={handleSubmit}
        />
        <button
          type="submit"
          className={style.chatbot_send}
          onClick={handleSubmit}
          disabled={userMsg ? false : true}
        >
          send
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
