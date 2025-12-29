import React, { useEffect, useState, useContext } from "react";
import { SettingsContext } from "../App";
import {
  Box,
  Button,
  Container,
  Typography,
  Modal,
  Fade,
  Backdrop,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Close as CloseIcon
} from "@mui/icons-material";
import api from "../api";
import API_BASE_URL from "../ApiConfig";

const API_ROOT = `${API_BASE_URL}`;

export default function AuthPage({ onLogin, goForgotPassword }) {


  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingUser, setPendingUser] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [otpCooldown, setOtpCooldown] = useState(300);


  useEffect(() => {
    let timer;
    if (otpModalOpen && otpCooldown > 0) {
      timer = setInterval(() => {
        setOtpCooldown((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [otpModalOpen, otpCooldown]);

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeError = (err) => {
    const msg = err?.response?.data?.message;
    if (msg) return msg;
    return "Login failed. Please check username/password.";
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", loginForm);

      if (res.data.require_otp) {
        setPendingUser({ username: loginForm.username });
        setOtpModalOpen(true);
        showSnackbar(res.data.message, "success");
      } else {
        onLogin({ token: res.data.token, user: res.data.user });
      }
    } catch (err) {
      showSnackbar(normalizeError(err), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (!pendingUser) return;
    setLoading(true);

    try {
      const res = await api.post("/auth/verify-otp", {
        username: pendingUser.username,
        otp,
      });

      showSnackbar(res.data.message, "success");
      onLogin({ token: res.data.token, user: res.data.user });
      setOtpModalOpen(false);
      setOtp("");
    } catch (err) {
      showSnackbar(err?.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!pendingUser || resendCooldown > 0) return;
    setLoading(true);

    try {
      await api.post("/auth/request-otp", { username: pendingUser.username });
      showSnackbar("OTP has been resent to your email.", "success");
      setOtpCooldown(300);
    } catch (err) {
      showSnackbar(err?.response?.data?.message || "Failed to resend OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await api.get("/public/settings");
      setSettings(res.data);
    } catch (err) {
      console.log("Settings fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleLoginKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLoginSubmit(e);
    }
  };

  // 🔒 Disable right-click
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // 🔒 Block DevTools shortcuts + Ctrl+P silently
  document.addEventListener('keydown', (e) => {
    const isBlockedKey =
      e.key === 'F12' || // DevTools
      e.key === 'F11' || // Fullscreen
      (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j')) || // Ctrl+Shift+I/J
      (e.ctrlKey && e.key.toLowerCase() === 'u') || // Ctrl+U (View Source)
      (e.ctrlKey && e.key.toLowerCase() === 'p');   // Ctrl+P (Print)

    if (isBlockedKey) {
      e.preventDefault();
      e.stopPropagation();
    }
  });


    // 🔒 Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // 🔒 Block DevTools shortcuts + Ctrl+P silently
    document.addEventListener('keydown', (e) => {
        const isBlockedKey =
            e.key === 'F12' || // DevTools
            e.key === 'F11' || // Fullscreen
            (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j')) || // Ctrl+Shift+I/J
            (e.ctrlKey && e.key.toLowerCase() === 'u') || // Ctrl+U (View Source)
            (e.ctrlKey && e.key.toLowerCase() === 'p');   // Ctrl+P (Print)

        if (isBlockedKey) {
            e.preventDefault();
            e.stopPropagation();
        }
    });



  return (
    <Box sx={{ height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
      <Box>
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "-10vh" }} maxWidth={false}>
          <div
            className="Container"
            style={{
              transform: "scale(0.8)",
              marginTop: "-7.5%",
              backgroundColor: "white",
              height: "fit-content",
              maxWidth: "540px",
              width: "100%",
              borderRadius: "10px",
              overflow: "visible",
              border: "5px solid black"
            }}
          >
            <div
              className="Header"
              style={{
                backgroundColor: settings?.header_color || "#1976d2",
                padding: "20px",
                borderBottom: "3px solid black",
                borderRadius: "5px 5px 0px 0px"
              }}
            >
              <div
                className="HeaderTitle"
                style={{ width: "100%", display: "flex", marginTop: "6px", justifyContent: "center" }}
              >
                <div className="CircleCon">
                  {settings?.logo_url && (
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                      <img
                        draggable="false"
                        src={`${API_ROOT}${settings.logo_url}`}
                        alt="Logo"
                        style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: "3px solid black", userSelect: "none" }}
                      />
                    </Box>
                  )}
                </div>
              </div>
              <div className="HeaderBody" style={{ textAlign: "center", color: "white", marginTop: "-3px", letterSpacing: "1px" }}>
                <strong style={{ color: "white", fontSize: "24px", fontWeight: "600", userSelect: "none" }}>
                  {settings?.company_name || "Company Name"}
                </strong>
                <Typography variant="body2" textAlign="center" sx={{ mb: 3, opacity: 0.8, userSelect: "none" }}>
                  {settings?.address || "Company Address"}
                </Typography>
              </div>
            </div>

            <div className="Body" style={{ padding: "30px 28px 0px 28px" }}>
              {/* Username Field */}
              <div className="TextField" style={{ position: "relative", display: "flex", marginBottom: "20px", flexDirection: "column" }}>
                <label htmlFor="username" style={{ fontWeight: "500", color: "rgba(0, 0, 0, 0.6)", marginBottom: "5px", userSelect: "none" }}>
                  Email Address:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your Username or Email Address"
                  value={loginForm.username}
                  onChange={handleLoginChange}
                  onKeyDown={handleLoginKeyDown}
                  style={{ width: "430px", paddingRight: "15px", paddingLeft: "2.5rem", paddingTop: "13px", paddingBottom: "12px", border: "2px solid black", borderRadius: "8px", outline: "none", fontSize: "16px", cursor: "pointer" }}
                  autoFocus
                />
                <EmailIcon style={{ position: "absolute", top: "2.5rem", left: "0.7rem", color: "rgba(0,0,0,0.4)" }} />
              </div>

              {/* Password Field */}
              <div className="TextField" style={{ position: "relative", display: "flex", marginBottom: "20px", flexDirection: "column" }}>
                <label htmlFor="password" style={{ fontWeight: "500", color: "rgba(0, 0, 0, 0.6)", marginBottom: "5px", userSelect: "none" }}>
                  Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  onKeyDown={handleLoginKeyDown}
                  style={{ width: "430px", paddingRight: "15px", paddingLeft: "2.5rem", paddingTop: "13px", paddingBottom: "12px", border: "2px solid black", borderRadius: "8px", outline: "none", cursor: "pointer", fontSize: "16px" }}
                  autoFocus
                />
                <LockIcon style={{ position: "absolute", top: "2.5rem", left: "0.7rem", color: "rgba(0,0,0,0.4)" }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: "rgba(0,0,0,0.3)", outline: "none", position: "absolute", top: "2.5rem", right: "1rem", background: "none", border: "none", cursor: "pointer", marginBottom: "50px" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </button>
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, height: 45, mb: 4, backgroundColor: settings?.main_button_color || "#1976d2", "&:hover": { backgroundColor: settings?.main_button_color || "#1565c0" } }}
                disabled={loading}
                onClick={handleLoginSubmit}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <Typography
                  onClick={goForgotPassword}
                  sx={{
                    cursor: "pointer",
                    fontWeight: 500,
                    color: "#000",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    userSelect: "none",
                  }}
                >
                  Forgot your password?
                </Typography>
              </div>


            </div>

            <div className="Footer" style={{ padding: "16px 12px", textAlign: "center", fontSize: "15px", color: "rgba(0,0,0,0.6)", backgroundColor: "rgba(243, 219, 173, 0.531)", borderRadius: "0px 0px 10px 10px", marginTop: "15px", width: "100%", boxSizing: "border-box", overflowWrap: "break-word", wordBreak: "break-word" }}>
              <div className="FooterText" style={{ userSelect: "none" }}>
                &copy; {new Date().getFullYear()} {settings?.company_name || "Barangay"} Student Information System. All rights reserved.
              </div>
            </div>
          </div>
        </Container>
      </Box>

      {/* OTP Modal */}
      <Modal
        open={otpModalOpen}
        onClose={() => { }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={otpModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: "10px",
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => setOtpModalOpen(false)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            {/* Title */}
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, textAlign: "center" }}>
              OTP Verification
            </Typography>

            {/* Description text */}
            <Typography variant="body2" sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}>
              Enter the 6-digit code we sent to your registered email address.
            </Typography>

            {/* OTP input boxes */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, gap: 1 }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(e) => {
                    if (/^[0-9]?$/.test(e.target.value)) {
                      const newOtp = otp.split("");
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(""));
                      if (e.target.value && index < 5) {
                        const next = document.getElementById(`otp-${index + 1}`);
                        next?.focus();
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index] && index > 0) {
                      const prev = document.getElementById(`otp-${index - 1}`);
                      prev?.focus();
                    } else if (e.key === "Enter" && otp.length === 6) {
                      handleOtpSubmit(); // ✅ Trigger OTP submit on Enter
                    }
                  }}

                  id={`otp-${index}`}
                  style={{
                    width: "45px",
                    height: "55px",
                    textAlign: "center",
                    fontSize: "20px",
                    borderRadius: "8px",
                    border: "1px solid rgba(0,0,0,0.3)",
                  }}
                />
              ))}
            </Box>

            {/* Submit OTP button */}
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 1 }}
              onClick={handleOtpSubmit}
              disabled={otp.length < 6 || loading || otpCooldown <= 0}
            >
              {otp.length < 6
                ? otpCooldown > 0
                  ? `Submit OTP (${otpCooldown}s)`
                  : "OTP Expired"
                : loading
                  ? "Verifying..."
                  : "Verify OTP"}
            </Button>

            {/* Resend OTP button */}
            <Button
              variant="outlined"
              fullWidth
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || loading}
            >
              {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
            </Button>
          </Box>
        </Fade>
      </Modal>



      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
