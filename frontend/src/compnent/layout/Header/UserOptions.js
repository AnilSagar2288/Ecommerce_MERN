import React, { useState } from 'react'
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useAlert } from 'react-alert';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';
import Backdrop from "@material-ui/core/Backdrop";

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false);
    const alert = useAlert();
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
        navigate("/admin/dashboard");
      }

      function orders() {
        navigate('/orders')
      }
      function account() {
        navigate("/account");
      }
      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }

  return (
    <>
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
  </>
  )
}

export default UserOptions