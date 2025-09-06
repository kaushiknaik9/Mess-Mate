// import { AlertCircle, Truck } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// interface OrderAlert {
//   id: number;
//   orderId: string;
//   status: "delayed" | "pending";
//   customer: string;
// }

// const mockOrderAlerts: OrderAlert[] = [
//   {
//     id: 1,
//     orderId: "ORD-123",
//     status: "delayed",
//     customer: "Ramesh",
//   },
//   {
//     id: 2,
//     orderId: "ORD-456",
//     status: "pending",
//     customer: "Suresh",
//   },
// ];

// const OrderAlerts = () => {
//   const delayed = mockOrderAlerts.filter((a) => a.status === "delayed");
//   const pending = mockOrderAlerts.filter((a) => a.status === "pending");

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Order Alerts</h2>
//         <Badge variant="outline">{mockOrderAlerts.length} Alerts</Badge>
//       </div>

//       {delayed.length > 0 && (
//         <div className="space-y-3">
//           <h3 className="text-lg font-semibold text-destructive flex items-center gap-2">
//             <AlertCircle className="h-5 w-5" />
//             Delayed Orders
//           </h3>
//           {delayed.map((alert) => (
//             <Card
//               key={alert.id}
//               className="border-destructive bg-destructive/5 hover:shadow-lg transition-shadow"
//             >
//               <CardContent className="p-4 flex justify-between items-center">
//                 <div>
//                   <p className="font-semibold">{alert.orderId}</p>
//                   <p className="text-sm text-muted-foreground">
//                     Customer: {alert.customer}
//                   </p>
//                 </div>
//                 <Button className="bg-destructive hover:bg-destructive/90">
//                   Resolve
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {pending.length > 0 && (
//         <div className="space-y-3">
//           <h3 className="text-lg font-semibold text-warning flex items-center gap-2">
//             <Truck className="h-5 w-5" />
//             Pending Orders
//           </h3>
//           {pending.map((alert) => (
//             <Card
//               key={alert.id}
//               className="border-warning bg-warning/5 hover:shadow-lg transition-shadow"
//             >
//               <CardContent className="p-4 flex justify-between items-center">
//                 <div>
//                   <p className="font-semibold">{alert.orderId}</p>
//                   <p className="text-sm text-muted-foreground">
//                     Customer: {alert.customer}
//                   </p>
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="border-warning text-warning"
//                 >
//                   Process
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderAlerts;
