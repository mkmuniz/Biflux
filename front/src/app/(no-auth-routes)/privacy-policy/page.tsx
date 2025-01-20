import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-gray-300 py-16 relative overflow-hidden">
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>

            <div className="max-w-4xl mx-auto px-4 relative p-6">
                <h1 className="text-4xl text-center font-bold mb-8 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent">
                    Privacy Policy
                </h1>

                <div className="space-y-8 bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-800 p-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
                        <p>
                            BrightFlow is committed to protecting your privacy and personal data. This Privacy Policy 
                            explains how we collect, use, store and protect your information when using our platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">2. Data Collected</h2>
                        <div className="space-y-2">
                            <h3 className="text-xl font-medium text-white">2.1 Registration Data</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Profile picture (optional)</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-medium text-white">2.2 Energy Bill Data</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Installation number (10 digits)</li>
                                <li>Reference month</li>
                                <li>Electricity consumption (kWh and values)</li>
                                <li>SCEE Energy without ICMS (kWh and values)</li>
                                <li>Compensated Energy GD I (kWh and values)</li>
                                <li>Municipal Public Lighting Contribution</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">3. Data Usage</h2>
                        <p>We use your data to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Create and manage your platform account</li>
                            <li>Process and analyze your energy bills</li>
                            <li>Generate analyses and reports about your energy consumption</li>
                            <li>Send important notifications about your account and consumption</li>
                            <li>Improve our services and your platform experience</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">4. Data Protection</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data against 
                            unauthorized access, alteration, disclosure, or destruction. This includes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Encryption of sensitive data</li>
                            <li>Restricted access to personal data</li>
                            <li>Regular monitoring of our systems</li>
                            <li>Employee training in data security practices</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">5. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Access your personal data</li>
                            <li>Correct incorrect data</li>
                            <li>Request deletion of your data</li>
                            <li>Revoke your consent at any time</li>
                            <li>Receive your data in a structured format</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">6. Data Retention</h2>
                        <p>
                            We keep your data only for as long as necessary to provide our services or comply with 
                            legal obligations. After your account is closed, your personal data will be deleted or 
                            anonymized, except when there is a legal retention requirement.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">7. Contact</h2>
                        <p>
                            To exercise your rights or clarify doubts about this privacy policy, 
                            please contact us via email at: privacy@brightflow.com.br
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">8. Policy Updates</h2>
                        <p>
                            This policy may be updated periodically. The most recent version will always be 
                            available on our platform. Last update: January 2024.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}