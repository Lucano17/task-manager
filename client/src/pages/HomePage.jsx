import styles from "./HomePage.module.css"
import {Link} from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { GiPartyPopper } from "react-icons/gi";
import { GiThink } from "react-icons/gi";

import React from 'react'

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Tasks Manager</h1>
      <h2>Simple design, simple operation, high utility</h2>
      <p>This website was created with the proposal <br/>
         to help you manage your life. <br/></p>
         <ul>
          <li>Create a listing for the market <FaShoppingCart /></li>
          <li>Create a list for a birthday party <GiPartyPopper /></li>
          <li>Create a shopping list <GiShoppingBag /></li>
          <li>Create a list to remember what you don't want to forget <GiThink /></li>
          <li>And much more</li>
         </ul>
      <h2>Create your account <Link to="/register">HERE</Link>, and enjoy</h2>
    </div>
  )
}

export default HomePage
