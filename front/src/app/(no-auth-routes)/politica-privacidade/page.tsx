'use client';

import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-gray-300 py-16 relative overflow-hidden">
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-[128px]"></div>

            <div className="max-w-4xl mx-auto px-4 relative p-6">
                <h1 className="text-4xl text-center font-bold mb-8 bg-gradient-to-r from-[#8B5CF6] to-[#00A3FF] bg-clip-text text-transparent">
                    Política de Privacidade
                </h1>

                <div className="space-y-8 bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-800 p-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">1. Introdução</h2>
                        <p>
                            A BrightFlow está comprometida em proteger sua privacidade e seus dados pessoais. Esta Política de Privacidade 
                            explica como coletamos, usamos, armazenamos e protegemos suas informações ao utilizar nossa plataforma.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">2. Dados Coletados</h2>
                        <div className="space-y-2">
                            <h3 className="text-xl font-medium text-white">2.1 Dados de Cadastro</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Nome completo</li>
                                <li>Endereço de e-mail</li>
                                <li>Foto de perfil (opcional)</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-medium text-white">2.2 Dados dos Boletos de Energia</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Número da instalação (10 dígitos)</li>
                                <li>Mês de referência</li>
                                <li>Consumo de energia elétrica (kWh e valores)</li>
                                <li>Energia SCEE sem ICMS (kWh e valores)</li>
                                <li>Energia Compensada GD I (kWh e valores)</li>
                                <li>Contribuição de Iluminação Pública Municipal</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">3. Uso dos Dados</h2>
                        <p>Utilizamos seus dados para:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Criar e gerenciar sua conta na plataforma</li>
                            <li>Processar e analisar seus boletos de energia</li>
                            <li>Gerar análises e relatórios sobre seu consumo de energia</li>
                            <li>Enviar notificações importantes sobre sua conta e consumo</li>
                            <li>Melhorar nossos serviços e sua experiência na plataforma</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">4. Proteção dos Dados</h2>
                        <p>
                            Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra 
                            acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Criptografia de dados sensíveis</li>
                            <li>Acesso restrito a dados pessoais</li>
                            <li>Monitoramento regular de nossos sistemas</li>
                            <li>Treinamento de funcionários em práticas de segurança de dados</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">5. Seus Direitos</h2>
                        <p>Você tem direito a:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Acessar seus dados pessoais</li>
                            <li>Corrigir dados incorretos</li>
                            <li>Solicitar a exclusão de seus dados</li>
                            <li>Revogar seu consentimento a qualquer momento</li>
                            <li>Receber seus dados em formato estruturado</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">6. Retenção de Dados</h2>
                        <p>
                            Mantemos seus dados apenas pelo tempo necessário para fornecer nossos serviços ou cumprir 
                            obrigações legais. Após o encerramento de sua conta, seus dados pessoais serão excluídos ou 
                            anonimizados, exceto quando houver obrigação legal de retenção.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">7. Contato</h2>
                        <p>
                            Para exercer seus direitos ou esclarecer dúvidas sobre esta política de privacidade, 
                            entre em contato conosco através do e-mail: privacy@brightflow.com.br
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">8. Atualizações da Política</h2>
                        <p>
                            Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre 
                            disponível em nossa plataforma. Última atualização: Janeiro de 2024.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
} 