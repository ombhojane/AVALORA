'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function PrivacyPolicyPage() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/SunsetLikeScene.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-90" />
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center text-avalanche-red hover:text-red-400 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-manga font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">Protecting your data in the eternal winter realm</p>
          <div className="text-gray-400 mt-2">Last updated: January 2025</div>
        </motion.div>

        {/* Character Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="float-right ml-8 mb-8 hidden lg:block"
        >
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border-2 border-blue-400/50 shadow-lg max-w-xs">
            <div className="text-center">
              <Image
                src="/Artworks-Characters/AVALANCH.png"
                alt="Avalanch - Privacy Guardian"
                width={150}
                height={150}
                className="rounded-xl mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-white mb-2">AVALANCH</h3>
              <p className="text-blue-400 text-sm">Privacy Guardian</p>
              <p className="text-gray-400 text-xs mt-2">"Your data is as secure as the eternal ice of AVALORA"</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-600/50 shadow-2xl"
        >
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                At AVALORA, we are committed to protecting your privacy while providing an immersive Web3 gaming experience. 
                We collect only the information necessary to enhance your journey through the eternal winter realm.
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• <strong>Wallet Information:</strong> Your Avalanche wallet address for blockchain interactions</li>
                <li>• <strong>Game Progress:</strong> Your character stats, achievements, and quest completion data</li>
                <li>• <strong>Performance Data:</strong> Typing speeds, quiz scores, and training metrics</li>
                <li>• <strong>Usage Analytics:</strong> Anonymous data to improve game features and performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">How We Protect Your Data</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Your data security is paramount in AVALORA. We employ industry-standard encryption and blockchain technology 
                to ensure your information remains as secure as the ancient vaults of the eternal winter.
              </p>
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-400/30 mb-4">
                <ul className="text-gray-300 space-y-2">
                  <li>• End-to-end encryption for all sensitive data</li>
                  <li>• Blockchain-based authentication through Avalanche network</li>
                  <li>• Regular security audits and vulnerability assessments</li>
                  <li>• No storage of private keys or sensitive wallet information</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Data Sharing and Third Parties</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. Your data remains within 
                the AVALORA ecosystem, protected by the same blockchain technology that powers our realm.
              </p>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/30">
                <p className="text-gray-300">
                  <strong>Limited Sharing:</strong> We may share anonymized, aggregated data for research purposes 
                  to improve Web3 gaming experiences, but never personal identifiable information.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                As a warrior of AVALORA, you have complete control over your data:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-400/30">
                  <h3 className="text-white font-bold mb-2">Access & Export</h3>
                  <p className="text-gray-300 text-sm">Request a copy of all your data at any time</p>
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-400/30">
                  <h3 className="text-white font-bold mb-2">Delete & Forget</h3>
                  <p className="text-gray-300 text-sm">Request complete deletion of your account and data</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Blockchain Considerations</h2>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-400/30">
                <p className="text-gray-300 leading-relaxed">
                  <strong>Important:</strong> Some data stored on the Avalanche blockchain (such as transaction records 
                  and certain achievements) cannot be deleted due to the immutable nature of blockchain technology. 
                  This data is pseudonymous and linked only to your wallet address.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or your data rights, please contact our 
                Privacy Guardian team:
              </p>
              <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg p-4 border border-gray-600">
                <p className="text-white">
                  <strong>Email:</strong> privacy@avalora.game<br />
                  <strong>Discord:</strong> AVALORA Official Server<br />
                  <strong>Response Time:</strong> Within 48 hours
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}