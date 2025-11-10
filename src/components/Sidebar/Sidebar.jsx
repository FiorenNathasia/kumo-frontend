import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import AddReactionIcon from "@mui/icons-material/AddReaction";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const drawerWidth = 280;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const [journalEntryId, setJournalEntryId] = useState(null);

  useEffect(() => {
    const savedId = localStorage.getItem("journalEntryId");
    if (savedId) setJournalEntryId(savedId);
  }, []);

  const menuItems = [
    { label: "Task Homepage", icon: <HomeIcon />, path: "/" },
    {
      label: "Today's Recommendation",
      icon: <EmojiObjectsIcon />,
      path: `/${journalEntryId || ""}`,
    },
    { label: "Add Mood", icon: <AddReactionIcon />, path: "/mood" },
    { label: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  const handleChange = (path) => {
    setValue(path);
    if (path === "/logout") {
      localStorage.removeItem("accessToken");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader>
          <Typography variant="h6" noWrap>
            KUMO
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => handleChange(item.path)}
                selected={value === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
