import { dbService } from "fbase";
import React, { useState } from "react";

const MakeParty = ({ userObj }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("partys").add({
      title: title,
      contents: contents,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTitle("");
    setContents("");
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setTitle(value);
    } else if (name === "contents") {
      setContents(value);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="title"
          type="text"
          placeholder="title"
          value={title}
        />
        <br />
        <textarea
          onChange={onChange}
          name="contents"
          placeholder="contents"
          value={contents}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
export default MakeParty;
