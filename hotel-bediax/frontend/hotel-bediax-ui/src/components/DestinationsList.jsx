// tabla principal con los destinos
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDestinations, deleteDestination } from "../api/destinations";
import { FixedSizeList as List } from "react-window";
import DestinationForm from "./DestinationForm";

function Row({ index, data }) {
  const item = data[index];
  return (
    <div>
      <div style={{ flex: 1 }}>
        <strong>{item.name}</strong>
        <br />
        {item.city}, {item.country} — ${item.pricePerNight}
      </div>
      <div>
        <button onClick={() => data.onEdit(item)}>Editar</button>
        <button onClick={() => data.onDelete(item.id)}>Borrar</button>
      </div>
    </div>
  );
}

export default function DestinationsList() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["destinations"],
    queryFn: fetchDestinations,
  });

  const handleDelete = async (id) => {
    if (!confirm("Borrar destino??")) return;
    await deleteDestination(id);
    refetch();
  };

  const handleEdit = (item) => setEditing(item);
  if (isLoading) return <div>Cargando...</div>;
  if (!data) return <div>No hay datos</div>;

  const items = data.items;
  const itemData = [...items];
  itemData.onEdit = handleEdit;
  itemData.onDelete = handleDelete;

  return (
    <div>
      <div>
        <input
          placeholder="Buscar nombre, ciudad, pais"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <button onClick={() => refetch()}>Buscar</button>
      </div>
      <div>
        <List
          height={600}
          itemCount={items.length}
          itemSize={80}
          width={"100%"}
          itemData={itemData}
        >
          {Row}
        </List>
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>
          Página {page} — Total: {data.total}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * pageSize >= data.total}
        >
          Siguiente
        </button>
        <button
          onClick={() => {
            setEditing({});
          }}
        >
          Crear nuevo
        </button>
      </div>

      {editing !== null && (
        <DestinationForm
          item={editing}
          onClose={() => {
            setEditing(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}
