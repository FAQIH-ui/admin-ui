import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import MainLayout from "../components/Layouts/MainLayout";
import CardExpenseCategory from "../components/Fragments/CardExpenseCategory";
import { expenseService } from "../services/dataService.jsx";
import { AuthContext } from "../context/authContext.jsx";
import AppSnackbar from "../components/Elements/AppSnackbar.jsx";

function expense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchExpenses = async () => {
    try {
      const data = await expenseService();

      // PENTING: cek struktur asli response di sini dulu,
      // lalu sesuaikan nama field di CardExpenseCategory props di bawah
      // (category/amount/percentage/trend/transactions) kalau beda.
      console.log("Expenses response:", data);

      setExpenses(data || []);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.msg || "Terjadi kesalahan saat mengambil data expenses",
        severity: "error",
      });
      if (err.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <MainLayout>
      <h2 className="text-lg text-gray-01 mb-6">Expenses Comparison</h2>

      {loading ? (
        // Loader di tengah area konten (mirip pola CardGoal, tapi full-area)
        <div
          className="flex flex-col justify-center items-center text-primary"
          style={{ minHeight: "60vh" }}
        >
          <CircularProgress color="inherit" size={50} />
          <div className="mt-3">Loading Data</div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenses.map((item, idx) => (
            <CardExpenseCategory
              key={item.category ?? idx}
              category={item.category}
              amount={item.amount}
              percentage={item.percentage}
              trend={item.trend}
              transactions={item.transactions}
            />
          ))}
        </div>
      )}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </MainLayout>
  );
}

export default expense;
