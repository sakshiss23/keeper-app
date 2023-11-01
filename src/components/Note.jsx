import React, { useState, useRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import GetAppIcon from '@material-ui/icons/GetApp';

import { PRIORITY_LEVELS } from './../config';


function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  const notePriority = PRIORITY_LEVELS[props.priority];

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
    props.onEdit(props.id, editedTitle, editedContent, props.priority, props.attachment);

  }

  const bgColor = PRIORITY_LEVELS[props.priority]
    ? PRIORITY_LEVELS[props.priority].color
    : "#f5f5f5";

  console.log("PRIORITY_LEVELS", PRIORITY_LEVELS);
  console.log("PRIORITY_LEVELS[props.priority]", PRIORITY_LEVELS[props.priority]);



  if (isEditing) {
    return (
      <div className="note">
        <input
          className="edit_textbox_title"
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <textarea
          className="edit_textbox_content"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <button onClick={handleSave}>
          Save
        </button>
      </div>
    );
  }


  return (
    <div className="note" style={{ backgroundColor: bgColor }}>
      <p style={{
        fontSize: "13px"
      }}>{props.priority}</p>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p>{ }</p>
      {props.attachment &&
        <a href={props.attachment} download="attachment.pdf">File</a>
      }
      {props.attachment &&
        <a href={props.attachment} download="attachment.pdf" target="_blank" rel="noopener noreferrer">
          <button><GetAppIcon /></button>
        </a>
      }

      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
