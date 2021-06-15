import { dbService } from "fbase";
import React, { useState } from "react";

const Party = ({ partyObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(partyObj.title);
  const [newContents, setNewContents] = useState(partyObj.contents);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this party?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`partys/${partyObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`partys/${partyObj.id}`).update({
      title: newTitle,
      contents: newContents,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "title") {
      setNewTitle(value);
    } else if (name === "contents") {
      setNewContents(value);
    }
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your title"
              value={newTitle}
              required
              onChange={onChange}
              name="title"
            />
            <textarea
              placeholder="Edit your contents"
              value={newContents}
              required
              onChange={onChange}
              name="contents"
            />
            <input type="submit" value="Update Party" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{partyObj.title}</h4>
          <p>{partyObj.contents}</p>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Party</button>
              <button onClick={toggleEditing}>Edit Party</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Party;
