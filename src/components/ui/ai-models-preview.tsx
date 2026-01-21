import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AiModel = {
  id: string;
  name: string;
  provider?: string;
  family?: string;
  version?: string;
  description?: string;
  contextWindowTokens?: number;
  inputPricePer1KTokensUSD?: number;
  outputPricePer1KTokensUSD?: number;
  supports?: {
    vision?: boolean;
    functionCalling?: boolean;
    toolUse?: boolean;
    streaming?: boolean;
    jsonMode?: boolean;
    audioIn?: boolean;
    audioOut?: boolean;
  };
  tags?: string[];
  meta?: Record<string, unknown>;
};

type Props = {
  models: AiModel[];
  className?: string;
};

export const AiModelsList: React.FC<Props> = ({ models, className = "" }) => {
  const [selected, setSelected] = useState<AiModel | null>(null);

  const sorted = useMemo(() => {
    return [...models].sort((a, b) => {
      return (a.provider || "").localeCompare(b.provider || "");
    });
  }, [models]);

  const formatPrice = (n?: number) =>
    typeof n === "number" ? `$${n.toFixed(4)} / 1K tok` : "—";

  const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-full mr-1 mb-1">
      {children}
    </span>
  );

  return (
    <div className={`w-full max-w-5xl mx-auto p-4 ${className}`}>
      <h2 className="text-3xl font-extralight text-white text-center mb-8">
        AI Models
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((m) => (
          <motion.div
            key={m.id}
            layoutId={`card-${m.id}`}
            onClick={() => setSelected(m)}
            className="cursor-pointer bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-white">{m.name}</span>
              {m.version && <span className="text-xs text-white/50">v{m.version}</span>}
            </div>

            <p className="text-sm text-white/60 line-clamp-2 mb-3">
              {m.description || "No description available"}
            </p>

            <div className="flex flex-wrap">
              {m.supports?.streaming && <Badge>Streaming</Badge>}
              {m.supports?.vision && <Badge>Vision</Badge>}
              {m.supports?.functionCalling && <Badge>Functions</Badge>}
              {(m.tags || []).map((t) => (
                <Badge key={t}>#{t}</Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`card-${selected.id}`}
              className="relative bg-black/90 border border-white/20 rounded-2xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white/60 hover:text-white text-sm"
                onClick={() => setSelected(null)}
              >
                Close ✕
              </button>

              <h3 className="text-2xl font-light text-white mb-2">{selected.name}</h3>

              <p className="text-white/60 text-sm mb-6">
                {selected.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/40 mb-1">Provider</p>
                  <p className="text-white font-medium">{selected.provider || "—"}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/40 mb-1">Family</p>
                  <p className="text-white font-medium">{selected.family || "—"}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/40 mb-1">Input</p>
                  <p className="text-white font-medium">{formatPrice(selected.inputPricePer1KTokensUSD)}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-white/40 mb-1">Output</p>
                  <p className="text-white font-medium">{formatPrice(selected.outputPricePer1KTokensUSD)}</p>
                </div>
              </div>

              {selected.meta && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-white/40 mb-2">Additional Metadata</p>
                  <div className="space-y-1">
                    {Object.entries(selected.meta).map(([k, v]) => (
                      <div key={k} className="flex gap-2 text-sm">
                        <span className="text-white/60">{k}:</span>
                        <span className="text-white">{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
