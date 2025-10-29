// tabla contenedora de datos
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, CircularProgress } from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

export default function DestinationTable({
  items,
  total,
  page,
  pageSize,
  isLoading,
  isMutating,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  onCreate,
  onCancelCreate,
}) {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  useEffect(() => {
    const newRow = items.find((item) => item.__isNew);
    if (newRow && editingRowId !== newRow.id) {
      setEditingRowId(newRow.id);
      setEditedRow({ ...newRow });
    }
  }, [items, editingRowId]);

  const handleEditClick = (row) => {
    setEditingRowId(row.id);
    setEditedRow({ ...row });
  };

  const handleSaveClick = () => {
    if (editedRow) {
      onEdit(editedRow);
      setEditingRowId(null);
      setEditedRow(null);
    }
  };

  const handleCancelClick = () => {
    if (editingRowId === "__new__") {
      onCancelCreate();
    }
    setEditingRowId(null);
    setEditedRow(null);
  };

  const handleFieldChange = (field, value) => {
    setEditedRow((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 140,
      renderCell: (params) => params.value,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 180,
      renderCell: (params) =>
        editingRowId === params.row.id ? (
          <input
            type="text"
            value={editedRow?.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            style={{ width: "100%", padding: 4 }}
            autoFocus
          />
        ) : (
          params.value
        ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.2,
      minWidth: 200,
      renderCell: (params) =>
        editingRowId === params.row.id ? (
          <input
            type="text"
            value={editedRow?.description || ""}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            style={{ width: "100%", padding: 4 }}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.8,
      minWidth: 140,
      renderCell: (params) =>
        editingRowId === params.row.id ? (
          <input
            type="text"
            value={editedRow?.country || ""}
            onChange={(e) => handleFieldChange("country", e.target.value)}
            style={{ width: "100%", padding: 4 }}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "type",
      headerName: "Type",
      width: 130,
      renderCell: (params) =>
        editingRowId === params.row.id ? (
          <input
            type="text"
            value={editedRow?.type || ""}
            onChange={(e) => handleFieldChange("type", e.target.value)}
            style={{ width: "100%", padding: 4 }}
          />
        ) : (
          params.value
        ),
    },
    {
      field: "pricePerNight",
      headerName: "Price per Night",
      width: 150,
      renderCell: (params) =>
        editingRowId === params.row.id ? (
          <input
            type="number"
            value={editedRow?.pricePerNight || 0}
            onChange={(e) =>
              handleFieldChange(
                "pricePerNight",
                parseFloat(e.target.value) || 0
              )
            }
            style={{ width: "100%", padding: 4 }}
          />
        ) : (
          `$${params.value}`
        ),
    },
    {
      field: "lastModified",
      headerName: "Last Modified",
      width: 160,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleString() : "",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        const isEditing = editingRowId === params.row.id;
        if (isEditing) {
          return (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton
                size="small"
                color="primary"
                onClick={handleSaveClick}
                disabled={isMutating}
              >
                <SaveIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleCancelClick}
                disabled={isMutating}
              >
                <CancelIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        }

        return (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditClick(params.row)}
              disabled={isMutating || editingRowId !== null}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(params.row.id)}
              disabled={isMutating || editingRowId !== null}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const paginationModel = { page: page ?? 0, pageSize: pageSize ?? 10 };

  const handlePaginationModelChange = (model) => {
    if (typeof model.page === "number" && model.page !== page) {
      onPageChange(model.page);
    }
    if (typeof model.pageSize === "number" && model.pageSize !== pageSize) {
      onPageSizeChange(model.pageSize);
    }
  };

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      {isMutating && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.7)",
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="success"
          onClick={onCreate}
          startIcon={<AddIcon />}
          disabled={isMutating || editingRowId !== null}
        >
          Add New Destination
        </Button>
      </Box>

      <DataGrid
        rows={items}
        columns={columns}
        pagination
        paginationMode="server"
        rowCount={total}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        loading={isLoading}
        autoHeight
        disableSelectionOnClick
      />
    </Box>
  );
}
