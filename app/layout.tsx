"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Box, ThemeProvider, Stack, useMediaQuery, CssBaseline } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import getMuiTheme from "@/theme/muiTheme";
import TopMenu from "@/components/layout/TopMenu";
import SideMenu from "@/components/layout/SideMenu";
import BottomNav from "@/components/layout/BottomNavigation";
import ServerStatusProvider from "@/components/layout/ServerStatusProvider";

type themeMode="dark" | "light" | null

export default function Layout({ children }: { children: ReactNode }) {

  const [themeMode, setThemeMode] = useState<themeMode>(null);
  const [theme, setTheme] = useState({})
  const [sideMenuOpen, setSideMenuOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme_mode') as themeMode | null;
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setThemeMode(storedTheme);
      setTheme(getMuiTheme(storedTheme))
    }
    else{
      setThemeMode("light");
      setTheme(getMuiTheme("light"))
    }
  }, []);

  useEffect(() => {
    if(themeMode != null){
      localStorage.setItem('theme_mode', themeMode as "dark" | "light");
      setTheme(getMuiTheme(themeMode as "dark" | "light"))
    }
    
  }, [themeMode]);


  if (themeMode == null){
    return <html><body></body></html>
  }
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutContent
            pathname={pathname}
            sideMenuOpen={sideMenuOpen}
            setSideMenuOpen={setSideMenuOpen}
            theme={theme}
            toggleThemeMode={(mode: themeMode) => {
              setThemeMode(mode)
              if (typeof window !== "undefined"){
                localStorage.setItem("theme_mode", mode as string)

              }
            }}
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
  pathname: string | null;
  sideMenuOpen: boolean;
  setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: any;
  toggleThemeMode:any;
}) {
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!isLoggedIn && pathname !== "/login") {
      router.push("/login");
    }
  }, [router, pathname]);

  if (pathname === "/login") {
    return <>{children}</>; // no layout on login
  }

  return (<>
    {isLoggedIn ? <Stack>
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
      <ServerStatusProvider/>

        {children}
      </Box>
      {isMobile && <BottomNav />}
    </Stack> : <></>}
    </>
  );
}
