import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons/lib/icons";
import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox } from "antd";
import TextArea from "antd/es/input/TextArea";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <TextArea
          id={props.id}
          className="todo-text"
          type="text"
          value={newName || props.name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">

        <Button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </Button>
        <Button type="primary" htmlType="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </Button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
     
            <Checkbox 
            
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
            >
            </Checkbox>
          
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        


  



<div>
        
        <EditOutlined
         style = { { height : 40 ,marginTop: -30,color : " green ", marginRight: 10 } }
          type="button"
          className="btnn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{props.name}</span>
        </EditOutlined>

         <DeleteOutlined
          style = { { height : 40 ,marginTop: -30,color : " red"} }
            type="button"
            className="btn1"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </DeleteOutlined>
        </div>
        </div>
        
  );


  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
