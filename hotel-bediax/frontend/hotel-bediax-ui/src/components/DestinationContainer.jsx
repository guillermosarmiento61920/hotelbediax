// contenedor para hacer fetchs y pasar datos
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDestinations,
  deleteDestination,
  createDestination,
  updateDestination,
  fetchCities,
  fetchCountries,
  fetchTypes,
} from "../api/destinations";
import DestinationTable from "./DestinationTable";
import SearchPanel from "./SearchPanel";
import { Box } from "@mui/material";

export default function DestinationContainer() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    country: "",
    type: "",
    minPrice: 0,
    maxPrice: 500,
  });
  const [isMutating, setIsMutating] = useState(false);
  const [newRowId, setNewRowId] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["destinations", page, pageSize, filters],
    queryFn: ({ queryKey }) => {
      const [, qPage, qPageSize, qFilters] = queryKey;
      return fetchDestinations({
        page: qPage,
        pageSize: qPageSize,
        ...qFilters,
      });
    },
    keepPreviousData: true,
  });

  const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
  });

  const { data: countries = [] } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const { data: types = [] } = useQuery({
    queryKey: ["types"],
    queryFn: fetchTypes,
  });

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar destino?")) return;
    setIsMutating(true);
    try {
      await deleteDestination(id);
      await refetch();
    } catch (error) {
      console.error("Error Borrando destino:", error);
      alert("Error al borrar el destino");
    } finally {
      setIsMutating(false);
    }
  };

  const handleEdit = async (updatedRow) => {
    setIsMutating(true);
    try {
      if (updatedRow.__isNew) {
        await createDestination({
          name: updatedRow.name,
          city: updatedRow.city,
          country: updatedRow.country,
          pricePerNight: Number(updatedRow.pricePerNight) || 0,
          description: updatedRow.description,
          type: updatedRow.type || "city",
        });
      } else {
        await updateDestination(updatedRow.id, {
          name: updatedRow.name,
          city: updatedRow.city,
          country: updatedRow.country,
          pricePerNight: Number(updatedRow.pricePerNight) || 0,
          description: updatedRow.description,
          type: updatedRow.type || "city",
        });
      }
      await refetch();
    } catch (error) {
      console.error("Error guardando destino:", error);
      alert("Error al guardar el destino");
    } finally {
      setIsMutating(false);
    }
  };

  const handleCreate = () => {
    setNewRowId("__new__");
  };

  const handleCancelCreate = () => {
    setNewRowId(null);
  };

  const handlePageChange = (newPageZeroBased) => {
    setPage(newPageZeroBased + 1);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const displayItems = data?.items || [];
  const itemsWithNew = newRowId
    ? [
        {
          id: "__new__",
          __isNew: true,
          name: "",
          city: "",
          country: "",
          pricePerNight: 0,
          description: "",
          type: "",
        },
        ...displayItems,
      ]
    : displayItems;

  return (
    <Box sx={{ display: "flex", gap: 3, height: "100%" }}>
      <Box sx={{ flexShrink: 0 }}>
        <SearchPanel
          cities={cities}
          countries={countries}
          types={types}
          onSearch={handleSearch}
          isLoading={isLoading || isMutating}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <DestinationTable
          items={itemsWithNew}
          total={data?.total || 0}
          page={page - 1}
          pageSize={pageSize}
          isLoading={isLoading}
          isMutating={isMutating}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
          onCancelCreate={handleCancelCreate}
        />
      </Box>
    </Box>
  );
}
