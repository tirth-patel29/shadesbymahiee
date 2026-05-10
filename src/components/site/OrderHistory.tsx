import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Loader2, Package, Calendar, MapPin, CreditCard } from "lucide-react";

export interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "online" | "cod";
  address: any;
  createdAt: Date;
  deliveryDate?: Date;
  trackingId?: string;
}

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchOrders();
    }
  }, [isOpen, user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        deliveryDate: doc.data().deliveryDate?.toDate?.() || undefined,
      } as Order));

      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "shipped":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "processing":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto border-0 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-gray-900">
            {selectedOrder ? "Order Details" : "Your Orders"}
          </DialogTitle>
        </DialogHeader>

        {selectedOrder ? (
          // Order Details View
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-mono font-semibold text-gray-900">{selectedOrder.id}</p>
                </div>
                <span className={`px-4 py-2 rounded-full border text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Order Date:</span> {formatDate(selectedOrder.createdAt)}
                </p>
                <p>
                  <span className="font-semibold">Total Amount:</span> ₹{selectedOrder.total}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={20} className="text-orange-500" />
                Order Items
              </h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-orange-500" />
                Delivery Address
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">{selectedOrder.address?.fullName}</span>
                </p>
                <p>{selectedOrder.address?.houseNo}, {selectedOrder.address?.street}</p>
                {selectedOrder.address?.landmark && <p>{selectedOrder.address?.landmark}</p>}
                <p>
                  {selectedOrder.address?.city}, {selectedOrder.address?.state} - {selectedOrder.address?.pincode}
                </p>
                <p className="pt-2 border-t border-gray-200 mt-2">
                  <span className="font-semibold">Phone:</span> {selectedOrder.address?.phone}
                </p>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-orange-500" />
                Payment Information
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Method:</span>{" "}
                  {selectedOrder.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> ₹{selectedOrder.total}
                </p>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full px-4 py-2 text-center text-orange-600 font-semibold hover:bg-orange-50 rounded-lg transition-colors"
            >
              ← Back to Orders
            </button>
          </div>
        ) : (
          // Orders List View
          <>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="text-orange-500 animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">No orders yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Start shopping to create your first order
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Order {order.id.slice(-8)}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <Calendar size={14} />
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {order.paymentMethod === "cod" ? "💰 COD" : "💳 Online"}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
