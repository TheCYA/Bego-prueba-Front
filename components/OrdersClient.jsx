"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Order from "@/components/Order";
import Search from "@/components/Search";

async function getOrders() {
  const response = await fetch("https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming");
  if (!response.ok) {
    throw new Error("Error al obtener los pedidos, reintente más tarde");
  }
  return response.json();
}

export default function OrdersClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [orders, setOrders] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { result } = await getOrders();
        setOrders(result);
        setFilteredOrders(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!orders) return;
    
    if (!query) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(order => 
      order.order_number.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [query, orders]);

  return (
    <>
      <Search />
      {filteredOrders ? (
        filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Order key={order._id} order={order} />
          ))
        ) : (
          <div className="no-results">
            <h2>No se encontraron órdenes con "{query}"</h2>
          </div>
        )
      ) : (
        <div className="loading">
          <h2>Cargando...</h2>
        </div>
      )}
    </>
  );
}
