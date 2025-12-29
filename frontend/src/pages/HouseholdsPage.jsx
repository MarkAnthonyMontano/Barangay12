// src/pages/HouseholdsPage.jsx
import React, { useEffect, useMemo, useState, useContext } from 'react';
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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import api from '../api';

const initialHouseholdForm = {
  household_name: '',
  address: '',
  purok: '',
};

const HouseholdsPage = () => {
  const { settings } = useContext(SettingsContext);
  const [households, setHouseholds] = useState([]);
  const [residents, setResidents] = useState([]);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [members, setMembers] = useState([]);
  const [householdForm, setHouseholdForm] = useState(initialHouseholdForm);
  const [memberForm, setMemberForm] = useState({
    resident_id: '',
    relation_to_head: '',
  });

  const [purokFilter, setPurokFilter] = useState('All');
  const [searchName, setSearchName] = useState('');

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [dropConfirmOpen, setDropConfirmOpen] = useState(false);
  const [memberToDrop, setMemberToDrop] = useState(null);


  const fetchHouseholds = async () => {
    try {
      const res = await api.get('/households');
      setHouseholds(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching households');
    }
  };

  const fetchResidents = async () => {
    try {
      const res = await api.get('/residents');
      setResidents(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching residents');
    }
  };

  const fetchMembers = async (householdId) => {
    try {
      const res = await api.get(`/households/${householdId}/members`);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching household members');
    }
  };

  useEffect(() => {
    fetchHouseholds();
    fetchResidents();
  }, []);

  const onHouseholdFormChange = (e) => {
    const { name, value } = e.target;
    setHouseholdForm((prev) => ({ ...prev, [name]: value }));
  };

  const onMemberFormChange = (e) => {
    const { name, value } = e.target;
    setMemberForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateHousehold = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/households', householdForm);
      await AuditMyAction("Added new household record in Household Page");
      setHouseholdForm(initialHouseholdForm);
      fetchHouseholds();
      setSelectedHousehold(res.data);
      fetchMembers(res.data.id);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error creating household');
    }
  };

  const handleSelectHousehold = (h) => {
    setSelectedHousehold(h);
    fetchMembers(h.id);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedHousehold) {
      alert('Select a household first.');
      return;
    }
    if (!memberForm.resident_id) {
      alert('Select a resident.');
      return;
    }

    try {
      await api.post(`/households/${selectedHousehold.id}/members`, memberForm);
      await AuditMyAction(`Added a new member in the household ${selectedHousehold.household_name} in Household Pages`);
      setMemberForm({ resident_id: '', relation_to_head: '' });
      fetchMembers(selectedHousehold.id);
      fetchHouseholds();
    } catch (err) {
      console.error(err);
      alert('Error adding member');
    }
  };

  // Filters
  const purokOptions = useMemo(() => {
    const set = new Set();
    households.forEach((h) => {
      if (h.purok) set.add(h.purok);
    });
    return Array.from(set).sort();
  }, [households]);

  const filteredHouseholds = households.filter((h) => {
    const matchPurok = purokFilter === 'All' || h.purok === purokFilter;
    const matchName =
      h.household_name.toLowerCase().includes(searchName.toLowerCase()) ||
      h.address.toLowerCase().includes(searchName.toLowerCase());
    return matchPurok && matchName;
  });

  const handleEditClick = (household) => {
    setEditData({ ...household });
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      setSavingEdit(true);
      await api.put(`/households/${editData.id}`, editData);
      setEditOpen(false);
      setEditData(null);
      fetchHouseholds();
      if (selectedHousehold && selectedHousehold.id === editData.id) {
        setSelectedHousehold(editData);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error updating household');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const handleDropClick = (member) => {
    setMemberToDrop(member);
    setDropConfirmOpen(true);
  };

  const confirmDropMember = async () => {
    if (!selectedHousehold || !memberToDrop) return;

    try {
      await api.delete(
        `/households/${selectedHousehold.id}/members/${memberToDrop.resident_id}`
      );

      await AuditMyAction(
        `removed ${memberToDrop.first_name} ${memberToDrop.last_name} from household ${selectedHousehold.household_name}`
      );

      fetchMembers(selectedHousehold.id);
      fetchHouseholds();

      setDropConfirmOpen(false);
      setMemberToDrop(null);
    } catch (err) {
      console.error(err);
      alert("Failed to drop member");
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
          HOUSEHOLD
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
                Household
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, mb: 3, border: "2px solid black", }} elevation={2}>
            <Typography variant="h6" gutterBottom>
              Create Household
            </Typography>
            <Box component="form" onSubmit={handleCreateHousehold} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Household Name"
                    name="household_name"
                    value={householdForm.household_name}
                    onChange={onHouseholdFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={householdForm.address}
                    onChange={onHouseholdFormChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Purok"
                    name="purok"
                    value={householdForm.purok}
                    onChange={onHouseholdFormChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button sx={{ height: "55px", width: "223px" }} disabled={myRole === "User"} type="submit" variant="contained">
                    Save Household
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, border: "2px solid black" }} elevation={2}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                mb: 2,

              }}
            >
              <Typography variant="h6">Household List</Typography>
              <TextField
                size="small"
                label="Search (household / address)"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <FormControl size="small">
                <InputLabel>Purok</InputLabel>
                <Select
                  label="Purok"
                  value={purokFilter}
                  onChange={(e) => setPurokFilter(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  {purokOptions.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead sx={{ backgroundColor: "gray" }}>
                  <TableRow>
                    <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>ID</TableCell>
                    <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Household Name</TableCell>
                    <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Address</TableCell>
                    <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Purok</TableCell>
                    <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Members</TableCell>
                    <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }} align="center">Actions</TableCell>
                    <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }} align="center">Select</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredHouseholds.map((h) => (
                    <TableRow
                      key={h.id}
                      hover
                      selected={selectedHousehold?.id === h.id}
                    >
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>{h.id}</TableCell>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>{h.household_name}</TableCell>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>{h.address}</TableCell>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>{h.purok || ''}</TableCell>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>{h.member_count}</TableCell>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }} align="center">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "green",
                            color: "white",
                            width: "80px",
                            "&:hover": {
                              backgroundColor: "#0b7a0b",
                            },
                          }}
                          disabled={myRole === "User"}
                          onClick={() => handleEditClick(h)}
                        >
                          Edit
                        </Button>
                      </TableCell>

                      <TableCell
                        sx={{ border: "2px solid black", textAlign: "center", color: "black" }}
                        align="center"
                      >
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => handleSelectHousehold(h)}
                        >
                          View
                        </Button>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          {selectedHousehold ? (
            <Paper sx={{ p: 2, border: "2px solid black", height: "800px", width: "680px" }} elevation={2}>
              <Typography variant="h6" gutterBottom>
                Members of: {selectedHousehold.household_name} (ID:{' '}
                {selectedHousehold.id})
              </Typography>

              <Box
                component="form"
                onSubmit={handleAddMember}
                noValidate
                sx={{ mb: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Resident</InputLabel>
                      <Select
                        label="Resident"
                        name="resident_id"
                        sx={{ width: "200px" }}
                        value={memberForm.resident_id}
                        onChange={onMemberFormChange}
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
                    <TextField
                      label="Relation to Head"
                      name="relation_to_head"
                      sx={{ width: "200px" }}
                      value={memberForm.relation_to_head}
                      onChange={onMemberFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button sx={{ height: "55px", width: "200px" }} disabled={myRole === "User"} type="submit" variant="contained">
                      Add Member
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ backgroundColor: "gray" }}>
                    <TableRow>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>ID</TableCell>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Resident</TableCell>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Relation</TableCell>
                      <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>{m.id}</TableCell>
                        <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>
                          {m.last_name}, {m.first_name} {m.middle_name}
                        </TableCell>
                        <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>{m.relation_to_head || ''}</TableCell>
                        <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "black" }}>
                          <Button
                            variant="contained"
                            disabled={myRole === "User"}
                            onClick={() => handleDropClick(m)}
                          >
                            Drop Member
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ) : (
            <Typography variant="body1">
              Select a household from the left to view and manage members.
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Edit Household Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Household</DialogTitle>
        <DialogContent dividers>
          {editData && (
            <Box sx={{ mt: 1 }}>
              <TextField
                sx={{ mb: 2 }}
                label="Household Name"
                name="household_name"
                value={editData.household_name}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                sx={{ mb: 2 }}
                label="Address"
                name="address"
                value={editData.address}
                onChange={handleEditChange}
                fullWidth
              />
              <TextField
                label="Purok"
                name="purok"
                value={editData.purok || ''}
                onChange={handleEditChange}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            disabled={savingEdit}
          >
            {savingEdit ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dropConfirmOpen}
        onClose={() => setDropConfirmOpen(false)}
      >
        <DialogTitle>Confirm Remove Member</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to remove{" "}
            <b>
              {memberToDrop?.first_name} {memberToDrop?.last_name}
            </b>{" "}
            from household{" "}
            <b>{selectedHousehold?.household_name}</b>?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDropConfirmOpen(false)}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={confirmDropMember}
          >
            Yes, Remove
          </Button>
        </DialogActions>
      </Dialog>

    </Box>

  );
};

export default HouseholdsPage;
