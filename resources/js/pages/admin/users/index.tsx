import ClinicDashboardLayout from '@/layouts/custom-dashboard-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Mail, Shield, User, MoreVertical, Search, Filter, Plus, Smartphone, X, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';


export default function UserIndex({ users, filters }: any) {

    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, errors, reset } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        contact: '',
        password: '',
        password_confirmation: '',
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        router.get('/admin/users', { search: value }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users', {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const openModal = () => {
        reset();
        setShowModal(true);
    };

    return (
        <ClinicDashboardLayout breadcrumbs={[{ title: 'User Management', href: '/admin/users' }]}>
            <Head title="User Management" />
            
            <div className="w-full space-y-8 animate-in fade-in duration-500">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">User Handling</h1>
                        <p className="text-gray-500 font-medium">
                            Monitoring {users.total} active medical profiles
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search patients..." 
                                value={search}
                                onChange={handleSearch}
                                className="pl-10 pr-4 py-3 bg-white/60 text-gray-800 placeholder:text-gray-400 backdrop-blur-sm border border-white rounded-2xl w-64 focus:ring-2 focus:ring-[#246AFE]/20 outline-none transition-all shadow-sm"
                            />
                        </div>
                        <button className="p-3 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl hover:bg-white transition-all border border-white">
                            <Filter className="w-5 h-5 text-gray-600" />
                        </button>
                        <button 
                            onClick={openModal}
                            className="flex items-center gap-2 bg-[#246AFE] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-500/30 hover:translate-y-[-2px] active:scale-95 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            <span>New User</span>
                        </button>
                    </div>
                </div>
                

                {/* TABLE */}
                <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-3 px-6 py-4">
                            <thead>
                                <tr className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-black">
                                    <th className="px-6 py-2">Profile Details</th>
                                    <th className="px-6 py-2">Contact Info</th>
                                    <th className="px-6 py-2">Access Level</th>
                                    <th className="px-6 py-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user: any, i: number) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={user.id} 
                                        className="group bg-white/80 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 rounded-3xl"
                                    >
                                        <td className="px-6 py-5 rounded-l-3xl">
                                            <div className="flex items-center gap-4">
<div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#246AFE] to-blue-700 flex items-center justify-center text-white font-black text-lg shadow-lg">
                                                    {user.full_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 text-base">{user.full_name}</div>
                                                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                        Patient ID: #LMC-{user.id + 1000}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                                    <Mail className="w-3.5 h-3.5 text-[#246AFE]" /> 
                                                    {user.email}
                                                </div>
                                                <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                                                    <Smartphone className="w-3.5 h-3.5 text-[#246AFE]" /> 
                                                    {user.contact || 'No Contact'}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 ${
                                                user.role === 'admin' 
                                                ? 'bg-purple-50 text-purple-600 border-purple-100' 
                                                : 'bg-blue-50 text-[#246AFE] border-blue-100'
                                            }`}>
                                                {user.role === 'admin' 
                                                    ? <Shield className="w-3 h-3" /> 
                                                    : <User className="w-3 h-3" />
                                                }
                                                {user.role}
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end items-center gap-3">
                                                <button className="opacity-0 group-hover:opacity-100 px-5 py-2 bg-[#246AFE] text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                                    Manage
                                                </button>
                                                <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                                                    <MoreVertical className="w-5 h-5 text-gray-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center mt-8 gap-2 flex-wrap">
                    {users.links.map((link: any, index: number) => (
                        <Link
                            key={index}
                            href={link.url || ''}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                                link.active
                                    ? 'bg-[#246AFE] text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                            preserveScroll
                        />
                    ))}
                </div>
            </div>

            {/* CREATE DOCTOR MODAL */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        
                        {/* Modal */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#246AFE] to-blue-700 flex items-center justify-center text-white font-black shadow-lg">
                                        <Stethoscope className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-gray-900">Add New Doctor</h2>
                                        <p className="text-sm text-gray-500 font-medium">Create a verified doctor account</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* First Name */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name *</label>
                                        <input
                                            type="text"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#246AFE]/20 focus:border-[#246AFE] outline-none transition-all font-medium"
                                            placeholder="John"
                                            required
                                        />
                                        {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}
                                    </div>

                                    {/* Middle Name */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Middle Name</label>
                                        <input
                                            type="text"
                                            value={data.middle_name}
                                            onChange={(e) => setData('middle_name', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#246AFE]/20 focus:border-[#246AFE] outline-none transition-all font-medium"
                                            placeholder="M."
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name *</label>
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#246AFE]/20 focus:border-[#246AFE] outline-none transition-all font-medium"
                                            placeholder="Doe"
                                            required
                                        />
                                        {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#246AFE]/20 focus:border-[#246AFE] outline-none transition-all font-medium"
                                            placeholder="doctor@clinic.com"
                                            required
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>

                                {/* Contact */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Number *</label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={data.contact}
                                            onChange={(e) => setData('contact', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#246AFE]/20 focus:border-[#246AFE] outline-none transition-all font-medium"
                                            placeholder="+1 234 567 8900"
                                            required
                                        />
                                    </div>
                                    {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
                                </div>

                                {/* Password */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password *</label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#246AFE]/20 focus:border-[#246AFE] outline-none transition-all font-medium"
                                            placeholder="••••••••"
                                            required
                                        />
                                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm Password *</label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#246AFE]/20 focus:border-[#246AFE] outline-none transition-all font-medium"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-[#246AFE] text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:translate-y-[-2px] active:scale-95 transition-all"
                                    >
                                        Create Doctor
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </ClinicDashboardLayout>
    );
}
