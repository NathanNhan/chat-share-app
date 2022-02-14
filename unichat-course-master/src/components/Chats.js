import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
const Chats = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  console.log(user);
  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  //handle images
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  // useeffect get data
  useEffect(() => {
    //write your effect here...
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "bcb0cdf0-bcd3-4e9c-b72d-1e164ccf6dcf",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          console.log("avatar", avatar);
          formdata.append("avatar", avatar, avatar.name);

          //create user
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "23a0a57f-ede4-45c2-a741-a48697afba69",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [user, history]);
  if (!user || loading) return "loading...";
  return (
    <div className="chat-pages">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="bcb0cdf0-bcd3-4e9c-b72d-1e164ccf6dcf"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
