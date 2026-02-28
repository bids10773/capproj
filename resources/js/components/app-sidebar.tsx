import { Link, usePage } from '@inertiajs/react';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
    Calendar, 
    LayoutGrid, 
    ShieldCheck, 
    UsersIcon, 
    Settings, 
    HeartPulse, 
    Activity,
    Clock
} from 'lucide-react';
import { NavUser } from '@/components/nav-user';
import logo from '/public/images/full_logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage().props as any;
    const { url } = usePage(); // Get current URL for focus effect
    const isAdmin = auth.user.role === 'admin';
    
    // 1. Real-time Clock
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
    });

    const adminNavItems: NavItem[] = [
        { title: 'Admin Overview', href: '/admin/dashboard', icon: ShieldCheck },
        { title: 'User Management', href: '/admin/users', icon: UsersIcon },
        { title: 'Settings', href: '/settings/profile', icon: Settings },
    ];

    const userNavItems: NavItem[] = [
        { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
        { title: 'Appointments', href: '/appointments', icon: Calendar },
        { title: 'Medical Records', href: '/records', icon: HeartPulse },
        { title: 'Settings', href: '/settings/profile', icon: Settings },
    ];

    const activeNavItems = isAdmin ? adminNavItems : userNavItems;

    return (
        <Sidebar 
            collapsible="icon" 
            {...props}
            className="bg-[#0A2E63] text-blue-50 border-r border-white/5 shadow-none overflow-hidden"
        >
            {/* BRANDING HEADER */}
            <SidebarHeader className="pt-6 pb-2 px-0 transition-all duration-300">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex flex-col items-center gap-4">
                            <Link href={isAdmin ? '/admin/dashboard' : '/dashboard'} className="group-data-[collapsible=icon]:hidden px-4">
                                <motion.div whileHover={{ scale: 1.05 }} className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                                    <img src={logo} alt="LMC Logo" className="h-10 w-auto object-contain brightness-110" />
                                </motion.div>
                            </Link>

                            <div className="text-center group-data-[collapsible=icon]:hidden px-4">
                                <span className="block text-xs font-black tracking-[0.3em] text-[#4F86FF] uppercase">Living Myth</span>
                                <span className="block text-[9px] font-bold text-blue-200/50 uppercase tracking-widest mt-1">Industrial Clinic</span>
                            </div>

                            <div className="w-full px-4 group-data-[collapsible=icon]:hidden">
                                <div className="rounded-2xl bg-[#246AFE]/20 p-3 border border-white/10 relative overflow-hidden">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Activity className="size-3 text-cyan-400 animate-pulse" />
                                        <span className="text-[9px] font-black uppercase text-blue-200 tracking-tighter">System Live</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 py-1.5 bg-black/20 rounded-xl border border-white/5">
                                        <Clock className="size-3 text-blue-300" />
                                        <span className="text-[11px] font-mono font-bold text-white tabular-nums tracking-wider">{formattedTime}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-blue-200/70 capitalize text-center mt-2 tracking-widest">{auth.user.role} PORTAL</p>
                                </div>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* NAVIGATION CONTENT WITH FRAMER MOTION FOCUS */}
            <SidebarContent className="px-2 pt-2 group-data-[collapsible=icon]:px-0">
                <SidebarGroup className="pt-0">
                    <SidebarMenu className="gap-1.5 relative">
                        {activeNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = url === item.href || url.startsWith(item.href + '/');

                            return (
                                <SidebarMenuItem key={item.title} className="relative">
                                    <SidebarMenuButton 
                                        asChild 
                                        isActive={isActive}
                                        tooltip={item.title}
                                        className="h-11 rounded-xl transition-colors duration-300 relative z-10 hover:bg-white/5 text-blue-100/80 data-[active=true]:text-white group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:h-12"
                                    >
                                        <Link href={item.href} className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                                            {Icon && (
                                                <motion.div
                                                    animate={isActive ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <Icon className="size-5 shrink-0" />
                                                </motion.div>
                                            )}
                                            <span className={`font-semibold tracking-tight group-data-[collapsible=icon]:hidden ${isActive ? 'text-white' : 'text-blue-100/70'}`}>
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>

                                    {/* FRAMER MOTION SLIDING BACKGROUND */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active-pill"
                                                className="absolute inset-0 bg-[#246AFE] rounded-xl shadow-lg shadow-blue-500/20 z-0"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ 
                                                    type: "spring", 
                                                    stiffness: 350, 
                                                    damping: 30 
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 bg-[#08224a]/50 backdrop-blur-md border-t border-white/5 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
