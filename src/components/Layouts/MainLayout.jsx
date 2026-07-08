import React, { useContext, useState } from "react";
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Icon from "../Elements/Icon";
import {NavLink} from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/authContext";
import { logoutService } from "../../services/authService.jsx";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function MainLayout(props) {
  const { children } = props;

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction", },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutService();
    } catch (err) {
      console.error(err);
      // tetap lanjut logout di sisi klien walau request logout gagal
    } finally {
      logout();
      setLoggingOut(false);
    }
  };

  return (
    <>
      <div className={`flex min-h-screen ${theme.name}`}>
        {/* PERBAIKAN: text-special-bg2 -> text-sidebar-text
            special-bg2 dipakai juga sebagai background card (ikut flip dark mode),
            padahal sidebar selalu gelap → teksnya harus selalu terang (konstan) */}
        <aside className="bg-sidebar-bg w-28 sm:w-64 text-sidebar-text flex flex-col justify-between px-7 py-12">
          <div>
            <div className="mb-10">
              <Logo variant="secondary" />
            </div>
            <nav>
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${
                      isActive
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-special-bg3"
                    }`
                  }
                >
                  <div className="mx-auto sm:mx-0">{item.icon}</div>
                  <div className="ms-3 hidden sm:block">{item.name}</div>
                </NavLink>
              ))}
            </nav>
          </div>
          <div>
            Themes
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer mb-2`}
                  onClick={() => setTheme(t)}
                ></div>
              ))}
            </div>
          </div>
          <div>
            <div onClick={handleLogout} className="cursor-pointer">
              <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                <div className="mx-auto sm:mx-0 text-primary">
                  <Icon.Logout />
                </div>
                <div className="ms-3 hidden sm:block">Logout</div>
              </div>
            </div>
            <div className="border my-10 border-b-special-bg"></div>
            <div className="flex justify-between items-center">
              <div>Avatar</div>
              <div className="hidden sm:block">
                <div>{user.name}</div>
                <div>View Profile</div>
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={15} />
              </div>
            </div>
          </div>
        </aside>
        <div className="bg-special-mainBg flex-1 flex flex-col transition-colors">
          <header className="border border-b border-gray-05 px-6 py-7 flex items-center justify-between">
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6 text-defaultBlack">{user.name}</div> 
              <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="me-10">
                <NotificationsActiveIcon className="text-primary scale-110" />
              </div> 
              <Input backgroundColor="bg-white dark:bg-special-bg3" border="border-white dark:border-special-bg3" />
            </div>
          </header>
          <main className="flex-1 px-6 py-4">{children}</main>
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 }}
        open={loggingOut}
      >
        <div className="flex flex-col items-center gap-3">
          <CircularProgress color="inherit" />
          <span>Logging Out</span>
        </div>
      </Backdrop>
    </>
  );
}

export default MainLayout;