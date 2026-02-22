import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import PasswordInput from '@/components/ui/password-input';


export default function Register() {
    const [showPasswords, setShowPasswords] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    const togglePasswords = () => setShowPasswords(!showPasswords);

    return (
        <>
            {/* [OUTSIDE] TERMS & PRIVACY MODAL - Breaking out of Layout containers */}
            <AnimatePresence>
                {showTermsModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setShowTermsModal(false)}
                            className="absolute inset-0 bg-gray-950/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[85vh] z-[110]"
                        >
                            <div className="p-6 border-b flex items-center justify-between bg-blue-50/50">
                                <div className="flex items-center gap-3 text-[#246AFE]">
                                    <ShieldCheck className="h-6 w-6" />
                                    <h2 className="text-xl font-bold text-gray-900">Terms & Privacy Policy</h2>
                                </div>
                                <button onClick={() => setShowTermsModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="p-8 overflow-y-auto text-gray-600 text-sm leading-relaxed space-y-4">
                                <p className="font-bold text-gray-900 underline">Living Myth Industrial Clinic Data Privacy Agreement</p>
                                <p>By registering, you agree that your medical information will be handled in accordance with the <strong>Data Privacy Act of 2012 (RA 10173)</strong>.</p>
                                <p>We collect your Name, Email, and Contact Number solely for medical record verification and appointment scheduling. Your data will never be shared with third parties without your explicit consent.</p>
                                <p><strong>Disclaimer:</strong> This portal is for official industrial clinic use only. Unauthorized access is strictly prohibited.</p>
                                <p><strong>Retention:</strong> Your data is stored securely and retained only for as long as necessary to provide clinical services or as required by Philippine Law.</p>
                            </div>
                            <div className="p-6 border-t bg-gray-50 flex justify-end">
                                <Button onClick={() => setShowTermsModal(false)} variant="default" className="px-10 h-11">
                                    I Understand
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MAIN CONTENT */}
            <AuthLayout
                title="Create an account"
                description="Enter your details below to create your account"
            >
                <Head title="Register" />
                <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} className="flex flex-col gap-5">
                    {({ processing, errors }) => (
                        <div className="grid gap-4">
                            <div className="grid gap-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" required autoFocus tabIndex={1} placeholder="Full name" />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="email">Email address</Label>
                                <Input id="email" type="email" name="email" required tabIndex={2} placeholder="email@example.com" />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="contact">Contact No.</Label>
                                <Input id="contact" type="tel" name="contact" required tabIndex={3} placeholder="+639*********" />
                                <InputError message={errors.contact} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type={showPasswords ? "text" : "password"} required tabIndex={4} placeholder="Enter password" />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="password_confirmation">Confirm password</Label>
                                <Input id="password_confirmation" name="password_confirmation" type={showPasswords ? "text" : "password"} required tabIndex={5} placeholder="Confirm password" />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            {/* TIGHT GROUP: SHOW PASSWORDS & TERMS */}
                            <div className="flex flex-col space-y-3 mt-1">
                                <div className="flex items-center space-x-2 ml-1">
                                    <Checkbox id="show-passwords" checked={showPasswords} onCheckedChange={togglePasswords} tabIndex={6} />
                                    <Label htmlFor="show-passwords" className="text-[10px] font-bold text-white uppercase tracking-widest cursor-pointer opacity-80">Show Passwords</Label>
                                </div>

                                <div className="flex items-start space-x-3 ml-1">
                                    <Checkbox id="terms" name="terms" required tabIndex={7} />
                                    <Label htmlFor="terms" className="text-[11px] font-medium text-white/90 leading-tight">
                                        I agree to the <button type="button" onClick={() => setShowTermsModal(true)} className="font-bold underline hover:text-white transition-colors">Terms & Privacy Policy</button>
                                    </Label>
                                </div>
                            </div>

                            <Button type="submit" variant="secondary" className="w-full mt-4 font-bold h-11" tabIndex={8} disabled={processing}>
                                {processing ? <Spinner className="text-[#246AFE]" /> : "Create account"}
                            </Button>

                            <div className="text-center text-sm text-white mt-2">
                                Already have an account? <TextLink href={login()} className="font-bold underline">Log in</TextLink>
                            </div>
                        </div>
                    )}
                </Form>
            </AuthLayout>
        </>
    );
}
