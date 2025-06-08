"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Box, ThemeProvider, Stack, useMediaQuery, CssBaseline } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import getMuiTheme from "../theme/muiTheme";
import TopMenu from "@/components/layout/TopMenu";
import SideMenu from "@/components/layout/SideMenu";
import BottomNav from "@/components/layout/BottomNavigation";
import APIRepository from "@/utils/APIRepository";

export default function Layout({ children }: { children: ReactNode }) {

  const [themeMode, setThemeMode] = useState<"dark" | "light">("light")
  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const theme = getMuiTheme(themeMode)
  // Move these inside ThemeProvider
  // We'll create a custom component to use hooks after ThemeProvider mounts
  return (
    <html><body>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutContent
            pathname={pathname}
            sideMenuOpen={sideMenuOpen}
            setSideMenuOpen={setSideMenuOpen}
            theme={theme}
            toggleThemeMode={setThemeMode}
        >
            {children}
        </LayoutContent>
        </ThemeProvider>    
        
    </body></html>
    
  );
}

function LayoutContent({
  children,
  pathname,
  sideMenuOpen,
  setSideMenuOpen,
  theme,
  toggleThemeMode
}: {
  children: ReactNode;
  pathname: string;
  sideMenuOpen: boolean;
  setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: any;
  toggleThemeMode:any;
}) {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login");
    }
  }, [router, pathname]);

  if (pathname === "/login") {
    return <>{children}</>; // no layout on login
  }

  return (
    <Stack>
      <TopMenu onMenuClick={() => setSideMenuOpen((v) => !v)} sideMenuOpen={sideMenuOpen} toggleThemeMode={toggleThemeMode}  />
      {!isMobile && <SideMenu open={sideMenuOpen} setOpen={setSideMenuOpen} />}
      <Box
        sx={{
          pt: "64px",
          height: "100vh",
          transition: "margin-left 0.2s",
          ml: isMobile ? 0 : sideMenuOpen ? '231px' : '56px',
          background: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
      {isMobile && <BottomNav />}
    </Stack>
  );
}
