"use client";
import '../styles/globals.css';
import React, { ReactNode, useEffect, useState } from 'react';
import { Box, ThemeProvider, Stack } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import muiTheme from '../theme/muiTheme';
import TopMenu from '@/components/layout/TopMenu';
import SideMenu from '@/components/layout/SideMenu';


export default function Layout({ children }: { children: ReactNode }) {
    const [sideMenuOpen, setSideMenuOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn && pathname !== '/login') {
            router.push('/login');
        }
    }, [router, pathname]);

    // Exclude the login page from the layout
    if (pathname === '/login') {
        return (
        <html>
            <body>
                <ThemeProvider theme={muiTheme}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
        );
    }

    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={muiTheme}>
                    <Stack>
                        <TopMenu onMenuClick={() => setSideMenuOpen((v) => !v)} sideMenuOpen={sideMenuOpen} />
                        <SideMenu open={sideMenuOpen} setOpen={setSideMenuOpen} />
                         <Box
                                sx={{
                                    // flex: 1,
                                    // width: '%',
                                    pt: '64px',
                                    height: '70vh',
                                    transition: 'margin-left 0.2s',
                                    ml: sideMenuOpen ? '240px' : '64px',
                                }}
                            >
                                {children}
                            </Box>
                    </Stack>
                </ThemeProvider>
            </body>
        </html>
    );
}