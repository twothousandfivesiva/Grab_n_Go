import React from 'react'
import { SpeedDial, SpeedDialAction } from "@mui/material";
import "./Header.css";
import { Fragment, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../../actions/userAction";
const UserOptions = ({user}) => {
    // console.log("User in UserOptions:", user)
      const [open, setOpen] = useState(false);
      const navigate = useNavigate();
      const dispatch = useDispatch();
     
        const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
     { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
   if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
    function dashboard() {
  navigate("/dashboard");
}
function orders() {
  navigate("/orders");
}
function account() {
  navigate("/account");
}
function logoutUser  ()  {
    dispatch(logout());
    toast.success("Logout Successfully");
  };

   return (
     <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
     
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        

        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
         }
      >
         {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
        
      </SpeedDial> 
    </Fragment>
  );
};

export default UserOptions