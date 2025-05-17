import { formatAddress } from "@/utils/formater";
import { PiTruckTrailerFill } from "react-icons/pi";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./orderAddress.css"

export default function OrderAddress({ type, address }){
    return(
        <div className="order-address">
            {type === "pickup" ? (
                <PiTruckTrailerFill className="icon"/>
            ):(
                <FaMapMarkerAlt className="icon"/>
            )}
            
            
            {formatAddress(address).city}
            <br/>
            <span className="address">{formatAddress(address).street}</span>
        </div>
    )
}