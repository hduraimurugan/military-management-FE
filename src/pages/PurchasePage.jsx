import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Package, Calendar, FileText, MapPin, Search, Filter, X } from "lucide-react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { purchasesAPI } from "../services/api"
import { useAssetBase } from "../context/AssetBaseContext"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAuth } from "../context/AuthContext"

const PurchasePage = () => {
  const { assets, bases } = useAssetBase()
  const { user } = useAuth()
  const isAdmin = user.role === "admin"
  const [purchases, setPurchases] = useState([])
  const [filteredPurchases, setFilteredPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAssetFilter, setSelectedAssetFilter] = useState("")
  const [selectedBaseFilter, setSelectedBaseFilter] = useState(isAdmin && bases.length > 0 ? bases[0]._id : "");
  const [dateFilter, setDateFilter] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    items: [{ asset: "", quantity: 1 }],
    invoiceNumber: "",
    remarks: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  })

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });


  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(selectedBaseFilter && { baseId: selectedBaseFilter }),
        ...(selectedAssetFilter && { assetId: selectedAssetFilter }),
        ...(dateFilter && { date: dateFilter }),
      };

      const data = await purchasesAPI.getAll(params);
      setPurchases(data.purchases);
      setFilteredPurchases(data.purchases)
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total,
        pages: data.pages,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update useEffect dependencies
  useEffect(() => {
    fetchPurchases();
  }, [pagination.page, selectedBaseFilter, selectedAssetFilter, dateFilter]);


  const clearFilters = () => {
    setSearchTerm("")
    setSelectedAssetFilter("")
    setDateFilter("")
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const createData = {
        ...formData,
        items: formData.items.filter((item) => item.asset && item.quantity > 0),
      }
      await purchasesAPI.create(createData)
      setShowCreateModal(false)
      resetForm()
      fetchPurchases()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const updateData = {
        ...formData,
        items: formData.items.filter((item) => item.asset && item.quantity > 0),
      }
      await purchasesAPI.update(selectedPurchase._id, updateData)
      setShowEditModal(false)
      resetForm()
      fetchPurchases()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async () => {
    try {
      await purchasesAPI.delete(selectedPurchase._id)
      setShowDeleteModal(false)
      setSelectedPurchase(null)
      fetchPurchases()
    } catch (err) {
      setError(err.message)
    }
  }

  const resetForm = () => {
    setFormData({
      items: [{ asset: "", quantity: 1 }],
      invoiceNumber: "",
      remarks: "",
      purchaseDate: new Date().toISOString().split("T")[0],
    })
    setSelectedPurchase(null)
  }

  const openEditModal = (purchase) => {
    setSelectedPurchase(purchase)
    setFormData({
      items: purchase.items.map((item) => ({
        asset: item.asset._id,
        quantity: item.quantity,
      })),
      invoiceNumber: purchase.invoiceNumber,
      remarks: purchase.remarks,
      purchaseDate: new Date(purchase.purchaseDate).toISOString().split("T")[0],
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (purchase) => {
    setSelectedPurchase(purchase)
    setShowDeleteModal(true)
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { asset: "", quantity: 1 }],
    }))
  }

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }))
  }

  const updateItem = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN")
  }

  const getTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getAssetById = (id) => {
    return assets.find((asset) => asset._id === id)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8" />
            Purchase Bills
          </h1>
          <p className="text-muted-foreground mt-1">Manage your purchase bills and inventory records</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Bill
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedAssetFilter} onValueChange={setSelectedAssetFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by asset" />
              </SelectTrigger>
              <SelectContent>
                {/* Option 1: Remove the "All assets" option */}
                {/* {assets.map((asset) => (
                  <SelectItem key={asset._id} value={asset._id}>
                    {asset.name}
                  </SelectItem>
                ))} */}

                {/* OR Option 2: Use a special value like "all" */}
                <SelectItem value="all">All assets</SelectItem>
                {assets.map((asset) => (
                  <SelectItem key={asset._id} value={asset._id}>
                    {asset.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isAdmin &&
              <Select value={selectedBaseFilter} onValueChange={setSelectedBaseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by base" />
                </SelectTrigger>
                <SelectContent>
                  {/* Option 1: Remove the "All bases" option */}
                  {/* {bases.map((base) => (
                    <SelectItem key={base._id} value={base._id}>
                      {base.name}
                    </SelectItem>
                  ))} */}

                  {/* OR Option 2: Use a special value like empty string or "all" */}
                  <SelectItem value="all">All bases</SelectItem>
                  {bases.map((base) => (
                    <SelectItem key={base._id} value={base._id}>
                      {base.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            }
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by date"
            />
            <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
          {(searchTerm || selectedAssetFilter || dateFilter) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
              {selectedAssetFilter && (
                <Badge variant="secondary">Asset: {getAssetById(selectedAssetFilter)?.name}</Badge>
              )}
              {dateFilter && <Badge variant="secondary">Date: {formatDate(dateFilter)}</Badge>}
            </div>
          )}

        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="px-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Details</TableHead>
                <TableHead>Base Location</TableHead>
                <TableHead>Items Summary</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.map((purchase) => (
                <TableRow key={purchase._id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{purchase.invoiceNumber}</span>
                      </div>
                      {purchase.remarks && <p className="text-sm text-muted-foreground">{purchase.remarks}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{purchase.base?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {purchase.base?.district}, {purchase.base?.state}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{getTotalItems(purchase.items)} items</div>
                      <div className="text-sm text-muted-foreground">{purchase.items.length} different assets</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(purchase.purchaseDate)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditModal(purchase)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openDeleteModal(purchase)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredPurchases.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No purchase bills found</h3>
              <p className="text-muted-foreground">
                {purchases.length === 0
                  ? "Get started by creating your first purchase bill."
                  : "Try adjusting your search or filter criteria."}
              </p>
            </div>
          )}

          {filteredPurchases.length > 0 && (
            <div className="flex items-center justify-between px-2 py-2">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{" "}
                of <span className="font-medium">{pagination.total}</span> bills
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Select
                    value={pagination.limit.toString()}
                    onValueChange={(value) => {
                      setPagination(prev => ({
                        ...prev,
                        limit: Number(value),
                        page: 1 // Reset to first page when changing limit
                      }));
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={pagination.limit} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={pageSize.toString()}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm font-medium">per page</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setPagination(prev => ({ ...prev, page: 1 }))}
                    disabled={pagination.page === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page === pagination.pages || pagination.pages === 0}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setPagination(prev => ({ ...prev, page: pagination.pages }))}
                    disabled={pagination.page === pagination.pages || pagination.pages === 0}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Purchase Bill</DialogTitle>
            <DialogDescription>Add a new purchase bill to your inventory records.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, invoiceNumber: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, purchaseDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => setFormData((prev) => ({ ...prev, remarks: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Add this section for base selection (admin only) */}
            {user?.role === "admin" && (
              <div className="space-y-2">
                <Label htmlFor="base">Base</Label>
                <Select
                  value={formData?.base || ""}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, base: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All bases</SelectItem>
                    {bases.map((base) => (
                      <SelectItem key={base._id} value={base._id}>
                        {base.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-2">
                      <Select
                        value={item.asset} // Just use the actual value
                        onValueChange={(value) => updateItem(index, "asset", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map((asset) => (
                            <SelectItem key={asset._id} value={asset._id}>
                              {asset.name} ({asset.category})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24 space-y-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value))}
                        placeholder="Qty"
                        required
                      />
                    </div>
                    {formData.items.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCreateModal(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Create Bill</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Purchase Bill</DialogTitle>
            <DialogDescription>Update the purchase bill information.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editInvoiceNumber">Invoice Number</Label>
                <Input
                  id="editInvoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, invoiceNumber: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPurchaseDate">Purchase Date</Label>
                <Input
                  id="editPurchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, purchaseDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editRemarks">Remarks</Label>
              <Textarea
                id="editRemarks"
                value={formData.remarks}
                onChange={(e) => setFormData((prev) => ({ ...prev, remarks: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Add this section for base selection (admin only) */}
            {isAdmin && (
              <div className="space-y-2">
                <Label htmlFor="editBase">Base</Label>
                <Select
                  value={formData.base || ""}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, base: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All bases</SelectItem>
                    {bases.map((base) => (
                      <SelectItem key={base._id} value={base._id}>
                        {base.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Items</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-2">
                      <Select
                        value={item.asset} // Just use the actual value
                        onValueChange={(value) => updateItem(index, "asset", value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map((asset) => (
                            <SelectItem key={asset._id} value={asset._id}>
                              {asset.name} ({asset.category})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-24 space-y-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value))}
                        placeholder="Qty"
                        required
                      />
                    </div>
                    {formData.items.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowEditModal(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Update Bill</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete purchase bill <strong>{selectedPurchase?.invoiceNumber}</strong>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedPurchase(null)
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default PurchasePage
