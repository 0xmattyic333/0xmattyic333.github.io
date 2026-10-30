import { contactLinks } from '../data/contact'
import Section from './Section'
import { externalLink, focusRing } from './styles'

const email = '0xmattyic333@gmail.com'

function Contact() {
  return (
    <Section id="contact">
      <div className="rounded-2xl border border-neon-sky/25 bg-slate-900/70 p-8 text-center">
        <h2 className="text-3xl font-bold text-white">Let's work together.</h2>
        <p className="mt-3 text-muted">
          Have a project in mind, or just want to talk code or mainframes? Reach out.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              // mailto: links open the mail app, so only web links get a new tab.
              {...(link.href.startsWith('http') ? externalLink : {})}
              className={`rounded-lg border border-slate-600 px-5 py-2.5 font-semibold text-slate-200 transition hover:border-neon-sky hover:text-white hover:shadow-[0_0_16px_rgba(59,130,246,0.4)] ${focusRing}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* break-all lets the long address wrap on narrow phones. */}
        <p className="mt-5 text-sm break-all text-muted">{email}</p>
      </div>
    </Section>
  )
}

export default Contact
