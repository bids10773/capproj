import { Head, usePage } from '@inertiajs/react';
import ClinicDashboardLayout from '@/layouts/custom-dashboard-layout';
import type { SharedData } from '@/types';
import { motion } from 'framer-motion';
import { Scan, Activity, Image, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function RadTechDashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <ClinicDashboardLayout breadcrumbs={[{ title: 'RadTech Dashboard', href: '/radtech/dashboard' }]}>
            <Head title="RadTech Dashboard" />

            {/* WELCOME SECTION */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    Welcome, <span className="text-[#246AFE]">{auth.user.full_name}</span>
                </h1>
                <p className="text-gray-500 mt-1">Radiology and imaging department overview.</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Scans Completed', value: '89', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Pending Scans', value: '12', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Critical Findings', value: '2', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                    { label: 'Equipment Status', value: 'Active', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
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

            {/* MAIN CONTENT GRID */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* UPCOMING SCANS */}
                <div className="lg:col-span-2 bg-white/60 backdrop-blur-md border border-white rounded-[2rem] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black text-gray-900">Upcoming Imaging Scans</h2>
                        <button className="text-sm font-bold text-[#246AFE] hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { time: '09:00 AM', patient: 'John Smith', scan: 'X-Ray (Chest)', status: 'Ready' },
                            { time: '10:30 AM', patient: 'Emily Johnson', scan: 'CT Scan', status: 'Ready' },
                            { time: '11:30 AM', patient: 'Michael Brown', scan: 'MRI', status: 'Pending' },
                            { time: '02:00 PM', patient: 'Sarah Davis', scan: 'Ultrasound', status: 'Ready' },
                        ].map((scan, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-blue-50/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Scan className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{scan.patient}</p>
                                        <p className="text-sm text-gray-500">{scan.scan}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">{scan.time}</p>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${scan.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {scan.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="bg-white/60 backdrop-blur-md border border-white rounded-[2rem] p-6 shadow-sm">
                    <h2 className="text-xl font-black text-gray-900 mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full flex items-center gap-3 p-4 bg-[#246AFE] text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                            <Scan className="w-5 h-5" />
                            Start New Scan
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                            <Image className="w-5 h-5" />
                            View Images
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                            <Activity className="w-5 h-5" />
                            Equipment Status
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                            <AlertCircle className="w-5 h-5" />
                            Critical Alerts
                        </button>
                    </div>
                </div>
            </div>
        </ClinicDashboardLayout>
    );
}

