import React from "react";


// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <button
      className="btn btn-danger float-right"
      {...props}
    >Delete
    </button>
    // <span className="delete-btn" {...props} role="button" tabIndex="0">
    //   ✗
    // </span>
  );
}

export default DeleteBtn;
