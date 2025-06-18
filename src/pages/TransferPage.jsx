import { useState, useEffect } from "react"
import {
  Plus,
  Eye,
  Trash2,
  ArrowRightLeft,
  Calendar,
  FileText,
  MapPin,
  Search,
  Filter,
  X,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { transfersAPI } from "../services/api.js"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "../context/AuthContext"
import { toast } from "sonner"

const TransferPage = () => {
  const { assets, bases } = useAssetBase()
  const { user } = useAuth()
  const [transferData, setTransferData] = useState({
    transferIn: [],
    transferOut: [],
    totalIn: 0,
    totalOut: 0,
    totalPagesIn: 0,
    totalPagesOut: 0,
    currentPage: 1,
    limit: 10,
  })
  const [filteredTransfers, setFilteredTransfers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTransfer, setSelectedTransfer] = useState(null)
  const [activeTab, setActiveTab] = useState("out")

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAssetFilter, setSelectedAssetFilter] = useState("")
  const [selectedBaseFilter, setSelectedBaseFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [baseId, setBaseId] = useState(user?.role === 'admin' && bases.length > 0 ? bases[0]._id : "")

  // Form state
  const [formData, setFormData] = useState({
    items: [{ asset: "", quantity: 1 }],
    toBase: "",
    invoiceNumber: "",
    remarks: "",
    transferDate: new Date().toISOString().split("T")[0],
  })

  const fetchTransfers = async () => {
    try {
      setLoading(true)
      const params = {
        page: transferData.currentPage,
        limit: transferData.limit,
        baseId,
        ...(selectedBaseFilter && { baseId: selectedBaseFilter }),
        ...(selectedAssetFilter && { assetId: selectedAssetFilter }),
        ...(dateFilter && { date: dateFilter }),
      }

      const data = await transfersAPI.getAll(params)
      setTransferData({
        transferIn: data.transferIn,
        transferOut: data.transferOut,
        totalIn: data.totalIn,
        totalOut: data.totalOut,
        totalPagesIn: data.totalPagesIn,
        totalPagesOut: data.totalPagesOut,
        currentPage: data.currentPage,
        limit: data.limit,
      })

      // Set filtered transfers based on active tab
      if (activeTab === "out") {
        setFilteredTransfers(data.transferOut)
      } else {
        setFilteredTransfers(data.transferIn)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransfers()
  }, [transferData.currentPage, selectedBaseFilter, selectedAssetFilter, dateFilter])

  // Add a separate useEffect for tab changes
  useEffect(() => {
    if (activeTab === "out") {
      setFilteredTransfers(transferData.transferOut)
    } else {
      setFilteredTransfers(transferData.transferIn)
    }
  }, [activeTab, transferData])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedAssetFilter("")
    setSelectedBaseFilter("")
    setDateFilter("")
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const createData = {
        ...formData,
        items: formData.items.filter((item) => item.asset && item.quantity > 0),
      }
      await transfersAPI.create(createData)
      setShowCreateModal(false)
      resetForm()
      fetchTransfers()
    } catch (err) {
      setError(err.message)
      toast(err.message, "destructive");
    }
  }

  const handleDelete = async () => {
    try {
      await transfersAPI.delete(selectedTransfer._id)
      setShowDeleteModal(false)
      setSelectedTransfer(null)
      fetchTransfers()
    } catch (err) {
      setError(err.message)
      toast(err.message, "destructive");
    }
  }

  const resetForm = () => {
    setFormData({
      items: [{ asset: "", quantity: 1 }],
      toBase: "",
      invoiceNumber: "",
      remarks: "",
      transferDate: new Date().toISOString().split("T")[0],
    })
    setSelectedTransfer(null)
  }

  const openViewModal = async (transfer) => {
    try {
      const fullTransfer = await transfersAPI.getById(transfer._id)
      setSelectedTransfer(fullTransfer)
      setShowViewModal(true)
    } catch (err) {
      setError(err.message)
    }
  }

  const openDeleteModal = (transfer) => {
    setSelectedTransfer(transfer)
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

  const getBaseById = (id) => {
    return bases.find((base) => base._id === id)
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
            <ArrowRightLeft className="h-8 w-8" />
            Transfer Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage asset transfers between bases</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Transfer
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="out" className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Transfer Out
          </TabsTrigger>
          <TabsTrigger value="in" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Transfer In
          </TabsTrigger>
        </TabsList>

        <TabsContent value="out" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filters - Outgoing Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transfers..."
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
                    <SelectItem value="all">All assets</SelectItem>
                    {assets.map((asset) => (
                      <SelectItem key={asset._id} value={asset._id}>
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {user.role === "admin" &&
                  <Select value={baseId} onValueChange={setBaseId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All sources</SelectItem>
                      {bases.map((base) => (
                        <SelectItem key={base._id} value={base._id}>
                          {base.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>}

                <Select value={selectedBaseFilter} onValueChange={setSelectedBaseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All destinations</SelectItem>
                    {bases.map((base) => (
                      <SelectItem key={base._id} value={base._id}>
                        {base.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  placeholder="Filter by date"
                />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Out Table */}
          <Card>
            <CardContent className="px-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transfer Details</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Items Summary</TableHead>
                    <TableHead>Transfer Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransfers.map((transfer) => (
                    <TableRow key={transfer._id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{transfer.invoiceNumber}</span>
                          </div>
                          {transfer.remarks && <p className="text-sm text-muted-foreground">{transfer.remarks}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{transfer.toBase?.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {transfer.toBase?.district}, {transfer.toBase?.state}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{getTotalItems(transfer.items)} items</div>
                          <div className="text-sm text-muted-foreground">{transfer.items.length} different assets</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(transfer.transferDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openViewModal(transfer)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openDeleteModal(transfer)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredTransfers.length === 0 && (
                <div className="text-center py-12">
                  <ArrowRight className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No outgoing transfers found</h3>
                  <p className="text-muted-foreground">
                    {transferData.transferOut.length === 0
                      ? "Get started by creating your first transfer."
                      : "Try adjusting your search or filter criteria."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in" className="space-y-6">
          {/* Search and Filters for Transfer In */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Search & Filters - Incoming Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transfers..."
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
                    <SelectItem value="all">All assets</SelectItem>
                    {assets.map((asset) => (
                      <SelectItem key={asset._id} value={asset._id}>
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBaseFilter} onValueChange={setSelectedBaseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All sources</SelectItem>
                    {bases.map((base) => (
                      <SelectItem key={base._id} value={base._id}>
                        {base.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {user.role === "admin" &&
                  <Select value={baseId} onValueChange={setBaseId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All destinations</SelectItem>
                      {bases.map((base) => (
                        <SelectItem key={base._id} value={base._id}>
                          {base.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>}

                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  placeholder="Filter by date"
                />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transfer In Table */}
          <Card>
            <CardContent className="px-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transfer Details</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Items Summary</TableHead>
                    <TableHead>Transfer Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransfers.map((transfer) => (
                    <TableRow key={transfer._id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{transfer.invoiceNumber}</span>
                          </div>
                          {transfer.remarks && <p className="text-sm text-muted-foreground">{transfer.remarks}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{transfer.fromBase?.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {transfer.fromBase?.district}, {transfer.fromBase?.state}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{getTotalItems(transfer.items)} items</div>
                          <div className="text-sm text-muted-foreground">{transfer.items.length} different assets</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(transfer.transferDate)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openViewModal(transfer)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredTransfers.length === 0 && (
                <div className="text-center py-12">
                  <ArrowLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No incoming transfers found</h3>
                  <p className="text-muted-foreground">
                    {transferData.transferIn.length === 0
                      ? "No transfers have been received yet."
                      : "Try adjusting your search or filter criteria."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {filteredTransfers.length > 0 && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{(transferData.currentPage - 1) * transferData.limit + 1}</span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    transferData.currentPage * transferData.limit,
                    activeTab === "out" ? transferData.totalOut : transferData.totalIn,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {activeTab === "out" ? transferData.totalOut : transferData.totalIn}
                </span>{" "}
                transfers
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Select
                    value={transferData.limit.toString()}
                    onValueChange={(value) => {
                      setTransferData((prev) => ({
                        ...prev,
                        limit: Number(value),
                        currentPage: 1,
                      }))
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={transferData.limit} />
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
                    onClick={() => setTransferData((prev) => ({ ...prev, currentPage: 1 }))}
                    disabled={transferData.currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setTransferData((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    disabled={transferData.currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => setTransferData((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    disabled={
                      transferData.currentPage ===
                      (activeTab === "out" ? transferData.totalPagesOut : transferData.totalPagesIn) ||
                      (activeTab === "out" ? transferData.totalPagesOut : transferData.totalPagesIn) === 0
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      setTransferData((prev) => ({
                        ...prev,
                        currentPage: activeTab === "out" ? transferData.totalPagesOut : transferData.totalPagesIn,
                      }))
                    }
                    disabled={
                      transferData.currentPage ===
                      (activeTab === "out" ? transferData.totalPagesOut : transferData.totalPagesIn) ||
                      (activeTab === "out" ? transferData.totalPagesOut : transferData.totalPagesIn) === 0
                    }
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Transfer Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Transfer</DialogTitle>
            <DialogDescription>Create a new asset transfer to another base.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Transfer Number</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, invoiceNumber: e.target.value }))}
                  placeholder="TRF-2025-0001"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferDate">Transfer Date</Label>
                <Input
                  id="transferDate"
                  type="date"
                  value={formData.transferDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, transferDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toBase">Destination Base</Label>
              <Select
                value={formData.toBase}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, toBase: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination base" />
                </SelectTrigger>
                <SelectContent>
                  {bases
                    .filter((base) => base._id !== user?.base?._id)
                    .map((base) => (
                      <SelectItem key={base._id} value={base._id}>
                        {base.name} - {base.district}, {base.state}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => setFormData((prev) => ({ ...prev, remarks: e.target.value }))}
                rows={3}
                placeholder="Transfer reason or additional notes..."
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Items to Transfer</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-3 items-end">
                    <div className="flex-1 space-y-2">
                      <Select value={item.asset} onValueChange={(value) => updateItem(index, "asset", value)} required>
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
              <Button type="submit">Create Transfer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Transfer Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transfer Details</DialogTitle>
            <DialogDescription>View complete transfer information</DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Transfer Number</Label>
                  <p className="font-medium">{selectedTransfer.invoiceNumber}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Transfer Date</Label>
                  <p className="font-medium">{formatDate(selectedTransfer.transferDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">From Base</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{selectedTransfer.fromBase?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedTransfer.fromBase?.district}, {selectedTransfer.fromBase?.state}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">To Base</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{selectedTransfer.toBase?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedTransfer.toBase?.district}, {selectedTransfer.toBase?.state}
                    </p>
                  </div>
                </div>
              </div>

              {selectedTransfer.remarks && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Remarks</Label>
                  <p className="p-3 bg-muted rounded-lg">{selectedTransfer.remarks}</p>
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Transferred Items</Label>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTransfer.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.asset.name}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{item.asset.category}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">{item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">Total Items:</span>
                  <span className="font-bold">{getTotalItems(selectedTransfer.items)}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete transfer <strong>{selectedTransfer?.invoiceNumber}</strong>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowDeleteModal(false)
                setSelectedTransfer(null)
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

export default TransferPage
