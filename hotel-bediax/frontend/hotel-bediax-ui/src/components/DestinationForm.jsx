// formulario para crear o eeitar destinos

import React, { useState, useEffect } from "react";
import { createDestination, updateDestination } from "../api/destinations";

export default function DestinationForm({ item, onClose }) {
  const isNew = !item || !item.id;
  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    description: "",
    pricePerNight: 0,
  });

  useEffect(() => {
    if (item && item.id) setForm(item);
  }, [item]);

  const submit = async (e) => {
    e.preventDefault();
    if (isNew) {
      await createDestination(form);
    } else {
      await updateDestination(item.id, form);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 50,
        right: 50,
        background: "#fff",
        padding: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <h3>{isNew ? "Crear" : "Editar"} destino</h3>
      <form onSubmit={submit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nombre"
          required
        />
        <input
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          placeholder="Ciudad"
        />
        <input
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          placeholder="País"
        />
        <input
          type="number"
          value={form.pricePerNight}
          onChange={(e) =>
            setForm({ ...form, pricePerNight: parseFloat(e.target.value) })
          }
          placeholder="Precio por noche"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descripción"
        />
        <div style={{ marginTop: 8 }}>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
