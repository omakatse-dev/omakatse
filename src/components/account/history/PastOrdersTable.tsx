import { Order } from "@/types/admin.types";
import { CheckIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import React from "react";

export default function PastOrdersTable({
  pastOrders,
}: {
  pastOrders: Order[];
}) {
  const statusMap = {
    FULFILLED: (
      <div className="rounded-full w-28 bg-yellow py-1 bodySM font-semibold text-center">
        Completed
      </div>
    ),
    UNFULFILLED: (
      <div className="rounded-full w-28 bg-gray-200 py-1 bodySM font-semibold text-center">
        Processing
      </div>
    ),
  };

  return (
    <div className="hidden lg:block bodyMD">
      <div className="grid grid-cols-6 border-b border-gray-400 py-3 font-bold">
        <div>Order ID</div>
        <div>Paid On</div>
        <div>Amount</div>
        <div>Shop</div>
        <div>Subscription</div>
        <div>Status</div>
      </div>
      {pastOrders.map((order) => (
        <div key={order.id} className="grid grid-cols-6 py-3">
          <div className="font-semibold underline underline-offset-8">
            #{order.id.split("/").pop()}
          </div>
          <div>{dayjs(order.createdAt).format("DD MMM YYYY")}</div>
          <div>AED {order.netPaymentSet.shopMoney.amount}</div>
          <div>
            {order.lineItems?.edges?.some((item) =>
              !item.node.name.toLowerCase().includes("subscription")
            ) ? (
              <CheckIcon className="w-6 stroke-2" />
            ) : (
              "-"
            )}
          </div>
          <div>
            {order.lineItems?.edges?.some((item) =>
              item.node.name.toLowerCase().includes("subscription")
            ) ? (
              <CheckIcon className="w-6 stroke-2" />
            ) : (
              "-"
            )}
          </div>
          <div>
            {
              statusMap[
                order.displayFulfillmentStatus as keyof typeof statusMap
              ]
            }
          </div>
        </div>
      ))}
    </div>
  );
}
