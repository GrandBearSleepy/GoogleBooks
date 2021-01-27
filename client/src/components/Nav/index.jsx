import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Nav() {
  return (

      <ul className="nav pl-3 nav-tabs mb-2 mx-4">
        <li className="nav-item">
          <NavLink className="nav-link" to='/search'>Search</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" id="save" to='/saved'>Saved</NavLink>
        </li>
      </ul>

  )
}
