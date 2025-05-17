import "./card.css"

export default function Card({ children, className }){
    return(
        <div className={`order-border ${className}`}>
            <div className="order-information">
                {children}
            </div>
        </div>
    )
}