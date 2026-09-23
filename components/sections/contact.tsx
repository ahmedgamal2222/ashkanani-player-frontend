'use client'

import { useState, type FormEvent } from 'react'
import { Building2, CheckCircle2, Clock, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'

import AgencyLogo from '@/components/agency-logo'
import { usePlayer } from '@/components/player-provider'
import SectionHeading from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/contexts/language-context'
import { submitInquiry } from '@/lib/api'
import { sectionNumber } from '@/lib/site-sections'

const formSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  organization: z.string().trim().optional(),
  subject: z.string().trim().min(3),
  message: z.string().trim().min(10),
})

type FormValues = {
  fullName: string
  email: string
  phone: string
  organization: string
  subject: string
  message: string
}

const EMPTY_FORM: FormValues = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  subject: '',
  message: '',
}

export default function ContactSection() {
  const { content, pick, locale } = useLanguage()
  const { bundle, source } = usePlayer()
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const player = bundle.player
  const form = content.contact.form

  const update = (fieldKey: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [fieldKey]: value }))
    setErrors((current) => {
      if (!current[fieldKey]) return current
      const next = { ...current }
      delete next[fieldKey]
      return next
    })
  }

  const whatsappLink = `https://wa.me/${player.whatsappNumber ?? ''}?text=${encodeURIComponent(
    locale === 'ar'
      ? `مرحبًا، أرغب في التواصل بخصوص اللاعب ${player.fullNameAr}`
      : `Hello, I would like to enquire about the player ${player.fullNameEn}`
  )}`

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsed = formSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0] ?? 'form')] = pick(
          'This field is required',
          'هذا الحقل مطلوب'
        )
      }
      setErrors(fieldErrors)
      toast.error(pick('Please complete all required fields', 'يرجى إكمال الحقول المطلوبة'))
      return
    }

    setSubmitting(true)
    const result = await submitInquiry({ ...parsed.data, locale })
    setSubmitting(false)

    if (result.ok) {
      toast.success(result.message)
      setValues(EMPTY_FORM)
      return
    }

    toast.error(result.message, {
      action: {
        label: pick('Open WhatsApp', 'افتح واتساب'),
        onClick: () => window.open(whatsappLink, '_blank'),
      },
    })
  }

  const renderField = (
    name: keyof FormValues,
    label: string,
    placeholder: string,
    options: { type?: string; required?: boolean } = {}
  ) => (
    <div className="space-y-2">
      <label htmlFor={name} className="text-xs font-semibold tracking-wide text-foreground/80">
        {label}
        {options.required ? <span className="text-primary"> *</span> : null}
      </label>
      <Input
        id={name}
        name={name}
        type={options.type ?? 'text'}
        value={values[name]}
        placeholder={placeholder}
        onChange={(event) => update(name, event.target.value)}
        aria-invalid={Boolean(errors[name])}
        className={errors[name] ? 'border-destructive/60' : undefined}
      />
      {errors[name] ? <p className="text-[11px] text-destructive">{errors[name]}</p> : null}
    </div>
  )

  return (
    <section id="contact" className="relative bg-ink/40 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={`${sectionNumber('contact')} — ${content.navigation.contact}`}
          title={content.contact.title}
          subtitle={content.contact.subtitle}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-8">
          {/* بيانات الوكالة */}
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-5 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <AgencyLogo size="md" className="h-14 sm:h-16" />
                  <div>
                    <h3 className="font-serif text-lg font-black text-foreground">
                      {content.contact.agentTitle}
                    </h3>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-primary/85 uppercase">
                      {content.siteInfo.agencyTagline}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {content.contact.agentNote}
                </p>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-primary/25 bg-primary/10">
                      <Phone className="size-4 text-primary" />
                    </span>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-foreground/90 hover:text-primary"
                    >
                      {player.whatsappNumber ?? '—'}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-primary/25 bg-primary/10">
                      <Mail className="size-4 text-primary" />
                    </span>
                    <span className="text-foreground/85">
                      {player.email ?? pick('Available on request', 'متاح عند الطلب')}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-primary/25 bg-primary/10">
                      <MapPin className="size-4 text-primary" />
                    </span>
                    <span className="text-foreground/85">
                      {pick(player.addressEn, player.addressAr)}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full border border-primary/25 bg-primary/10">
                      <Building2 className="size-4 text-primary" />
                    </span>
                    <span className="text-foreground/85">
                      {pick(player.clubEn, player.clubAr)} •{' '}
                      {pick(player.nationalTeamEn, player.nationalTeamAr)}
                    </span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <MessageCircle className="size-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={content.siteInfo.agencyInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <Instagram className="size-4" />
                      Instagram
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="grid gap-3 p-6 sm:p-8">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-4 text-primary" />
                  {pick('Average response time: within 24 hours.', 'متوسط زمن الرد: خلال 24 ساعة.')}
                </p>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  {source === 'api' ? content.common.liveData : content.common.offlineData}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* نموذج التواصل */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                {renderField('fullName', form.name, form.namePlaceholder, { required: true })}
                {renderField('email', form.email, form.emailPlaceholder, {
                  type: 'email',
                  required: true,
                })}
                {renderField('phone', form.phone, form.phonePlaceholder)}
                {renderField('organization', form.organization, form.organizationPlaceholder)}
                <div className="sm:col-span-2">
                  {renderField('subject', form.subject, form.subjectPlaceholder, { required: true })}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold tracking-wide text-foreground/80"
                  >
                    {form.message}
                    <span className="text-primary"> *</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    placeholder={form.messagePlaceholder}
                    onChange={(event) => update('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    className={errors.message ? 'border-destructive/60' : undefined}
                  />
                  {errors.message ? (
                    <p className="text-[11px] text-destructive">{errors.message}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? form.submitting : form.submit}
                  </Button>
                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    {pick(
                      'Your message is stored securely in the agency database.',
                      'تُحفظ رسالتك بشكل آمن في قاعدة بيانات الوكالة.'
                    )}
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}