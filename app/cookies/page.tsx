'use client'

import { motion } from 'framer-motion'
import { Cookie, Settings, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CookiePolicyPage() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/CyberLines.jpg)',
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
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <Cookie className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-manga font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-300">Understanding data collection in the digital realm</p>
          <div className="text-gray-400 mt-2">Last updated: January 2025</div>
        </motion.div>

        {/* Character Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="float-right ml-8 mb-8 hidden lg:block"
        >
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border-2 border-purple-400/50 shadow-lg max-w-xs">
            <div className="text-center">
              <Image
                src="/Artworks-Characters/Ghosty.png"
                alt="Ghosty - Data Guardian"
                width={150}
                height={150}
                className="rounded-xl mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-white mb-2">GHOSTY</h3>
              <p className="text-purple-400 text-sm">Digital Phantom</p>
              <p className="text-gray-400 text-xs mt-2">"I track only what's necessary for your journey"</p>
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
                <Cookie className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">What Are Cookies?</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies are small data files stored on your device when you visit AVALORA. 
                Think of them as digital breadcrumbs that help us remember your preferences 
                and improve your gaming experience in the eternal winter realm.
              </p>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Types of Cookies We Use</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-400/30">
                  <h3 className="text-white font-bold mb-2">Essential Cookies</h3>
                  <p className="text-gray-300 text-sm mb-2">Required for basic functionality:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Authentication and login status</li>
                    <li>• Game session management</li>
                    <li>• Security and fraud prevention</li>
                    <li>• Wallet connection preferences</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-400/30">
                  <h3 className="text-white font-bold mb-2">Performance Cookies</h3>
                  <p className="text-gray-300 text-sm mb-2">Help us improve AVALORA:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Game performance analytics</li>
                    <li>• Error tracking and debugging</li>
                    <li>• Feature usage statistics</li>
                    <li>• Loading time optimization</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/30">
                  <h3 className="text-white font-bold mb-2">Preference Cookies</h3>
                  <p className="text-gray-300 text-sm mb-2">Remember your choices:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Language and region settings</li>
                    <li>• Theme and display preferences</li>
                    <li>• Audio and visual settings</li>
                    <li>• Notification preferences</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-400/30">
                  <h3 className="text-white font-bold mb-2">Analytics Cookies</h3>
                  <p className="text-gray-300 text-sm mb-2">Understand player behavior:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Popular game features</li>
                    <li>• User journey mapping</li>
                    <li>• Engagement metrics</li>
                    <li>• A/B testing results</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Third-Party Cookies</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Some cookies are set by third-party services we use to enhance your AVALORA experience:
              </p>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg p-3 border border-gray-600">
                  <strong className="text-white">Avalanche Network:</strong>
                  <span className="text-gray-300"> Blockchain interaction and wallet connectivity</span>
                </div>
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg p-3 border border-gray-600">
                  <strong className="text-white">Analytics Services:</strong>
                  <span className="text-gray-300"> Anonymous usage statistics and performance monitoring</span>
                </div>
                <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg p-3 border border-gray-600">
                  <strong className="text-white">CDN Services:</strong>
                  <span className="text-gray-300"> Fast content delivery and asset loading</span>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have full control over cookies in AVALORA:
              </p>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-400/30 mb-4">
                <h3 className="text-white font-bold mb-3">Browser Settings</h3>
                <p className="text-gray-300 mb-3">
                  You can control cookies through your browser settings:
                </p>
                <ul className="text-gray-300 space-y-1 ml-4">
                  <li>• Block all cookies (may affect functionality)</li>
                  <li>• Allow only essential cookies</li>
                  <li>• Delete existing cookies</li>
                  <li>• Set cookie expiration preferences</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-400/30">
                <h3 className="text-white font-bold mb-3">AVALORA Cookie Manager</h3>
                <p className="text-gray-300 mb-3">
                  Use our in-game cookie manager to customize your preferences:
                </p>
                <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Manage Cookie Preferences
                </button>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cookie Retention</h2>
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-400/30">
                <p className="text-gray-300 leading-relaxed">
                  <strong>Session Cookies:</strong> Deleted when you close your browser<br />
                  <strong>Persistent Cookies:</strong> Stored for up to 2 years or until you delete them<br />
                  <strong>Analytics Cookies:</strong> Retained for 26 months for trend analysis
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Questions About Cookies?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about our cookie usage or need help managing your preferences:
              </p>
              <div className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg p-4 border border-gray-600">
                <p className="text-white">
                  <strong>Email:</strong> cookies@avalora.game<br />
                  <strong>Discord:</strong> AVALORA Official Server - #privacy-help<br />
                  <strong>Response Time:</strong> Within 24 hours
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}