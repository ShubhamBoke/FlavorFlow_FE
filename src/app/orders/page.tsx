"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context'; // Assuming you have an auth context
import { getOrderList } from '@/lib/apiService';
import { Order } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/lib/types';

const ViewOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user from auth context
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint to fetch orders
        const data = await getOrderList();
        setFilteredOrders(data.filter((order: Order) => selectedStatus === 'All' || order.orderStatus === selectedStatus)); // Initialize filtered orders based on default filter
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = (status: string) => {
    setSelectedStatus(status);
    if (status === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.orderStatus === status);
      setFilteredOrders(filtered);
    }
  };

  const orderStatuses = ['All', 'PLACED', 'DISPATCHED', 'FULFILLED', 'CANCELED', ];

  // Function to handle order cancellation (placeholder)
  const handleCancelOrder = (orderId: string) => {
    console.log(`Cancelling order: ${orderId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Orders</h1>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">Error loading orders: {error}</p>}

      {!loading && !error && (
        <div>
          <div className="mb-4 flex items-center">
            <label htmlFor="status-filter" className="mr-2">Filter by Status:</label>
            <Select onValueChange={handleFilterChange} value={selectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {orderStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredOrders && filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {filteredOrders.map((order) => (
                <Card key={order.id} className="mb-4 flex flex-col md:flex-row justify-between items-center p-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Order ID: {order.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col">
                      <h3 className="text-md font-semibold mb-1">Items:</h3>
                      <ul>
                        {order.cart.cartItemList.map((item, index) => (
                          <li key={index} className="text-sm">{item.menuItem.name} (x{item.quantity}) - ${item.menuItem.price.toFixed(2)}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm">Total Bill: <span className="font-semibold">${order.cart.total.toFixed(2)}</span></p>
                      <p className="text-sm">Payment Method: <span className="font-semibold">{order.paymentMethod.name}</span></p>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                      <p className="text-sm font-semibold mb-2">
                        Status:
                        {order.orderStatus === 'PLACED' && <span className="ml-2 px-2 py-1 rounded-full bg-blue-200 text-blue-800 text-xs">PLACED</span>}
                        {order.orderStatus === 'DISPATCHED' && <span className="ml-2 px-2 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs">DISPATCHED</span>}
                        {order.orderStatus === 'FULFILLED' && <span className="ml-2 px-2 py-1 rounded-full bg-green-200 text-green-800 text-xs">FULFILLED</span>}
                        {order.orderStatus === 'CANCELED' && <span className="ml-2 px-2 py-1 rounded-full bg-red-200 text-red-800 text-xs">CANCELED</span>}
                      </p>
                      {(user?.role === UserRole.Admin || user?.role === UserRole.Manager) && (
                        <Button
                          variant="destructive"
                          className="mt-2 md:mt-0"
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={order.orderStatus === 'CANCELED' || order.orderStatus === 'FULFILLED'}>
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewOrdersPage;