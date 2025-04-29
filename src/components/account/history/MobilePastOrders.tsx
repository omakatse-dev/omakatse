import { Order } from "@/types/admin.types";
import MobilePastOrderCard from "./MobilePastOrderCard";
export default function MobilePastOrders({
  pastOrders,
}: {
  pastOrders: Order[];
}) {
  return (
    <div className="lg:hidden flex flex-col divide-y divide-gray-200">
      {pastOrders.map((order) => (
        <MobilePastOrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
