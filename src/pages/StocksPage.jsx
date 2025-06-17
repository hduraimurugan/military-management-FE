import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertTriangle,
  Search,
  Filter,
  CalendarIcon,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { inventoryAPI } from "../services/api"
import { useDebounce } from 'use-debounce';
import { useAuth } from "../context/AuthContext"
import { useAssetBase } from "../context/AssetBaseContext"

const StocksPage = () => {
  const { user } = useAuth();
  const { bases } = useAssetBase()
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const [inventoryData, setInventoryData] = useState([]);
  const [baseInfo, setBaseInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    asset: "",
    category: "All categories",
    minQuantity: "",
    maxQuantity: "",
    dateFrom: null,
    dateTo: null,
    showLowStock: false,
    base_id: user?.role === 'admin' && bases.length > 0 ? bases[0]._id : ""
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc"
  });

  // Fetch inventory data with filters
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setLoading(true);

        // Prepare query params
        const params = {
          asset: filters.asset,
          category: filters.category !== "All categories" ? filters.category : undefined,
          minQuantity: filters.minQuantity,
          maxQuantity: filters.maxQuantity,
          showLowStock: filters.showLowStock ? "true" : undefined,
          dateFrom: filters.dateFrom ? format(filters.dateFrom, "yyyy-MM-dd") : undefined,
          dateTo: filters.dateTo ? format(filters.dateTo, "yyyy-MM-dd") : undefined,
          sortField: sortConfig.key,
          sortDirection: sortConfig.direction,
          base_id: filters.base_id
        };

        // Remove undefined params
        const queryParams = Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== undefined)
        );

        const data = await inventoryAPI.getMyStock(queryParams);

        setInventoryData(data.stocks);
        setBaseInfo(data.base);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [filters, sortConfig]); // Re-fetch when filters or sort change

  // Update your useEffect to use debouncedSearchTerm
  useEffect(() => {
    setFilters(prev => ({ ...prev, asset: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const clearFilters = () => {
    setFilters({
      asset: "",
      category: "All categories",
      minQuantity: "",
      maxQuantity: "",
      dateFrom: null,
      dateTo: null,
      showLowStock: false,
      base_id: user?.role === 'admin' && bases.length > 0 ? bases[0]._id : ""
    });
    setSortConfig({ key: null, direction: "asc" });
  };

  // Calculate low stock count from current filtered results
  const lowStockCount = useMemo(() => {
    return inventoryData.filter(item => item.quantity < 10).length;
  }, [inventoryData]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header with base info */}
      <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-2">
        <div>
          <h1 className="md:text-3xl text-xl font-bold tracking-tight">
            {baseInfo ? `${baseInfo.name} Inventory` : "Inventory Management"}
          </h1>
          <p className="text-muted-foreground">
            {baseInfo ? `${baseInfo.district}, ${baseInfo.state}` : "Manage your asset inventory"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {lowStockCount > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {lowStockCount} Low Stock
            </Badge>
          )}
          <Badge variant="outline">{inventoryData.length} Items</Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="hidden grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.reduce((sum, item) => sum + item.quantity, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{lowStockCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assigned</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.reduce((sum, item) => sum + item.assigned, 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>Filter your inventory data to find specific items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Asset Name</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All categories">All categories</SelectItem>
                  {['weapon', 'vehicle', 'ammunition', 'equipment'].map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bases</label>
              <Select
                value={filters.base_id}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, base_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All bases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All bases">All categories</SelectItem>
                  {bases.map((base) => (
                    <SelectItem key={base._id} value={base._id}>
                      {base.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 hidden">
              <label className="text-sm font-medium">Quantity Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minQuantity}
                  onChange={(e) => setFilters((prev) => ({ ...prev, minQuantity: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxQuantity}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxQuantity: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date From</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateFrom && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateFrom ? format(filters.dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom}
                    onSelect={(date) => setFilters((prev) => ({ ...prev, dateFrom: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date To</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !filters.dateTo && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateTo ? format(filters.dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo}
                    onSelect={(date) => setFilters((prev) => ({ ...prev, dateTo: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => setFilters((prev) => ({ ...prev, showLowStock: !prev.showLowStock }))}
                className={cn("w-full", filters.showLowStock && "bg-destructive text-destructive-foreground")}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                {filters.showLowStock ? "Showing Low Stock" : "Show Low Stock"}
              </Button>
            </div>

            <div className="flex items-end">
              <Button variant="ghost" onClick={clearFilters} className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Data</CardTitle>
          <CardDescription>Complete overview of your asset inventory with detailed metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Alert</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("asset")} className="h-auto p-0 font-semibold">
                      Asset
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  {/* <TableHead>Location</TableHead> */}
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("quantity")} className="h-auto p-0 font-semibold">
                      Quantity
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("purchased")}
                      className="h-auto p-0 font-semibold"
                    >
                      Purchased
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("expended")} className="h-auto p-0 font-semibold">
                      Expended
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("assigned")} className="h-auto p-0 font-semibold">
                      Assigned
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Transferred Out</TableHead>
                  <TableHead>Transferred In</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((item) => (
                  <TableRow key={item._id} className={item.quantity < 10 ? "bg-destructive/5" : ""}>
                    <TableCell>
                      {item.quantity < 10 && <AlertTriangle className="h-4 w-4 text-destructive" />}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{item.asset.name}</div>
                        <div className="text-sm text-muted-foreground">{item.asset.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.asset.category}</Badge>
                    </TableCell>
                    {/* <TableCell>
                      <Badge variant="secondary">{item.asset.category}</Badge>
                    </TableCell> */}
                    <TableCell>
                      <Badge variant={item.quantity < 10 ? "destructive" : "default"} className="font-mono">
                        {item.quantity}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{item.purchased}</TableCell>
                    <TableCell className="font-mono">{item.expended}</TableCell>
                    <TableCell className="font-mono">{item.assigned}</TableCell>
                    <TableCell className="font-mono">{item.transferredOut}</TableCell>
                    <TableCell className="font-mono">{item.transferredIn}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(item?.updatedAt), "MMM dd, yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {inventoryData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No inventory items found matching your filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StocksPage
