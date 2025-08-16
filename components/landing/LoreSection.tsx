'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function LoreSection() {
  return (
    <>

      <section 
        className="section-blend min-h-screen flex items-center relative"
        style={{
          backgroundImage: 'url(/ImageAssets/RedSky.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70" />


        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="slide-in-left"
            >
              <h2 className="text-5xl font-manga font-bold mb-6 text-avalanche-red">
                Lore of the Avalanche Realm
              </h2>
              <div className="space-y-4 text-lg text-gray-300">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  In the mystical realm of Avalanche, where snow-capped peaks touch the digital sky, 
                  ancient warriors known as the <span className="text-avalanche-red font-bold">Shiro no Kizuna</span> guard the sacred blockchain protocols.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Legend speaks of <span className="text-yellow-400 font-bold">AVAXIM - Emperor of AVALAND</span>, 
                  the supreme ruler who commands the digital realm with unmatched power. Under his reign, 
                  typing mastery and Web3 knowledge unlock the power to reshape reality itself.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="text-blue-400 font-bold">AVALANCH</span>, the Ambassador of AVALORA, 
                  guides worthy warriors through trials of speed, wit, and wisdom. Only those who prove 
                  their worth can claim the title of Avalanche Guardian.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-red-300"
                >
                  The realm is under threat from chaos entities that seek to corrupt the network. 
                  Will you rise to become the hero this world needs?
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="relative slide-in-right"
            >
              <div className="manga-border p-6 bg-black bg-opacity-50 backdrop-blur-sm relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src="/WebsiteAssets/AncientDesign.png"
                    alt="Ancient pattern"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="relative z-10">
                  <Image
                    src="/ImageAssets/SunsetLikeScene.png"
                    alt="Avalanche Realm"
                    width={500}
                    height={300}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  
                  {/* Character showcase */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="text-center"
                    >
                      <Image
                        src="/Artworks-Characters/AVAXIM - EMPEROR OF AVALAND.png"
                        alt="AVAXIM - Emperor of AVALAND"
                        width={120}
                        height={120}
                        className="mx-auto rounded-full border-2 border-yellow-400 mb-2"
                      />
                      <p className="text-yellow-400 font-bold text-sm">AVAXIM</p>
                      <p className="text-gray-400 text-xs">Emperor</p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      className="text-center"
                    >
                      <Image
                        src="/Artworks-Characters/AVALANCH.png"
                        alt="AVALANCH - Ambassador"
                        width={120}
                        height={120}
                        className="mx-auto rounded-full border-2 border-blue-400 mb-2"
                      />
                      <p className="text-blue-400 font-bold text-sm">AVALANCH</p>
                      <p className="text-gray-400 text-xs">Ambassador</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}