'use client'

import { motion } from 'framer-motion'
import { HelpCircle, MessageCircle, Mail, Book, Bug, Shield, ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function SupportPage() {
  const supportCategories = [
    {
      icon: HelpCircle,
      title: 'Getting Started',
      description: 'New to AVALORA? Learn the basics of Web3 gaming',
      color: 'from-blue-500 to-cyan-600',
      topics: ['Creating your first wallet', 'Understanding blockchain', 'Basic gameplay tutorial', 'Earning your first gems']
    },
    {
      icon: Shield,
      title: 'Account & Security',
      description: 'Protect your account and digital assets',
      color: 'from-green-500 to-emerald-600',
      topics: ['Wallet security best practices', 'Two-factor authentication', 'Recovering lost access', 'Reporting suspicious activity']
    },
    {
      icon: Bug,
      title: 'Technical Issues',
      description: 'Troubleshoot common problems',
      color: 'from-red-500 to-orange-600',
      topics: ['Connection problems', 'Performance issues', 'Browser compatibility', 'Mobile device support']
    },
    {
      icon: Book,
      title: 'Game Mechanics',
      description: 'Master the art of AVALORA gameplay',
      color: 'from-purple-500 to-pink-600',
      topics: ['Quest system explained', 'Training and skills', 'Marketplace trading', 'Leaderboard rankings']
    }
  ]

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/ImageAssets/Tree.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-90" />
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-6xl">
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
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-manga font-bold text-white mb-4">Support Center</h1>
          <p className="text-xl text-gray-300">Your guide through the eternal winter realm</p>
        </motion.div>

        {/* Character Helper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border-2 border-indigo-400/50 shadow-lg">
            <div className="flex items-center space-x-4">
              <Image
                src="/Artworks-Characters/Cutter.png"
                alt="Cutter - Support Guide"
                width={80}
                height={80}
                className="rounded-xl"
              />
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-1">CUTTER</h3>
                <p className="text-indigo-400 text-sm mb-2">Support Guide</p>
                <p className="text-gray-300 text-sm max-w-md">
                  "Greetings, warrior! I'm here to help you navigate any challenges in AVALORA. 
                  Choose a category below or contact our support team directly."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border-2 border-blue-400/50 text-center">
            <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
            <p className="text-gray-300 text-sm mb-4">Get instant help from our support team</p>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Start Chat
            </button>
            <p className="text-gray-400 text-xs mt-2">Available 24/7</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border-2 border-green-400/50 text-center">
            <Mail className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
            <p className="text-gray-300 text-sm mb-4">Send us a detailed message</p>
            <a 
              href="mailto:support@avalora.game"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Send Email
            </a>
            <p className="text-gray-400 text-xs mt-2">Response within 24h</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border-2 border-purple-400/50 text-center">
            <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Discord Community</h3>
            <p className="text-gray-300 text-sm mb-4">Join our active community</p>
            <a 
              href="#"
              className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Join Discord
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
            <p className="text-gray-400 text-xs mt-2">Community support</p>
          </div>
        </motion.div>

        {/* Support Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Browse Help Topics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-gray-300 text-sm">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {category.topics.map((topic, topicIndex) => (
                    <button
                      key={topicIndex}
                      className="w-full text-left p-3 rounded-lg bg-gray-700/30 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200 text-sm"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 border border-gray-600/50"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How do I connect my wallet to AVALORA?",
                answer: "Click the 'Connect Wallet' button on the auth page and select your preferred wallet provider. We support MetaMask, WalletConnect, and other popular Avalanche-compatible wallets."
              },
              {
                question: "What is the exchange rate for gems?",
                answer: "The current rate is 1 AVAX = 10,000 gems. This rate may be adjusted based on market conditions and game economy balance."
              },
              {
                question: "How do I earn XP and level up?",
                answer: "Complete quests, participate in training challenges, read codex entries, and engage with the community. Each activity rewards different amounts of XP."
              },
              {
                question: "Is my wallet information secure?",
                answer: "Yes! We never store your private keys. All wallet interactions use secure blockchain protocols, and your assets remain under your complete control."
              },
              {
                question: "Can I play AVALORA on mobile devices?",
                answer: "AVALORA is optimized for desktop browsers but works on mobile devices with wallet apps like MetaMask mobile. Full mobile optimization is coming soon!"
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-6 border-2 border-red-400/50">
            <h3 className="text-xl font-bold text-white mb-2">Security Emergency?</h3>
            <p className="text-gray-300 mb-4">
              If you suspect unauthorized access to your account or notice suspicious activity, 
              contact our security team immediately.
            </p>
            <a 
              href="mailto:security@avalora.game"
              className="inline-block bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Report Security Issue
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}