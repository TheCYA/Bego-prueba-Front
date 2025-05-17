import { formatDate } from "@/utils/formater";
import "./orderDate.css"

export default function OrderDate({ date }){
    return(
        <div className="order-date">
            {formatDate(date).date}
            <br/>
            <span className="time">{formatDate(date).time}</span>
        </div>
    )
}