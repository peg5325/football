import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Party from "components/Party";
import { Link } from "react-router-dom";

const Home = ({ userObj }) => {
  const [partys, setPartys] = useState([]);
  useEffect(() => {
    dbService.collection("partys").onSnapshot((snapshot) => {
      const partyArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartys(partyArray);
    });
  }, []);

  return (
    <div>
      <Link to="/make" className="makeParty">
        방 만들기
      </Link>
      <div id="testResult">
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
