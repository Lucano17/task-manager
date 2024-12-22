import styles from "./HomePage.module.css"
import {Link} from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { GiPartyPopper } from "react-icons/gi";
import { GiThink } from "react-icons/gi";
import { BiSolidFilePlus } from "react-icons/bi";

import React from 'react'

const HomePage = () => {
  return (
    <div className={styles.homePageContainer}>
      <h1>Welcome to <span>Tasks Manager</span></h1>
      <h2>Simple design, simple operation, high utility</h2>
      <p>This website was created with the proposal <br/>
         to help you manage your life. <br/></p>
         <ul>
          <li>Create a listing for the market <div className={styles.reactIcon}><FaShoppingCart /></div></li>
          <li>Create a list for a birthday party <div className={styles.reactIcon}><GiPartyPopper /></div></li>
          <li>Create a shopping list <div className={styles.reactIcon}><GiShoppingBag /></div></li>
          <li>Create a list to remember what you don't want to forget <div className={styles.reactIcon}><GiThink /></div></li>
          <li>And much more <div className={styles.reactIcon}><BiSolidFilePlus /></div></li>
         </ul>
      <h2>Create your account <Link to="/register" className={styles.registerButton}>HERE</Link>, and enjoy</h2>
    </div>
  )
}

export default HomePage
