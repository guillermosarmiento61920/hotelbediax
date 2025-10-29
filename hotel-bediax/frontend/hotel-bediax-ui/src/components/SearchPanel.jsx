// panel de busqueda
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Slider,
  Typography,
  Paper,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export default function SearchPanel({
  cities = [],
  countries = [],
  types = [],
  onSearch,
  isLoading,
}) {
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    country: "",
    type: "",
    minPrice: 0,
    maxPrice: 500,
  });

  useEffect(() => {}, [cities, countries, types]);

  const [priceRange, setPriceRange] = useState([0, 500]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSearch = () => {
    onSearch({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleReset = () => {
    setFilters({
      name: "",
      city: "",
      country: "",
      type: "",
      minPrice: 0,
      maxPrice: 500,
    });
    setPriceRange([0, 500]);
    onSearch({
      name: "",
      city: "",
      country: "",
      type: "",
      minPrice: 0,
      maxPrice: 500,
    });
  };

  const handleTypeFilter = () => {
    onSearch({
      name: "",
      city: "",
      country: "",
      type: filters.type || "",
      minPrice: 0,
      maxPrice: 500,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: "100%", minWidth: 280 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Filter Destinations
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          placeholder="Search by name..."
        />

        <FormControl fullWidth size="small">
          <InputLabel>City</InputLabel>
          <Select
            value={filters.city}
            label="City"
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Country</InputLabel>
          <Select
            value={filters.country}
            label="Country"
            onChange={(e) =>
              setFilters({ ...filters, country: e.target.value })
            }
          >
            <MenuItem value="">
              <em>All Countries</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={filters.type}
              label="Type"
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <MenuItem value="">
                <em>All Types</em>
              </MenuItem>
              {types.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleTypeFilter}
              disabled={isLoading || !filters.type}
            >
              Filter Type
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => setFilters({ ...filters, type: "" })}
              disabled={isLoading || !filters.type}
            >
              Clear Type
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography gutterBottom>Price per Night</Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              valueLabelFormat={(value) => `$${value}`}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption">${priceRange[0]}</Typography>
              <Typography variant="caption">${priceRange[1]}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 0 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={isLoading}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset Filters
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
