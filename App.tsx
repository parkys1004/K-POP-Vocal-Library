import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, Music, User, Flame, Heart, Zap, Sparkles, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { prompts, Prompt } from './data';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories = [
    { id: 'All', name: '전체', icon: <Music size={22} /> },
    { id: 'BoyGroup', name: '보이그룹', icon: <Zap size={22} /> },
    { id: 'GirlGroup', name: '걸그룹', icon: <Heart size={22} /> },
    { id: 'Ballad', name: '발라드/R&B', icon: <User size={22} /> },
    { id: 'HipHop', name: '힙합/댄스', icon: <Flame size={22} /> },
    { id: 'Special', name: '스페셜/컨셉', icon: <Sparkles size={22} /> },
  ];

  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      const matchesSearch = p.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.descriptionKo.includes(searchTerm); // Search in Korean too
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Effects - Updated for K-Pop (Neon Pink/Blue/Purple) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.15, 0.25, 0.15],
             rotate: [0, 90, 0]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-pink-500/20 rounded-full blur-[120px]" 
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.3, 1],
             opacity: [0.1, 0.2, 0.1],
             rotate: [0, -60, 0]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px]" 
         />
         <motion.div 
           animate={{ 
             opacity: [0.1, 0.2, 0.1],
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[80px]" 
         />
      </div>

      <div className="relative z-10 p-4 md:p-10">
        
        {/* Header */}
        <header className="max-w-[1600px] mx-auto mb-16 text-center pt-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent inline-block drop-shadow-2xl">
                K-POP 보컬 라이브러리
              </span>
            </h1>
            <p className="text-neutral-300 text-xl md:text-3xl font-light">
              <span className="text-pink-400 font-bold">Suno</span> & <span className="text-cyan-400 font-bold">Udio</span> 최적화
              <span className="mx-4 opacity-30">|</span>
              100개의 K-POP 스타일 프롬프트
            </p>
          </motion.div>
        </header>

        {/* Controls (Sticky) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-[1600px] mx-auto sticky top-6 z-50 mb-10"
        >
          <div className="glass-panel p-5 rounded-3xl shadow-2xl">
            <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full md:w-1/3 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-pink-500 transition-colors" size={24} />
                <input
                  type="text"
                  placeholder="스타일 검색 (예: Girl Crush, High note...)"
                  className="w-full bg-neutral-900/50 border border-neutral-700 rounded-2xl py-4 pl-16 pr-6 text-xl text-white placeholder-neutral-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="flex overflow-x-auto w-full md:w-auto no-scrollbar gap-3 pb-2 md:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all whitespace-nowrap overflow-hidden"
                  >
                    {activeCategory === cat.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl shadow-lg"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-3 text-lg ${activeCategory === cat.id ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}>
                      {cat.icon}
                      <span>{cat.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-[1600px] mx-auto mb-8 px-2 flex items-center gap-4"
        >
          <div className="h-px bg-neutral-800 flex-grow"></div>
          <span className="text-base text-neutral-500 uppercase tracking-widest font-bold">
            총 {filteredPrompts.length}개의 프롬프트
          </span>
          <div className="h-px bg-neutral-800 flex-grow"></div>
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredPrompts.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", duration: 0.4 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-neutral-900/80 border border-neutral-800 p-8 rounded-3xl hover:border-pink-500/50 hover:bg-neutral-900 transition-all duration-300 relative overflow-hidden shadow-lg backdrop-blur-sm flex flex-col"
              >
                {/* Glowing border effect on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500/20 rounded-3xl pointer-events-none transition-all duration-500"></div>
                <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-pink-500 to-purple-600 group-hover:h-full transition-all duration-500 ease-out" />
                
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-mono text-pink-500/70 font-bold tracking-widest">
                    #{p.id.toString().padStart(3, '0')}
                  </span>
                  <Badge category={p.category} />
                </div>

                <div className="mb-8 flex-grow">
                  <p className="text-neutral-100 font-semibold text-xl md:text-2xl leading-relaxed pr-2 break-words mb-4">
                    {p.text}
                  </p>
                  <p className="text-neutral-400 text-base md:text-lg font-light leading-relaxed break-keep border-t border-neutral-800 pt-4">
                    {p.descriptionKo}
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(p.text, p.id)}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl transition-all font-bold text-lg shadow-md overflow-hidden relative ${
                    copiedId === p.id 
                    ? 'bg-green-600 text-white shadow-green-900/40' 
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white group-hover:bg-neutral-800'
                  }`}
                >
                  <AnimatePresence mode='wait'>
                    {copiedId === p.id ? (
                      <motion.div
                        key="copied"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <Check size={24} /> <span>복사 완료!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-3"
                      >
                        <Copy size={24} /> <span>프롬프트 복사</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPrompts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center py-40"
          >
            <div className="bg-neutral-900/50 inline-block p-10 rounded-full mb-8">
              <Music className="text-neutral-700" size={80} />
            </div>
            <p className="text-neutral-400 text-3xl font-bold mb-3">검색 결과가 없습니다.</p>
            <p className="text-neutral-600 text-xl">다른 키워드나 카테고리를 선택해보세요.</p>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="max-w-[1600px] mx-auto mt-40 pt-12 border-t border-neutral-800/50 text-center text-neutral-500 pb-16">
          <p className="mb-3 font-medium text-lg">© 2026 K-POP AI Prompt Library</p>
          <p className="text-base opacity-60">Made for AI Music Creators in Korea</p>
        </footer>
      </div>

      {/* Mobile Sticky Hint */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 md:hidden z-50 w-[90%]"
      >
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-4 rounded-full text-white text-base font-bold shadow-2xl shadow-pink-900/50 flex items-center justify-center gap-3 animate-pulse">
           <Sparkles size={20} fill="currentColor" />
           팁: 복사해서 Suno [Style] 칸에 붙여넣으세요!
        </div>
      </motion.div>
    </div>
  );
};

const Badge = ({ category }: { category: string }) => {
  let style = "bg-neutral-800 text-neutral-400";
  let label = category;
  
  // Mapping to Korean and styles (Updated for K-Pop theme)
  switch(category) {
    case 'BoyGroup': 
      style = "bg-blue-950/40 text-blue-400 border border-blue-900/30"; 
      label = "보이그룹";
      break;
    case 'GirlGroup': 
      style = "bg-pink-950/40 text-pink-400 border border-pink-900/30"; 
      label = "걸그룹";
      break;
    case 'Ballad': 
      style = "bg-purple-950/40 text-purple-400 border border-purple-900/30"; 
      label = "발라드/R&B";
      break;
    case 'HipHop': 
      style = "bg-orange-950/40 text-orange-400 border border-orange-900/30"; 
      label = "힙합/댄스";
      break;
    case 'Special': 
      style = "bg-teal-950/40 text-teal-400 border border-teal-900/30"; 
      label = "스페셜";
      break;
  }

  return (
    <span className={`text-xs md:text-sm px-4 py-1.5 rounded-full uppercase tracking-tighter font-bold shadow-sm ${style}`}>
      {label}
    </span>
  );
};

export default App;