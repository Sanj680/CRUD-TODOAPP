import React, { useState } from "react";
import { Button,Input } from "antd";
function Form(props) {
  const [name, setName] = useState('');
  
  const { TextArea } = Input;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }
    props.addTask(name);
    setName("");
  }


  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          TodoMatic
          
        </label>
      </h2>

      <TextArea
        value={name}
    onChange={handleChange}
        placeholder="Add todo"
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
      />
      <Button style={{marginTop : "10px"}}  type="primary" htmlType="submit" className="btn btn__primary btn__lg">
        Add
      </Button>
    </form>
  );
}

export default Form;
