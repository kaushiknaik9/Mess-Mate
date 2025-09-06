import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  id: number;
  name: string;
  mealType: string;
  stock: number;
  status: "Available" | "Low" | "Out";
}

const mockMenuItems: MenuItem[] = [];

const getStatusColor = (status: MenuItem["status"]) => {
  switch (status) {
    case "Available":
      return "bg-success text-success-foreground";
    case "Low":
      return "bg-warning text-warning-foreground";
    case "Out":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const TodaysMenu = () => {
  const handleEdit = (id: number) => {
    console.log("Edit item:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete item:", id);
  };

  // Group items by mealType (Breakfast, Lunch, etc.)
  const groupedItems = mockMenuItems.reduce((acc, item) => {
    (acc[item.mealType] = acc[item.mealType] || []).push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Today's Menu</h2>
        <Badge variant="outline">{mockMenuItems.length} Items</Badge>
      </div>
      <p className="text-gray-700 mb-4">
        Here&apos;s what&apos;s on the menu today. Enjoy your meal!
      </p>
      {Object.entries(groupedItems).map(([mealType, items]) => (
        <div key={mealType} className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">{mealType}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stock:</span>
                      <span className="font-medium">{item.stock} units</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item.id)}
                        className="flex-1 hover:bg-primary hover:text-primary-foreground"
                      >
                        <Edit2 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodaysMenu;
