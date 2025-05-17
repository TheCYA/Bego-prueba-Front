import "./button.css"

export default function Button({ className, children, onClick }){
    return(
        <button className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}