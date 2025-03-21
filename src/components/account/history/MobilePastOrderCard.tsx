import { MoneyV2, Order } from "@/types/admin.types";
import { CheckIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
export default function MobilePastOrderCard({
  order,
}: {
  order: Pick<Order, "id" | "createdAt" | "displayFulfillmentStatus"> & {
    netPaymentSet: { shopMoney: Pick<MoneyV2, "amount"> };
  };
}) {
  const statusMap = {
    FULFILLED: (
      <div className="rounded-full bg-yellow py-1 px-4 bodySM font-semibold">
        Completed
      </div>
    ),
    UNFULFILLED: (
      <div className="rounded-full bg-gray-200 py-1 px-4 bodySM font-semibold">
        Processing
      </div>
    ),
  };

  return (
    <div className="first:pb-8 not-first:py-8 flex flex-col gap-4 bodyMD">
      <div className="flex justify-between">
        <div className="underline underline-offset-8 bodyButton font-semibold">
          #{order.id.split("/").pop()}
        </div>
        <div>
          {statusMap[order.displayFulfillmentStatus as keyof typeof statusMap]}
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-1">
          <div className="bodySM text-gray-500 font-semibold">Paid on</div>
          <div>{dayjs(order.createdAt).format("DD MMM YYYY")}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="bodySM text-gray-500 font-semibold">Amount</div>
          <div>AED {order.netPaymentSet.shopMoney.amount}</div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-1">
          <div className="bodySM text-gray-500 font-semibold">Shop</div>
          <CheckIcon className="w-6 stroke-2" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="bodySM text-gray-500 font-semibold">Subscription</div>
          <div>-</div>
        </div>
      </div>
    </div>
  );
}
