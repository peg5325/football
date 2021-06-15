import { dbService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="party">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your title"
              value={newTitle}
              required
              autoFocus
              onChange={onChange}
              name="title"
            />
            <textarea
              id="testResult"
              placeholder="Edit your contents"
              value={newContents}
              required
              onChange={onChange}
              name="contents"
            />
            <input type="submit" value="Update Party" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{partyObj.title}</h4>
          <p>{partyObj.contents}</p>
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Party;
