// app/page.jsx
import { Suspense } from "react";
import OrdersClient from "@/components/OrdersClient";
import "./home.css";

export default function Home() {
  return (
    <section className="order-container">
      <Suspense fallback={<div>Cargando búsqueda...</div>}>
        <OrdersClient />
      </Suspense>
    </section>
  );
}


