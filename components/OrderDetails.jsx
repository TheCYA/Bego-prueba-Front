/* 
    Notas:
    - El endpoint de la api solo devuelve la información de la primer order, por lo que utilicé los mismos datos para todas las orders
*/

"use client"

import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Header from "./Header"
import "./orderDetails.css"
import OrderNumber from "./OrderNumber"
import OrderAddress from "./OrderAddress";
import Card from "./Card";
import { formatDate } from "@/utils/formater";
import Button from "./Button";
import Image from "next/image";

async function getOrder() {
    /* Este endpoint solo devuelve datos de la primer order y no acepta query params ni tiene sub-endpoints (orders/:id) */
    const response = await fetch("https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders");
    if (!response.ok) {
        throw new Error("Error al obtner los pedidos, reintente más tarde");
    }
    const data = await response.json();
    return data.result;
}

export default function ({ orderDetails, close }){
    const [info, setInfo] = useState(null);
    const [data, setData] = useState({
        type: "Pickup",
        state: false,
    });

    useEffect(() => {
        async function fetchOrders() {
            try {
              const orders = await getOrder();
              setInfo(orders);
            } catch (error) {
              console.error(error);
            }
          }
          fetchOrders();
    }, [orderDetails])

    return(
        <article className="modal">
            <Header title={"Cargo Details"} funct={close}/>
            <article className="details">
                <Card>
                    <OrderNumber orderNumber={orderDetails.order_number}/>
                    <div className="pickup" onClick={() => setData(prev => ({...prev, type: "Pickup"}))}>
                        <OrderAddress address={orderDetails.destinations[0].address} type={"pickup"}/>
                    </div>
                    <div className="dropoff" onClick={() => setData(prev => ({...prev, type: "Dropoff"}))}>
                        <OrderAddress address={orderDetails.destinations[1].address} type={"dropoff"}/>
                    </div>
                </Card>
            </article>
            <article className="status">
                <Card className={"mid"}>
                    <div className="thumbnail">
                    <Image 
                        alt="driver avatar"
                        src={info?.driver?.thumbnail || "/avatar.webp"}
                        width={50}
                        height={50}
                        onError={(e) => {
                        e.currentTarget.src = "/avatar.webp";
                        }}
                        style={{
                        border: "5px solid rgba(27, 32, 36, 1)",
                        borderRadius: "50%", 
                        objectFit: "cover"
                        }}
                    />
                    </div>
                    <ul className="step">
                        {["Created Order", "Accepted Order", "Pickup set up by", "Pickup Completed"].map((step, index) => (
                        <li key={index} className={`step-item ${index <= orderDetails.status  ? "completed" : ""}`}>
                            {index <= orderDetails.status + 1 ? (
                                <>
                                <FaCheckCircle 
                                className="checked-icon" 
                                style={{color: "rgba(255, 238, 0, 1)", fontSize: "1.5rem"}}
                                />

                                </>
                            ) : (
                            <span className="unchecked-icon" />
                            )}
                            {step}
                        </li>
                        ))}
                    </ul>
                    <Button className={`track ${orderDetails.status < 3 ? "dissabled" : ""}`} onClick={() => console.log("Track Order")}>Track Order</Button>
                </Card>
            </article>
            <article className="data-container">
                <Card className={"data"}>
                    <p>
                        {data.type} Data
                        {data.state ? 
                        <IoIosArrowUp 
                            style={{color: "rgba(255, 238, 0, 1)", fontSize: "1.5rem"}} 
                            onClick={() => setData(prev => ({...prev, state: !prev.state}))}
                        /> : 
                        <IoIosArrowDown 
                            style={{color: "rgba(255, 238, 0, 1)", fontSize: "1.5rem"}} 
                            onClick={() => setData(prev => ({...prev, state: !prev.state}))}
                        />}
                    </p>
                </Card>
                {data.state && (
                    <>
                    <p>{info.destinations[data.type === "Pickup" ? 0 : 1].address}</p>
                    <p>
                        {formatDate(info.destinations[data.type === "Pickup" ? 0 : 1].startDate, true).date}
                        {formatDate(info.destinations[data.type === "Pickup" ? 0 : 1].startDate).time}
                    </p>
                    <p>{info.destinations[data.type === "Pickup" ? 0 : 1].contact_info.telephone}</p>
                    <p>{info.destinations[data.type === "Pickup" ? 0 : 1].contact_info.email}</p>        
                    </>                        
                )}
            </article>
        </article>
    )
}