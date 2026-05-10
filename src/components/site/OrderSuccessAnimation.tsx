import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface OrderSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessAnimation: React.FC<OrderSuccessProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-0 bg-transparent shadow-none max-w-md">
        <div className="flex flex-col items-center justify-center gap-6 py-12">
          {/* Celebration Animation */}
          <div className="relative w-32 h-32">
            {/* Confetti circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-24 rounded-full bg-green-100 animate-ping"
                style={{ animationDuration: "2s" }}
              ></div>
            </div>

            {/* Checkmark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-bounce" style={{ animationDuration: "1s" }}>
                <CheckCircle2 size={120} className="text-green-500" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              🎉 Order Placed!
            </h2>
            <p className="text-xl font-medium text-gray-700">
              Your handmade creation order has been placed successfully!
            </p>
            <p className="text-sm text-gray-600">
              You'll receive a confirmation email shortly. Check your order history to track your beautiful creation.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex gap-2 justify-center">
            <div className="text-2xl">✨</div>
            <div className="text-2xl">🎁</div>
            <div className="text-2xl">✨</div>
          </div>

          {/* Loading indicator */}
          <div className="text-center text-sm text-gray-600 flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            Redirecting to homepage...
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
