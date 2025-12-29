import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent
} from "@mui/material";
import api from "../api";

const ResidentsDashboard = () => {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    const res = await api.get("/residents");
    setResidents(res.data);
  };

  /* ================= CALCULATIONS ================= */
  const totalPopulation = residents.length;
  const maleCount = residents.filter(r => r.sex === "Male").length;
  const femaleCount = residents.filter(r => r.sex === "Female").length;
  const voterCount = residents.filter(r => Number(r.is_voters) === 1).length;
  const nonVoterCount = residents.filter(r => Number(r.is_voters) === 0).length;

  return (
    <Box sx={{ p: 3 }}>

      {/* ================= TOP LONG BOX ================= */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            sx={{
              height: "100px",
              border: "2px solid #1976d2",
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
              px: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Resident Dashboard
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* ================= ROW 1 – MAIN STATS (FULL ROW) ================= */}
      <Grid container spacing={3} sx={{ mt: 2 }}>

        <Grid item xs={12} md={3}>
          <Card sx={statCardStyle}>
            <CardContent>
              <Typography variant="subtitle1">Total Population</Typography>
              <Typography variant="h3" fontWeight="bold">
                {totalPopulation}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={statCardStyle}>
            <CardContent>
              <Typography variant="subtitle1">Male</Typography>
              <Typography variant="h3" fontWeight="bold">
                {maleCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={statCardStyle}>
            <CardContent>
              <Typography variant="subtitle1">Female</Typography>
              <Typography variant="h3" fontWeight="bold">
                {femaleCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={statCardStyle}>
            <CardContent>
              <Typography variant="subtitle1">Voters</Typography>
              <Typography variant="h3" fontWeight="bold">
                {voterCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* ================= ROW 2 – EXTRA STATS ================= */}
      <Grid container spacing={3} sx={{ mt: 1 }}>

        <Grid item xs={12} md={3}>
          <Card sx={statCardStyle}>
            <CardContent>
              <Typography variant="subtitle1">Non-Voters</Typography>
              <Typography variant="h3" fontWeight="bold">
                {nonVoterCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 🔽 READY NA PARA SA IBA PANG DATA */}
        {[1, 2, 3].map((i) => (
          <Grid item xs={12} md={3} key={i}>
            <Card sx={statCardStyle}>
              <CardContent>
                <Typography variant="subtitle1">
                  Future Data
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  —
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

      </Grid>

    </Box>
  );
};

/* ================= SHARED STYLE ================= */
const statCardStyle = {
  height: "140px",
  border: "2px solid #1976d2",
  boxShadow: 2,
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: 6,
  },
};

export default ResidentsDashboard;
