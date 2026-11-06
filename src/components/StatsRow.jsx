import { stats } from '../data/site.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { RevealGroup, revealItem } from './ui/Reveal.jsx';
import { motion } from 'framer-motion';

function StatCard({ stat, index }) {
  const [ref, value] = useCountUp(stat.value, { delay: index * 120 });

  return (
    <motion.div
      ref={ref}
      variants={revealItem}
      className="group relative overflow-hidden border border-hairline bg-ink-100/70 p-6"
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-cyber transition-all duration-300 group-hover:w-[5px]" />
      <div className="font-display text-[2.2rem] font-bold leading-none tabular-nums text-cyber">
        {value}
        {stat.suffix}
      </div>
      <div className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ash">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsRow() {
  return (
    <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} />
      ))}
    </RevealGroup>
  );
}
