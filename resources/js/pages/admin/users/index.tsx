import ClinicDashboardLayout from '@/layouts/custom-dashboard-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Mail, Shield, User, MoreVertical, Search, Filter, Plus, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';


export default function UserIndex({ users, filters }: any) {

    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        router.get('/admin/users', { search: value }, {
            preserveState: true,
            replace: true,
        });
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
                        <button className="flex items-center gap-2 bg-[#246AFE] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-blue-500/30 hover:translate-y-[-2px] active:scale-95 transition-all">
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
        </ClinicDashboardLayout>
    );
}