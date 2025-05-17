import "./orderNumber.css"

export default function OrderNumber({ orderNumber }){
    return(
        <h2 className="order-number">Order <span>#{orderNumber}</span></h2>
    )
}