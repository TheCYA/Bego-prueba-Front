"use client"

import { useEffect, useState } from "react"
import "./timer.css"
import Button from "./Button";

export default function ({ time }){
    const [timeLeft, setTimeLeft] = useState();
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const remain = time - now;
            if (remain <= 0) {
                clearInterval(interval);
                setTimeLeft("00:00:00");
                setIsDisabled(false);
                return;
            }
            setTimeLeft(`
                ${Math.floor(remain / (1000 * 60 * 60)).toString().padStart(2, "0")}:
                ${Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0")}:
                ${Math.floor((remain % (1000 * 60)) / 1000).toString().padStart(2, "0")}`);
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);
    return (
        <div className="timer">
                <Button className={`${isDisabled ? "disabled" : ""}`} onClick={() =>console.log("Navegar")} disabled={isDisabled}>
                    Its time for pick up
                </Button>
                <p className={`${!isDisabled ? "disabled" : "active"}`}>Start pick up in: <span>{timeLeft}</span></p>
        </div>
    )
}