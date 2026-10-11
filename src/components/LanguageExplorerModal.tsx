import React, { useState } from 'react';
import { X, Search, Sparkles, Copy, Check } from 'lucide-react';
import { LANGUAGES_DATA, LanguageInfo } from '../data/languages';
import { soundFx } from '../utils/audio';

interface LanguageExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHighlightLanguage: (langName: string) => void;
}

export const LanguageExplorerModal: React.FC<LanguageExplorerModalProps> = ({
  isOpen,
  onClose,
  onHighlightLanguage,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = LANGUAGES_DATA.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.primaryPhrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (item: LanguageInfo) => {
    navigator.clipboard.writeText(`${item.primaryPhrase} (${item.name}) - "${item.meaning}"`);
    setCopiedCode(item.code);
    soundFx.playChime(6, 0.7);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleHighlight = (item: LanguageInfo) => {
    onHighlightLanguage(item.name);
    soundFx.playChime(4, 1.2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#120517] border border-pink-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#fbebf2]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-pink-500/15 flex items-center justify-between bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-300">
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
                The 25 Languages of Love
              </h2>
              <p className="text-xs text-pink-200/60 font-sans-main">
                Every phrase woven into the giant LOVE constellation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-pink-300/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:px-6 border-b border-pink-500/10 bg-[#0d0312]/60">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-300/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by language, script, or phrase (e.g. French, 사랑해, Te amo)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/5 border border-pink-500/20 rounded-xl text-white placeholder-pink-200/40 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all font-sans-main"
            />
          </div>
        </div>

        {/* Languages Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {filtered.map((item) => (
            <div
              key={item.code}
              className="group p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-pink-500/10 hover:border-pink-500/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm text-pink-100">{item.name}</span>
                    <span className="text-xs text-pink-300/50">· {item.nativeName}</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300/80 border border-pink-500/15">
                    {item.region}
                  </span>
                </div>

                {/* Main Script */}
                <div className="my-2">
                  <p className="font-display text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200">
                    {item.primaryPhrase}
                  </p>
                  <p className="text-xs text-pink-200/70 italic mt-0.5 font-sans-main">
                    "{item.meaning}"
                  </p>
                </div>

                <div className="text-[11px] text-pink-300/50 font-mono">
                  {item.pronunciation}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-pink-500/10">
                <button
                  onClick={() => handleCopy(item)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-pink-200/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy phrase"
                >
                  {copiedCode === item.code ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-pink-300/60" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleHighlight(item)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-pink-500/20"
                >
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>Highlight in LOVE</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#09020d] border-t border-pink-500/10 text-xs text-pink-200/50 flex items-center justify-between">
          <span>Displaying {filtered.length} of {LANGUAGES_DATA.length} languages</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 text-xs transition-colors cursor-pointer"
          >
            Back to Universe
          </button>
        </div>
      </div>
    </div>
  );
};
