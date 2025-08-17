'use client'

export function SimpleFooter() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">AVALORA</h3>
        <p className="text-gray-400 mb-4">
          © 2025 AVALORA. All rights reserved. Built on Avalanche.
        </p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms</a>
          <a href="#" className="text-gray-400 hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  )
}