import React, { useEffect, useState, useContext } from 'react';
import { SettingsContext } from "../App";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TableContainer,
  Box,
} from "@mui/material";
import api from "../api";

/**
 * Print / Resident request types
 * BACKEND VALUE  ->  UI LABEL
 */
const REQUEST_TYPE_LABELS = {
  barangay_id: "Barangay ID",
};

/**
 * Safe formatter if label is missing
 * barangay_clearance -> Barangay Clearance
 */
const formatRequestType = (type) =>
  type
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function RequestPanel() {
  const { settings } = useContext(SettingsContext);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const rowsPerPage = 100;

  // Pagination states
  const [pendingPage, setPendingPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);

  const [loadingId, setLoadingId] = useState(null);

  const fetchData = async () => {
    try {
      const [p, a, r] = await Promise.all([
        api.get("/admin/print-requests/pending"),
        api.get("/admin/print-requests/approved"),
        api.get("/admin/print-requests/rejected"),
      ]);
      setPending(p.data);
      setApproved(a.data);
      setRejected(r.data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    // find item in pending
    const request = pending.find((r) => r.id === id);
    if (!request) return;

    // 1️⃣ INSTANT UI UPDATE (no delay)
    setPending((prev) => prev.filter((r) => r.id !== id));

    if (status === "approved") {
      setApproved((prev) => [
        { ...request, days_left: request.days_left ?? 7 },
        ...prev,
      ]);
    } else {
      setRejected((prev) => [...prev, request]);
    }

    // 2️⃣ BACKEND UPDATE (async, user doesn’t feel it)
    try {
      await api.put(`/admin/print-requests/${id}`, { status });
    } catch (err) {
      console.error(err);
      // rollback if backend fails
      fetchData();
    }
  };

  const deleteHistory = async (type) => {
    if (!window.confirm(`Delete all ${type} history?`)) return;
    await api.delete(`/admin/print-requests/${type}`);
    fetchData();
  };

  const paginate = (data, page) => {
    const totalPages = Math.max(1, Math.ceil(data.length / rowsPerPage));
    const pagedData = data.slice(
      (page - 1) * rowsPerPage,
      page * rowsPerPage
    );
    return { pagedData, totalPages };
  };

  const renderTable = (data, actions, showStatusColumn) => (
    <TableContainer>
      <Table size="small">
        <TableHead sx={{ backgroundColor: "gray" }}>
          <TableRow>
            <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>
              <strong>Name</strong>
            </TableCell>
            <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>
              <strong>Requested By</strong>
            </TableCell>
            <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>
              <strong>Request Type</strong>
            </TableCell>
            {actions && (
              <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>
                <strong>Actions</strong>
              </TableCell>
            )}
            {showStatusColumn && !actions && (
              <TableCell sx={{ border: "2px solid black", textAlign: "center", color: "white", }}>
                <strong>Status</strong>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.id}>
              <TableCell sx={{ border: "2px solid black" }}>
                {r.last_name}, {r.first_name}
              </TableCell>
              <TableCell sx={{ border: "2px solid black" }}>
                {r.requester_name}
              </TableCell>
              <TableCell sx={{ border: "2px solid black" }}>
                {REQUEST_TYPE_LABELS[r.request_type] ||
                  formatRequestType(r.request_type)}
              </TableCell>

              {actions && (
                <TableCell
                  sx={{ border: "2px solid black", textAlign: "center" }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                    disabled={loadingId === r.id}
                    onClick={() => updateStatus(r.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    disabled={loadingId === r.id}
                    onClick={() => updateStatus(r.id, "rejected")}
                  >
                    Reject
                  </Button>
                </TableCell>
              )}

              {showStatusColumn && !actions && (
                <TableCell sx={{ border: "2px solid black" }}>
                  {r.days_left != null
                    ? `Approved (${r.days_left} days left)`
                    : "Rejected"}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const PaginationControls = ({ page, setPage, totalPages }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        mt: 1,
      }}
    >
      <Button
        variant="contained"
        disabled={page === 1}
        onClick={() => setPage(1)}
        sx={{ width: 70 }}
      >
        FIRST
      </Button>
      <Button
        variant="contained"
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        sx={{ width: 90 }}
      >
        PREV
      </Button>
      <Typography sx={{ mx: 1, fontWeight: "bold" }}>
        {page} / {totalPages}
      </Typography>
      <Button
        variant="contained"
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        sx={{ width: 70 }}
      >
        NEXT
      </Button>
      <Button
        variant="contained"
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}
        sx={{ width: 70 }}
      >
        LAST
      </Button>
    </Box>
  );

  const { pagedData: pendingData, totalPages: pendingTotal } =
    paginate(pending, pendingPage);
  const { pagedData: approvedData, totalPages: approvedTotal } =
    paginate(approved, approvedPage);
  const { pagedData: rejectedData, totalPages: rejectedTotal } =
    paginate(rejected, rejectedPage);

  return (
    <Box sx={{ p: 1, pr: 4, height: "calc(100vh - 150px)", overflowY: "auto" }}>
      {/* PAGE TITLE */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", fontFamily: "times new roman", fontSize: "36px" }}>
          REQUEST PANEL
        </Typography>
      </Box>

      <hr style={{ border: "1px solid #ccc", width: "100%" }} />
      <br />

      {/* Pending */}
      <Paper sx={{ p: 2, mb: 3, border: "2px solid black" }}>
        <Typography variant="h6" gutterBottom align="center">
          Pending
        </Typography>
        {pending.length ? (
          renderTable(pendingData, true, false)
        ) : (
          <Typography color="text.secondary">
            No pending requests.
          </Typography>
        )}
        {pending.length > rowsPerPage && (
          <PaginationControls
            page={pendingPage}
            setPage={setPendingPage}
            totalPages={pendingTotal}
          />
        )}
      </Paper>

      {/* Approved */}
      <Paper sx={{ p: 2, mb: 3, border: "2px solid black" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6">Approved</Typography>
          <Button
            sx={{ backgroundColor: "red", color: "#fff" }}
            size="small"
            onClick={() => deleteHistory("approved")}
          >
            Delete All
          </Button>
        </Box>
        {approved.length ? (
          renderTable(approvedData, false, true)
        ) : (
          <Typography color="text.secondary">
            No approved history.
          </Typography>
        )}
        {approved.length > rowsPerPage && (
          <PaginationControls
            page={approvedPage}
            setPage={setApprovedPage}
            totalPages={approvedTotal}
          />
        )}
      </Paper>

      {/* Rejected */}
      <Paper sx={{ p: 2, mb: 3, border: "2px solid black" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6">Rejected</Typography>
          <Button
            sx={{ backgroundColor: "red", color: "#fff" }}
            size="small"
            onClick={() => deleteHistory("rejected")}
          >
            Delete All
          </Button>
        </Box>
        {rejected.length ? (
          renderTable(rejectedData, false, true)
        ) : (
          <Typography color="text.secondary">
            No rejected history.
          </Typography>
        )}
        {rejected.length > rowsPerPage && (
          <PaginationControls
            page={rejectedPage}
            setPage={setRejectedPage}
            totalPages={rejectedTotal}
          />
        )}
      </Paper>
    </Box>
  );
}
