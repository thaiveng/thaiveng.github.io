import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactConfig, profile } from '../data/site.js';
import { Button } from './ui/Button.jsx';
import { ArrowRightIcon } from './ui/Icons.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty = { name: '', email: '', message: '' };

const fieldClass =
  'w-full border border-hairline bg-ink-200/60 px-4 py-3 text-[0.92rem] text-chalk placeholder:text-slate-muted transition-colors duration-200 focus:border-cyber/60 focus:outline-none focus:ring-0';

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | error

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Tell me your name.';
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'That email looks off.';
    if (values.message.trim().length < 10) next.message = 'A little more detail?';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // No endpoint configured: hand off to the visitor's mail client rather
    // than pretending a static page just delivered an email.
    if (!contactConfig.endpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setState('sent');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(contactConfig.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Request failed');
      setState('sent');
      setValues(empty);
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid min-h-[280px] place-items-center border border-cyber/30 bg-cyber/[0.04] p-10 text-center"
      >
        <div>
          <div className="mx-auto mb-5 grid size-12 place-items-center rounded-full border border-cyber/40 text-cyber">
            ✓
          </div>
          <p className="font-display text-[1.1rem] font-semibold text-chalk">
            {contactConfig.endpoint
              ? contactConfig.successMessage
              : 'Your email draft is open — hit send and it reaches me.'}
          </p>
          <button
            onClick={() => setState('idle')}
            className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ash hover:text-cyber"
          >
            Send another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={update('name')}
            placeholder="Your name"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={update('email')}
            placeholder="you@example.com"
            autoComplete="email"
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <textarea
          rows={5}
          value={values.message}
          onChange={update('message')}
          placeholder="What are you building?"
          className={`${fieldClass} resize-y`}
          aria-invalid={Boolean(errors.message)}
        />
      </Field>

      {state === 'error' && (
        <p className="text-[0.84rem] text-amber">
          That didn&apos;t go through. Try again, or email me directly at {profile.email}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send'}
          {state !== 'sending' && <ArrowRightIcon />}
        </Button>
        <span className="font-mono text-[0.68rem] text-slate-muted">
          Usually replies within a day
        </span>
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ash">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[0.78rem] text-amber">{error}</span>}
    </label>
  );
}
