'use client'

import { motion } from 'framer-motion'
import { Scroll, Sword, Shield, Crown, ArrowLeft, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function TermsOfServicePage() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/RedSky.jpg)',
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
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Scroll className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-manga font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-300">The sacred laws of the eternal winter realm</p>
          <div className="text-gray-400 mt-2">Last updated: January 2025</div>
        </motion.div>

        {/* Character Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="float-left mr-8 mb-8 hidden lg:block"
        >
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border-2 border-red-400/50 shadow-lg max-w-xs">
            <div className="text-center">
              <Image
                src="/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png"
                alt="Emperor Avaxim"
                width={150}
                height={150}
                className="rounded-xl mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-white mb-2">EMPEROR AVAXIM</h3>
              <p className="text-red-400 text-sm">The Unyielding Avalanche</p>
              <p className="text-gray-400 text-xs mt-2">"These terms bind all who enter my realm"</p>
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
                <Crown className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Welcome to AVALORA</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                By entering the eternal winter realm of AVALORA, you agree to abide by these Terms of Service. 
                These terms govern your use of our Web3 gaming platform, your interactions with other warriors, 
                and your participation in the blockchain-powered ecosystem.
              </p>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-400/30">
                <p className="text-gray-300">
                  <strong>By playing AVALORA, you acknowledge that you have read, understood, and agree to be bound by these terms.</strong>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Sword className="w-6 h-6 text-red-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Warrior Code of Conduct</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                All warriors in AVALORA must uphold the highest standards of honor and respect:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-400/30">
                  <h3 className="text-white font-bold mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-400" />
                    Acceptable Behavior
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Respectful communication with all players</li>
                    <li>• Fair play and honest competition</li>
                    <li>• Helping new warriors learn the realm</li>
                    <li>• Reporting bugs and security issues</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-400/30">
                  <h3 className="text-white font-bold mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
                    Forbidden Actions
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Cheating, hacking, or exploiting bugs</li>
                    <li>• Harassment or toxic behavior</li>
                    <li>• Sharing accounts or selling game assets</li>
                    <li>• Attempting to manipulate the blockchain</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Blockchain and Digital Assets</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                AVALORA operates on the Avalanche blockchain, and your participation involves digital assets and cryptocurrency:
              </p>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-400/30">
                  <h3 className="text-white font-bold mb-2">Wallet Responsibility</h3>
                  <p className="text-gray-300 text-sm">
                    You are solely responsible for the security of your wallet and private keys. 
                    AVALORA cannot recover lost wallets or reverse blockchain transactions.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/30">
                  <h3 className="text-white font-bold mb-2">Digital Asset Ownership</h3>
                  <p className="text-gray-300 text-sm">
                    In-game assets (gems, items, achievements) are digital tokens on the blockchain. 
                    While you own these tokens, their value may fluctuate and they have no guaranteed real-world value.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                While we strive to keep AVALORA available 24/7, we cannot guarantee uninterrupted service:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>• Scheduled maintenance may temporarily interrupt gameplay</li>
                <li>• Blockchain network congestion may affect transaction speeds</li>
                <li>• We reserve the right to modify or discontinue features with notice</li>
                <li>• Emergency maintenance may occur without prior notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-lg p-4 border border-indigo-400/30 mb-4">
                <p className="text-gray-300 leading-relaxed">
                  All AVALORA content, including characters, artwork, storylines, and game mechanics, 
                  are protected by intellectual property laws. You may not reproduce, distribute, 
                  or create derivative works without explicit permission.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-lg p-4 border border-yellow-400/30">
                <p className="text-gray-300 leading-relaxed">
                  <strong>Important:</strong> AVALORA is provided "as is" without warranties. 
                  We are not liable for any losses, including but not limited to digital assets, 
                  cryptocurrency, or data. Participate at your own risk and never invest more than you can afford to lose.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right to suspend or terminate accounts that violate these terms. 
                Serious violations may result in permanent banishment from the realm.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact the Council</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                For questions about these terms or to report violations, contact our Council of Elders:
              </p>
              <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg p-4 border border-gray-600">
                <p className="text-white">
                  <strong>Email:</strong> legal@avalora.game<br />
                  <strong>Discord:</strong> AVALORA Official Server - #legal-support<br />
                  <strong>Response Time:</strong> Within 72 hours
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}