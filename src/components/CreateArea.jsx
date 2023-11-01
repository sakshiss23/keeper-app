import React, { useState, useRef } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { PRIORITY_LEVELS } from "./../config"

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
    attachment: null
  });
  const [priority, setPriority] = useState("Medium");

  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    setNote(prevNote => ({
      ...prevNote,
      attachment: event.target.files[0]
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    const noteWithPriority = {
      ...note,
      priority: priority
    };
    props.onAdd(noteWithPriority);
    setNote({
      title: "",
      content: "",
      attachment: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <>
            <span style={{ marginLeft: "5px" }}>Priority: {" "}</span>
            <select style={{
              padding: "3px"
            }} value={priority} onChange={e => setPriority(e.target.value)}>
              {Object.keys(PRIORITY_LEVELS).map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          </>

        )}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 2 : 1}
        />
        <Zoom style={{
          marginRight: "50px"
        }} in={isExpanded}>
          <Fab onClick={() => setExpanded(false)}>
            <ExpandLessIcon />
          </Fab>
        </Zoom>
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
        {isExpanded && (
          <>
            <input
              name="attachment"
              placeholder="Add an attachment URL"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
