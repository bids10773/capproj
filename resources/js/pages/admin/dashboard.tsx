import { Head, usePage } from '@inertiajs/react';
import ClinicDashboardLayout from '@/layouts/custom-dashboard-layout';
import type { SharedData } from '@/types';
import { motion } from 'framer-motion';
import { Activity, Users, CalendarDays, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <ClinicDashboardLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <Head title="Dashboard" />

            {/* WELCOME SECTION */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    Welcome back, <span className="text-[#246AFE]">{auth.user.full_name}</span>
                </h1>
                <p className="text-gray-500 mt-1">Here is what is happening at the clinic today.</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Today\'s Patients', value: '42', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Appointments', value: '12', icon: CalendarDays, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Clinic Capacity', value: '85%', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Reports Ready', value: '7', icon: ArrowUpRight, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all"
                    >
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* PLACEHOLDER FOR RECENT ACTIVITY / CHARTS */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64 rounded-[2rem] bg-white/40 border border-white/60 border-dashed flex items-center justify-center text-gray-400 font-medium">
                    Activity Chart Placeholder
                </div>
                <div className="h-64 rounded-[2rem] bg-white/40 border border-white/60 border-dashed flex items-center justify-center text-gray-400 font-medium">
                    Upcoming Schedules Placeholder
                </div>
            </div>
        </ClinicDashboardLayout>
    );
}
