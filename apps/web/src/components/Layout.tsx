import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { navigationSections } from "../routes";

const drawerWidth = 260;

export default function Layout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMockMode = import.meta.env.VITE_USE_MOCK === "true";

  const drawerSections = useMemo(() => navigationSections, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Stack spacing={1} sx={{ p: 3 }}>
        <Typography variant="overline" color="text.secondary">
          issho ni task
        </Typography>
        <Typography variant="h5">モックコンソール</Typography>
        <Typography variant="body2" color="text.secondary">
          テストデータで画面とAPIレスポンスを確認するためのモックUIです。
        </Typography>
      </Stack>
      <Divider />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {drawerSections.map((section) => (
          <List
            key={section.label}
            subheader={
              <ListSubheader
                component="div"
                sx={{
                  bgcolor: "transparent",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {section.label}
              </ListSubheader>
            }
          >
            {section.items.map((item) => {
              const to = `/${item.path}`;
              const selected = location.pathname === to;
              return (
                <ListItemButton
                  key={item.path}
                  component={NavLink}
                  to={to}
                  selected={selected}
                  onClick={() => {
                    if (!isDesktop) {
                      setMobileOpen(false);
                    }
                  }}
                  sx={{ mx: 1, borderRadius: 2 }}
                >
                  {item.icon && <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>}
                  <ListItemText
                    primary={item.label}
                    secondary={item.description}
                    primaryTypographyProps={{ fontWeight: 600 }}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        ))}
      </Box>
      <Box sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            {isMockMode ? "Mock API 稼働中" : "Mock API 無効"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {location.pathname}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        className="app-surface"
        sx={{
          borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
          zIndex: (currentTheme) => currentTheme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {!isDesktop && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuRoundedIcon />
            </IconButton>
          )}
          <Stack spacing={0.2}>
            <Typography variant="subtitle1" fontWeight={700}>
              フェーズ1 モック
            </Typography>
            <Typography variant="caption" color="text.secondary">
              UIスケルトン + MSWテストデータ
            </Typography>
          </Stack>
          <Box sx={{ flex: 1 }} />
          {isMockMode && <Chip label="モック" color="secondary" size="small" />}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant={isDesktop ? "permanent" : "temporary"}
          open={isDesktop ? true : mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: "transparent",
              borderRight: "1px solid rgba(15, 23, 42, 0.06)",
            },
          }}
        >
          <Box className="app-surface" sx={{ height: "100%" }}>
            {drawerContent}
          </Box>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 2, md: 4 },
          pt: { xs: 10, md: 12 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
