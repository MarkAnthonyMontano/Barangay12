// src/pages/IncidentsPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from "../App";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  TablePagination,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import api from '../api';

const INCIDENT_TYPES = [
  'Complaint',
  'Blotter',
  'Domestic Violence',
  'Theft',
  'Vandalism',
  'Noise Disturbance',
  'Others',
];

const STATUS_OPTIONS = ['Open', 'Under Investigation', 'Closed'];

const initialForm = {
  incident_date: '',
  incident_type: 'Complaint',
  location: '',
  description: '',
  complainant_id: '',
  respondent_id: '',
  status: 'Open',
};

const IncidentsPage = () => {
  const { settings } = useContext(SettingsContext);
  const [residents, setResidents] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorForm, setErrorForm] = useState('');

  // Edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState('');

  // Delete confirmation
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 100; // change if you want

  const fetchResidents = async () => {
    try {
      const res = await api.get('/residents');
      setResidents(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching residents');
    }
  };

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/incidents');
      setIncidents(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching incidents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
    fetchIncidents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorForm('');

    if (!form.incident_date || !form.incident_type) {
      setErrorForm('Date & time and Incident Type are required.');
      return;
    }

    try {
      setSaving(true);
      await api.post('/incidents', form);
      setForm(initialForm);
      await fetchIncidents();
    } catch (err) {
      console.error(err);
      setErrorForm(err.response?.data?.message || 'Error saving incident');
    } finally {
      setSaving(false);
    }
  };

  const residentName = (id) => {
    const r = residents.find((x) => x.id === id);
    if (!r) return '';
    return `${r.last_name}, ${r.first_name}`;
  };

  const formatDateTime = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString('en-PH', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const filteredIncidents = incidents.filter((i) => {
    const dateOnly = i.incident_date ? i.incident_date.slice(0, 10) : '';
    const matchFrom = !dateFrom || dateOnly >= dateFrom;
    const matchTo = !dateTo || dateOnly <= dateTo;
    const matchStatus = statusFilter === 'All' || i.status === statusFilter;

    // searchType/Location/Names
    const complainant = residentName(i.complainant_id);
    const respondent = residentName(i.respondent_id);
    const haystack = (
      `${i.incident_type || ''} ${i.location || ''} ${complainant} ${respondent}`
    ).toLowerCase();
    const matchSearch =
      !searchText.trim() ||
      haystack.includes(searchText.trim().toLowerCase());

    return matchFrom && matchTo && matchStatus && matchSearch;
  });

  const pagedIncidents = filteredIncidents.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );


  const totalPages = Math.ceil(filteredIncidents.length / rowsPerPage);


  useEffect(() => {
    setPage(1);
  }, [dateFrom, dateTo, statusFilter, searchText]);

  // Edit
  const handleEditClick = (incident) => {
    setErrorEdit('');
    setEditData({
      ...incident,
      incident_date: incident.incident_date
        ? incident.incident_date.slice(0, 16)
        : '',
    });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    setErrorEdit('');
    if (!editData.incident_date || !editData.incident_type) {
      setErrorEdit('Date & time and Incident Type are required.');
      return;
    }

    try {
      setSavingEdit(true);
      await api.put(`/incidents/${editData.id}`, editData);
      setEditOpen(false);
      setEditData(null);
      await fetchIncidents();
    } catch (err) {
      console.error(err);
      setErrorEdit(err.response?.data?.message || 'Error updating incident');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditData(null);
  };

  // Delete
  const handleDeleteClick = (incident) => {
    setDeleteTarget(incident);
    setDeleteOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteOpen(false);
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await api.delete(`/incidents/${deleteTarget.id}`);
      setDeleteOpen(false);
      setDeleteTarget(null);
      await fetchIncidents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error deleting incident');
    } finally {
      setDeleting(false);
    }
  };

  const [myRole, setMyRole] = useState("");
  const [myData, setMyData] = useState(null);
  const [myAction, setMyAction] = useState("");

  useEffect(() => {
    const fetchMyRole = async () => {
      try {
        const res = await api.get("/auth/me");
        setMyRole(res.data.role);
        setMyData(res.data);

      } catch (err) {
        console.error(err);
        showSnackbar("Failed to get my role", "error");
      }
    };

    fetchMyRole();
  }, []);

  const AuditMyAction = async (actionMessage) => {
    if (!myData) return;

    try {
      const actor_name = `${myData.full_name} (${myData.username})`;
      const actor_message = `User ${actor_name} ${actionMessage}`;

      await api.post("/audit_my_action", {
        official_id: myData.official_id,
        username: actor_name,
        message: actor_message,
        role: myRole,
      });

    } catch (err) {
      console.error(err);
      showSnackbar("Failed to audit this action", "error");
    }
  };

  return (
      <Box sx={{ p: 1, pr: 4, height: "calc(100vh - 150px)", overflowY: "auto" }}>
      {/* PAGE TITLE */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "times new roman", fontSize: "36px" }}>
          INCIDENT REPORTS / BLOTTER
        </Typography>
      </Box>

      <hr style={{ border: "1px solid #ccc", width: "100%" }} />
      <br />

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",

          border: "1px solid #ddd",
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: settings?.header_color || "#1976d2",

            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "3px solid black"


                }}
              >
                Incident Reports / Blotter
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Paper sx={{ p: 2, mb: 3, mt: -.5, border: "2px solid black" }} elevation={2}>

        <Typography variant="h6" gutterBottom>
          Add Incident
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                type="datetime-local"
                label="Date & Time"
                name="incident_date"
                value={form.incident_date}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Incident Type</InputLabel>
                <Select
                  label="Incident Type"
                  sx={{ width: "223px" }}
                  name="incident_type"
                  value={form.incident_type}
                  onChange={handleChange}
                >
                  {INCIDENT_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Location"
                name="location"
                sx={{ width: "223px" }}
                value={form.location}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Complainant</InputLabel>
                <Select
                  label="Complainant"
                  name="complainant_id"
                  sx={{ width: "223px" }}
                  value={form.complainant_id}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {residents.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.last_name}, {r.first_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Respondent</InputLabel>
                <Select
                  label="Respondent"
                  name="respondent_id"
                  sx={{ width: "223px" }}
                  value={form.respondent_id}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {residents.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.last_name}, {r.first_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  name="status"
                  sx={{ width: "223px" }}
                  value={form.status}
                  onChange={handleChange}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
                style={{ width: "500px", height: "100px" }}
                maxRows={6}
              />
            </Grid>

            {errorForm && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2">
                  {errorForm}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button sx={{height: "55px", width: "223px"}}type="submit" variant="contained" disabled={saving || myRole === 'User'}>
                {saving ? 'Saving...' : 'Save Incident'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Incident List */}
      <Paper sx={{ p: 2, border: "2px solid black" }} elevation={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // ⬅ split left & right
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          {/* LEFT SIDE */}
          <Typography variant="h6">
            Incident List
          </Typography>

          {/* RIGHT SIDE FILTERS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <TextField
              type="date"
              size="small"
              label="From"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              type="date"
              size="small"
              label="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {STATUS_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              size="small"
              label="Search (type / location / name)"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ minWidth: 260 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>


        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "gray" }}>
              <TableRow>
                <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>ID</TableCell>
                <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Date/Time</TableCell>
                <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Type</TableCell>
                <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Location</TableCell>
                <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Complainant</TableCell>
                <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Respondent</TableCell>
                <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Status</TableCell>
                <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedIncidents.map((i) => (
                <TableRow key={i.id}>
                  <TableCell sx={{ border: "2px solid black", textAlign: "center" }}>{i.id}</TableCell>
                  <TableCell sx={{ border: "2px solid black", textAlign: "center" }}>{formatDateTime(i.incident_date)}</TableCell>
                  <TableCell sx={{ border: "2px solid black", textAlign: "center" }}>{i.incident_type}</TableCell>
                  <TableCell sx={{ border: "2px solid black", textAlign: "center" }}>{i.location || ''}</TableCell>
                  <TableCell sx={{ border: "2px solid black", textAlign: "center" }}>{residentName(i.complainant_id)}</TableCell>
                  <TableCell sx={{ border: "2px solid black", textAlign: "center" }}>{residentName(i.respondent_id)}</TableCell>
                  <TableCell sx={{ border: "2px solid black", textAlign: "center" }}>{i.status}</TableCell>
                  <TableCell sx={{ color: "black", textAlign: "center", width: "15%", py: 0.5, fontSize: "12px", border: "2px solid black" }} align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "green",
                          color: "white",
                          mr: 1,
                          width: "80px"
                        }}
                        onClick={() => handleEditClick(i)}
                        disabled={myRole === "User"}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        sx={{
                          backgroundColor: "#9E0000",
                          color: "white",
                          width: "80px"
                        }}
                        onClick={() => handleDeleteClick(i)}
                        disabled={myRole === "User"}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {pagedIncidents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No incidents found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
            px: 2,

            pt: 2,

            height: "70px",
          }}
        >
          <Button
            variant="contained"
            disabled={page === 1}
            sx={{ backgroundColor: "gray", width: "100px", border: "2px solid black" }}
            onClick={() => setPage(1)}
          >
            FIRST
          </Button>

          <Button
            variant="contained"
            disabled={page === 1}
            sx={{ backgroundColor: "gray", width: "100px", border: "2px solid black" }}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            PREVIOUS
          </Button>

          <Typography sx={{ mx: 1, fontWeight: "bold" }}>
            Page {page} of {totalPages || 1}
          </Typography>

          <Button
            variant="contained"
            disabled={page === totalPages || totalPages === 0}
            sx={{ backgroundColor: "gray", width: "100px", border: "2px solid black" }}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            NEXT
          </Button>

          <Button
            variant="contained"
            disabled={page === totalPages || totalPages === 0}
            sx={{ backgroundColor: "gray", width: "100px", border: "2px solid black" }}
            onClick={() => setPage(totalPages)}
          >
            LAST
          </Button>
        </Box>
      </Paper>

      {/* Edit Incident Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Incident</DialogTitle>
        <DialogContent dividers>
          {editData && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  type="datetime-local"
                  label="Date & Time"
                  name="incident_date"
                  value={editData.incident_date || ''}
                  onChange={handleEditChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Incident Type</InputLabel>
                  <Select
                    label="Incident Type"
                    name="incident_type"
                    value={editData.incident_type || ''}
                    onChange={handleEditChange}
                  >
                    {INCIDENT_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Location"
                  name="location"
                  value={editData.location || ''}
                  onChange={handleEditChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Complainant</InputLabel>
                  <Select
                    label="Complainant"
                    name="complainant_id"
                    value={editData.complainant_id || ''}
                    onChange={handleEditChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {residents.map((r) => (
                      <MenuItem key={r.id} value={r.id}>
                        {r.last_name}, {r.first_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Respondent</InputLabel>
                  <Select
                    label="Respondent"
                    name="respondent_id"
                    value={editData.respondent_id || ''}
                    onChange={handleEditChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {residents.map((r) => (
                      <MenuItem key={r.id} value={r.id}>
                        {r.last_name}, {r.first_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={editData.status || ''}
                    onChange={handleEditChange}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"

                  value={editData.description || ''}
                  onChange={handleEditChange}
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={6}
                />
              </Grid>

              {errorEdit && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2">
                    {errorEdit}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={async () => {
              await handleEditSave();
              await AuditMyAction("Updated resident information in Incident Page");
            }}
            variant="contained"
            disabled={savingEdit}
          >
            {savingEdit ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Incident</DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to delete incident{' '}
            <strong>#{deleteTarget?.id}</strong> (
            {deleteTarget?.incident_type})?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              await handleDeleteConfirm();
              await AuditMyAction("Deleted resident information in Incident Page");
            }}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IncidentsPage;
