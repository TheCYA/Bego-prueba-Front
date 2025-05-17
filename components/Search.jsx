"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./search.css"

export default function Search () {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [orderNumber, setOrderNumber] = useState("");

    function handleChange(e) {
        const value = e.target.value.replace(/#/g, "");
        setOrderNumber(value);
        const params = new URLSearchParams(searchParams);
        params.set("q", value);
        window.history.pushState(null, "", `${pathname}?${params.toString()}`);
    }
    
    return (
        <section className="search-container">
            <CiSearch style={{fontSize: "1.5rem"}}/>
            <input
                type="text"
                onChange={handleChange}
                value={orderNumber}
                placeholder="Search..."
            />
        </section>
    )
}