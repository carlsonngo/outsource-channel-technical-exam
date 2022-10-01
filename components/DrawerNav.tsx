import {
  Favorite as FavoriteIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import {
  Drawer,
  DrawerProps,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

interface Route {
  name: string;
  icon: any;
  href: string;
}

const ROUTES: Route[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: FavoriteIcon,
  },
];

const DrawerNav = ({ sx = [], ...props }: DrawerProps) => {
  const router = useRouter();

  return (
    <>
      <Drawer
        {...props}
        variant="permanent"
        sx={[
          {
            width: { xs: 64, md: 200 },
            [`& .MuiDrawer-paper`]: {
              width: { xs: 64, md: 200 },
              boxSizing: "border-box",
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Toolbar />
        <List component="nav">
          {ROUTES.map((route) => {
            const active = Boolean(
              route.href && router.pathname === route.href
            );
            return (
              <Link href={route.href} key={route.href}>
                <ListItemButton
                  sx={[
                    { px: { xs: 2, md: 4 } },
                    active && {
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                    },
                  ]}
                >
                  <ListItemIcon sx={{ minWidth: { xs: 0, md: 56 } }}>
                    <SvgIcon
                      component={route.icon}
                      inheritViewBox
                      sx={[
                        active && {
                          color: "primary.contrastText",
                        },
                      ]}
                    />
                  </ListItemIcon>
                  <ListItemText sx={{ display: { xs: "none", md: "block" } }}>
                    {route.name}
                  </ListItemText>
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default DrawerNav;
