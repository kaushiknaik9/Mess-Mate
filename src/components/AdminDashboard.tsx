"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AlertCircle, Utensils, Menu, LogOut, Star } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <img src="/logo.png" alt="MessMate" className="h-10 w-10" />
            <h1 className="text-xl font-bold">MessMate</h1>
          </div>
          <nav className="space-y-4">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Menu size={18} /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <AlertCircle size={18} /> Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Utensils size={18} /> Menu
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Star size={18} /> Feedback
            </Button>
          </nav>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <LogOut size={18} /> Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Order Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="text-red-500" /> Order Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">ORD-123</p>
                <p className="text-sm text-muted-foreground">
                  Customer: Ramesh
                </p>
              </div>
              <Button size="sm" variant="destructive">
                Resolve
              </Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div>
                <p className="font-medium">ORD-456</p>
                <p className="text-sm text-muted-foreground">
                  Customer: Suresh
                </p>
              </div>
              <Button size="sm">Process</Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="text-green-500" /> Today's Menu
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Sambar", stock: "25 units", status: "Available" },
              { name: "Masala Dosa", stock: "5 units", status: "Low" },
              { name: "Dal Rice", stock: "30 units", status: "Available" },
              { name: "Chicken Curry", stock: "0 units", status: "Out" },
            ].map((item, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <Badge
                    variant={
                      item.status === "Available"
                        ? "default"
                        : item.status === "Low"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Stock: {item.stock}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Add New Item */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Menu Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Enter item name" />
            <Select>
              <SelectTrigger>Meal Type</SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Stock Quantity" />
            <Button className="w-full">+ Add Menu Item</Button>
          </CardContent>
        </Card>

        {/* Feedback Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-yellow-500" /> Feedback Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between p-3 border rounded-md">
              <p>Good Ratings</p>
              <p>65%</p>
            </div>
            <div className="flex justify-between p-3 border rounded-md">
              <p>Average Ratings</p>
              <p>25%</p>
            </div>
            <div className="flex justify-between p-3 border rounded-md">
              <p>Poor Ratings</p>
              <p>10%</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
