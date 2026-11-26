import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { contactConfig, profile } from '../data/site.js';
import { Button } from './ui/Button.jsx';
import { ArrowRightIcon } from './ui/Icons.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const empty = { name: '', email: '', message: '' };

/** Only a real http(s) URL counts as a form backend; anything else → mailto. */
const endpoint = /^https?:\/\//i.test(contactConfig.endpoint ?? '') ? contactConfig.endpoint : null;

const fieldClass =
  'w-full rounded-[6px] border border-line bg-card/90 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-mist focus:bg-card focus:outline-none aria-[invalid=true]:border-shu/60';

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const uid = useId();

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

    // No backend configured: hand off to the visitor's mail client rather
    // than pretending a static page just delivered an email.
    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setState('sent');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(endpoint, {
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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid min-h-[300px] place-items-center text-center"
        role="status"
      >
        <div>
          <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full border-2 border-sage/60 text-[1.2rem] text-sage" aria-hidden="true">
            ✓
          </div>
          <p className="mx-auto max-w-sm font-serif text-[1.25rem] italic text-ink">
            {endpoint
              ? contactConfig.successMessage
              : 'Your email draft is open — hit send and it reaches me.'}
          </p>
          <button
            onClick={() => setState('idle')}
            className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Write another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Your name" error={errors.name}>
          <input
            id={`${uid}-name`}
            type="text"
            value={values.name}
            onChange={update('name')}
            placeholder="Your name"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          />
        </Field>

        <Field id={`${uid}-email`} label="Your email" error={errors.email}>
          <input
            id={`${uid}-email`}
            type="email"
            value={values.email}
            onChange={update('email')}
            placeholder="you@example.com"
            autoComplete="email"
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
          />
        </Field>
      </div>

      <Field id={`${uid}-message`} label="Message" error={errors.message}>
        <textarea
          id={`${uid}-message`}
          rows={5}
          value={values.message}
          onChange={update('message')}
          placeholder="What are you building?"
          className={`${fieldClass} resize-y`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-err` : undefined}
        />
      </Field>

      {state === 'error' && (
        <p className="text-[0.86rem] text-shu" role="alert">
          That didn&apos;t go through. Try again, or email me directly at {profile.email}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send letter'}
          {state !== 'sending' && <ArrowRightIcon />}
        </Button>
        <span className="font-mono text-[0.68rem] text-ink-muted">Usually replies within a day</span>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted"
      >
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-err`} className="mt-1.5 block text-[0.8rem] text-shu">
          {error}
        </span>
      )}
    </div>
  );
}
