import React from 'react'

export function Input(props) {
  return (
    <div class="col-sm-4 nav-tabs">
      <input
        type="text"
        class="form-control mt-4"
        onChange={props.handleInputChange}
      />
    </div>
  )
}

export function SearchBtn(props) {
  return (
    <div>
      <button
        className="btn btn-info ml-3 my-2"
        {...props}  >
        {props.children}
    </button>
    </div>
   
  );
}
