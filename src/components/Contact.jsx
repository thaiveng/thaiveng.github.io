import { profile, socials } from '../data/site.js';
import { Section, SectionHeading, GlowOrb } from './ui/Section.jsx';
import { Reveal } from './ui/Reveal.jsx';
import { iconMap } from './ui/Icons.jsx';
import ContactForm from './ContactForm.jsx';

export default function Contact() {
  return (
    <Section id="contact" wide className="relative overflow-hidden">
      <GlowOrb className="left-1/2 top-0 -translate-x-1/2" />

      <SectionHeading label="Contact" title="Let's build something" align="center">
        A project, a collaboration, or just a conversation about tech — the inbox is open.
      </SectionHeading>

      <div className="mx-auto grid w-full max-w-3xl gap-8">
        {/* form + direct details */}
        <Reveal className="flex flex-col gap-8">
          <div className="border border-hairline bg-ink-100/60 p-6 md:p-8">
            <ContactForm />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5 border border-hairline bg-ink-100/40 px-6 py-5">
            <div>
              <div className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-slate-muted">
                Direct
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-[0.98rem] font-medium text-chalk transition-colors hover:text-cyber"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex gap-2.5">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="grid size-9 place-items-center border border-hairline text-ash transition-colors hover:border-cyber/50 hover:text-cyber"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

      </div>
    </Section>
  );
}
