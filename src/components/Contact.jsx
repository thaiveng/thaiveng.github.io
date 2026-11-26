import { motion } from 'framer-motion';
import { profile, socials } from '../data/site.js';
import { ChapterHeading, Hanko, Section, Washi } from './ui/Section.jsx';
import { Reveal } from './ui/Reveal.jsx';
import { ArrowUpRightIcon, iconMap, MailIcon } from './ui/Icons.jsx';
import ContactForm from './ContactForm.jsx';

function ChannelLink({ icon: Icon, label, handle, href, external = true }) {
  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      whileHover={{ x: 3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="group flex items-center gap-4 border-b border-dashed border-line-strong py-3.5 last:border-b-0"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink-soft transition-colors group-hover:border-ink group-hover:text-ink">
        <Icon className="size-[17px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-muted">
          {label}
        </span>
        <span className="block truncate text-[0.95rem] text-ink">{handle}</span>
      </span>
      <ArrowUpRightIcon className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-shu" />
    </motion.a>
  );
}

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <ChapterHeading
        id="contact-title"
        index="05"
        label="Contact"
        title={
          <>
            Thanks for reading this far.{' '}
            <span className="italic text-ink-soft">Let&apos;s talk.</span>
          </>
        }
      >
        Whether it&apos;s a role, a project, a collaboration or just a conversation about Flutter,
        data or something new you&apos;re building, my inbox is open.
      </ChapterHeading>

      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* address card */}
        <Reveal className="relative">
          <div className="relative rounded-[8px] border border-line bg-card p-6 shadow-paper sm:p-7">
            <Washi tone="sage" className="-top-3 left-8 -rotate-3" />
            <div className="mb-2">
              <span className="eyebrow text-ink-muted">Find me at</span>
            </div>

            <div>
              <ChannelLink
                icon={MailIcon}
                label="Email"
                handle={profile.email}
                href={`mailto:${profile.email}`}
                external={false}
              />
              {socials.map((s) => {
                const Icon = iconMap[s.icon];
                return Icon ? (
                  <ChannelLink key={s.label} icon={Icon} label={s.label} handle={s.handle ?? s.href} href={s.href} />
                ) : null;
              })}
            </div>

            <p className="mt-5 text-[0.86rem] leading-relaxed text-ink-muted">
              Based in {profile.location}.
            </p>
          </div>
        </Reveal>

        {/* the letter */}
        <Reveal delay={0.1}>
          <div className="relative rounded-[8px] border border-line bg-card shadow-paper">
            <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
              <span className="font-serif text-[1.1rem] italic text-ink-soft">
                Dear {profile.firstName},
              </span>
              <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-faint">
                A short letter
              </span>
            </div>
            <div className="paper-ruled px-6 py-7 sm:px-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>

      {/* journal sign-off */}
      <Reveal className="mt-20 flex flex-col items-center text-center lg:mt-24">
        <p className="max-w-lg font-serif text-[clamp(1.25rem,2.6vw,1.6rem)] italic leading-snug text-ink-soft">
          {profile.tagline}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <span className="font-serif text-[1.35rem] italic text-ink">— {profile.firstName}</span>
          <Hanko size={52} rotate={-10}>
            {profile.initials}
          </Hanko>
        </div>
      </Reveal>
    </Section>
  );
}
