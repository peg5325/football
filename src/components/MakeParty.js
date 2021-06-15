import { dbService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const MakeParty = ({ userObj }) => {
  const history = useHistory();
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
    history.push("/");
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
      <form onSubmit={onSubmit} className="factoryForm">
        <input
          className="factoryInput__input"
          onChange={onChange}
          name="title"
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          required
          maxLength={120}
        />
        <br />
        <textarea
          onChange={onChange}
          name="contents"
          placeholder="내용을 입력해주세요."
          value={contents}
          required
          className="factoryArea"
        />
        <input type="submit" value="게시하기" className="factoryInput__arrow" />
      </form>
    </div>
  );
};
export default MakeParty;
