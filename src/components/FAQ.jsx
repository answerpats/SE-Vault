import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import useCollection from '../hooks/useCollection';

export default function FAQ() {
  const { items, loading } = useCollection('faqs');
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-section max-w-[720px]">
        <div className="text-center mb-14 sm:mb-20">
          <span className="text-accent-orange text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-text-muted text-sm sm:text-base mt-4 leading-relaxed">
            Find answers to common questions about our services.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-text-muted text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <HelpCircle size={40} className="text-white/10 mx-auto mb-3" />
            <p className="text-text-muted">No FAQs added yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none"
                >
                  <h3 className="text-[15px] sm:text-base font-semibold text-white leading-snug">{item.question}</h3>
                  <ChevronDown
                    size={18}
                    className={`text-accent-orange flex-shrink-0 transition-transform duration-300 ${expandedId === item.id ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedId === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="h-px bg-white/8 mb-4" />
                    <p className="text-text-muted text-[13px] sm:text-sm leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
