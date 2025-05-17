"use client"
import { IconContext } from "react-icons";
import "./header.css"
import { IoIosArrowBack, IoIosNotificationsOutline } from "react-icons/io";
export default function Header({ title, subHeader, funct }){

    return(
        <header>
            <div className="header">
                <IconContext.Provider value={{ size: "2rem"}}>
                    <IoIosArrowBack className="back" onClick={() => funct ? funct(false) : null}/>
                    {title}
                    <IoIosNotificationsOutline className="notification"/>
                </IconContext.Provider>
            </div>
            {subHeader && (
                <div className="sub-header">
                    <h3 className="selected">Upcoming</h3>
                    <h3>Completed</h3>
                    <h3>Past</h3>
                </div>
            )}
        </header>
    )
}