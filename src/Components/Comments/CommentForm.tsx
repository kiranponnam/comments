import { useState } from "react";
import "./styles.css";

const CommentForm = (props:any) => {
  const [text, setText] = useState<any>(props?.initialText);
  const isTextareaDisabled = text?.length === 0;
  const onSubmit = (event:any) => {
    event.preventDefault();
    if(!text) return;
    props?.handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {props?.submitLabel}
      </button>
      {props?.hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={props?.handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;