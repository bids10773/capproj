import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { AppLayoutProps } from '@/types';
import { motion } from 'framer-motion';

export default function ClinicDashboardLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    return (
        /* 1. WRAPPER BACKGROUND (The Gap/Sidebar color) */
        <SidebarProvider className="bg-white min-h-screen">
            
            {/* 2. SIDEBAR - We remove the 'variant' prop to stop the error */}
            {/* We use a standard Tailwind class for the border instead */}
            <AppSidebar className="border-r border-blue-100 bg-transparent" />

            {/* 3. RIGHT CONTENT - This is where we add your BLUE background */}
            <SidebarInset className="relative flex flex-col bg-[#F0F7FF]"> 
                {/* #F0F7FF is a clean, medical "Ice Blue" */}
                
                {/* OPTIONAL: Medical Glow in the background */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#246AFE]/5 blur-[100px] pointer-events-none" />

                {/* 4. GLASS HEADER */}
                <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 px-6">
                    <div className="flex w-full items-center gap-2 rounded-2xl border border-white/60 bg-white/40 px-4 py-2 shadow-sm backdrop-blur-md">
                        <SidebarTrigger className="-ml-1 text-[#246AFE]" />
                        <div className="h-4 w-px bg-blue-100 mx-2" />
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </header>

                {/* 5. MAIN PAGE CONTENT */}
                <motion.main 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1 p-6 lg:p-10"
                >
                    <div className="mx-auto w-full max-w-7xl">
                        {children}
                    </div>
                </motion.main>
            </SidebarInset>
        </SidebarProvider>
    );
}
