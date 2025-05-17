/* 
    Notas:
    - El botón its time for a pick up, que se activa pasado el tiempo desde end_date hasta la fecha actual, 
    siempre estaría activo o con el contador en negativo, pues las fechas que devuelve la api son del 2022, entonces por esa razón,
    la primer order le coloqué un tiempo de 6 minutos a partir de la hora actual, para ver el funcionamiento del botón con el contador
    para después habilitarse el mismo
 */
"use client"

import "./order.css"
import { IoMdEye } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import Timer from "./Timer";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
import OrderNumber from "./OrderNumber";
import OrderAddress from "./OrderAddress";
import OrderDate from "./OrderDate";
import Card from "./Card";
import Button from "./Button";

export default function Order({ order }) {
    const [modal, setModal] = useState(false)

    return (
        <article className="order">
            <OrderNumber orderNumber={order.order_number}/>
            <Card>
                <div className="line"/>
                <div className="order-list status">
                    <p className="order-type"><TbTruckDelivery/>{order.type}</p>
                    <p className="not"><span className={order.status_string === "Orden Asignada" ? "assigned" : ""}/>{order.status_string}</p>
                </div>
                <div className="order-list pickup" title="Detalles de recolección">
                    <OrderAddress address={order.destinations[0].address} type={"pickup"}/>
                    <OrderDate date={order.destinations[0].end_date}/>
                </div>
                <div className="order-list dropoff" title="Detalles de destino">
                    <OrderAddress address={order.destinations[1].address}/>
                    <OrderDate date={order.destinations[1].end_date}/>
                </div>
                <div className="order-list end">
                    {/* Este es el timer, le paso un time de 6 minutos (360000 seg.) a la primer order para ver el funcionamiento */}
                    <Timer time={order._id === "624b5714296f8d9a820d01b3" ? Date.now() + 360000 : order.start_date}/>
                    <Button className={"resume"} onClick={() => setModal(true)}><span>Resume <IoMdEye /></span></Button>
                </div>
            </Card>
            {modal && (
                <section className="modal-container"> 
                    <OrderDetails close={setModal} orderDetails={order}/>
                </section>
                
            )}
        </article>
    )
}