import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import Party from "components/Party";
import { Link, useParams } from "react-router-dom";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [partys, setPartys] = useState([]);
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService.collection("partys").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartys(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <Link to="/make">Make Party</Link>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
      <div>
        {partys.map((party) => (
          <Party
            key={party.id}
            partyObj={party}
            isOwner={party.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
