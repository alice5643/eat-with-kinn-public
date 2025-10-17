import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import HeroDecor from '../components/HeroDecor'

const TypewriterHeadline = ({ texts, speed = 45, pauseDuration = 2000, className = '' }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    if (!texts || texts.length === 0) return
    
    const currentText = texts[currentTextIndex]
    let timeout
    
    if (!isDeleting && displayed.length < currentText.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayed(currentText.slice(0, displayed.length + 1))
      }, speed)
    } else if (!isDeleting && displayed.length === currentText.length) {
      // Pause before deleting (only if more than one text)
      if (texts.length > 1) {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayed(currentText.slice(0, displayed.length - 1))
      }, speed / 2)
    } else if (isDeleting && displayed.length === 0) {
      // Move to next text
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }
    
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentTextIndex, texts, speed, pauseDuration])

  return (
    <span className={className} aria-live="polite">
      {displayed}
      <span className="animate-pulse ml-1">|</span>
    </span>
  )
}

const valueCards = [
  {
    title: 'Built for Small Food Businesses',
    copy: 'We understand your journey from home kitchen to thriving business. Everything you need is here—guidance, tools, and support designed specifically for food entrepreneurs like you.',
    icon: '🏠'
  },
  {
    title: 'Smart AI Tools That Work',
    copy: 'Handle inventory, customer chat, and payments effortlessly. Our AI-powered platform takes care of the admin so you can focus on creating amazing food experiences.',
    icon: '🤖'
  },
  {
    title: 'Build Trust, Grow Your Brand',
    copy: 'Stay compliant with food safety standards and build customer confidence. Turn your culinary passion into a trusted, profitable business that your community loves.',
    icon: '⭐'
  },
]

const buyerSteps = [
  {
    title: 'Discover Near You',
    copy: 'Search by cuisine, neighbourhood, or story. Each seller tells you what makes their food special.',
  },
  {
    title: 'Order with Ease',
    copy: 'Secure checkout powered by Stripe. Sellers organise pickup or delivery directly with you.',
  },
  {
    title: 'Share the Love',
    copy: 'Leave feedback, follow your favourite cooks, and spread the word to friends.',
  },
]

const sellerSteps = [
  {
    title: 'Apply & Get Approved',
    copy: 'Complete your Kinn Master application with our guidance through registration, certifications, and compliance.',
    time: '1-2 weeks'
  },
  {
    title: 'Set Up Your Kinnchen',
    copy: 'Create your professional storefront, upload your menu, and tell the story behind your culinary journey.',
    time: '2-3 days'
  },
  {
    title: 'Start Selling & Growing',
    copy: 'Launch your Kinnchen to the community and access ongoing support, marketing tools, and growth resources.',
    time: 'Ongoing'
  },
]

const stories = [
  {
    name: 'Ama • Kinn Master',
    business: 'Accra Kitchen',
    quote: '"Becoming a Kinn Master transformed my weekend brunch club into a thriving business. My Kinnchen now serves 60+ customers monthly, and I have been able to reinvest in professional equipment."',
  },
  {
    name: 'Khadija • Kinn Master', 
    business: 'Spice Trail',
    quote: '"I was nervous about compliance and certifications, but the Kinn team walked me through every step. Now my community can finally discover my authentic spice blends through my professional Kinnchen."',
  },
  {
    name: 'Lina • Kinn Master',
    business: 'Mezze by Lina',
    quote: '"The storytelling features in my Kinnchen let me share the tradition behind each dish. My customers don\'t just buy food - they become part of my culinary family."',
  },
]

const audienceTabs = [
  { key: 'seller', label: 'For Kinn Masters' },
  { key: 'buyer', label: 'For Kinn Buyers' },
]

const Homepage = () => {
  const [activeAudience, setActiveAudience] = useState('seller')
  const steps = activeAudience === 'seller' ? sellerSteps : buyerSteps

  return (
    <Fragment>
      <main className="bg-brand-cream">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-brand-cream via-brand-stone/35 to-white text-brand-forest">
          <HeroDecor />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-brand-forest shadow-lg backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-brand-honey badge-dot" />
                Nourish. Create. Connect
              </div>
              <h1 className="font-display text-4xl leading-tight text-brand-forest sm:text-5xl lg:text-6xl h-[120px] sm:h-[140px] lg:h-[180px] flex items-start">
                <TypewriterHeadline 
                  texts={[
                    "Kinn - A safe place to order food",
                    "Transform your culinary passion into a thriving business"
                  ]} 
                />
              </h1>
              <p className="font-hand text-brand-slate text-lg">
                Your Kinnchen awaits.
              </p>
              <p className="text-lg text-brand-forest/80 sm:text-xl">
                Fresh food, baked goods, and treats from local kitchens, bakers, and caterers — all FSA-verified for your peace of mind. Join passionate Kinn Masters building successful food businesses.
              </p>
              <nav className="flex flex-wrap gap-4">
                <NavLink to="/kinn-seller" className="btn-primary">
                  Become a Kinn Master
                </NavLink>
                <NavLink to="/founding-sellers" className="btn-secondary">
                  Learn our story
                </NavLink>
              </nav>
            </div>
            <div className="relative h-72 overflow-hidden rounded-[32px] sm:h-96">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/videos/vision-hdv.mp4"
                autoPlay
                muted
                playsInline
              />
            </div>
          </div>
        </section>

        {/* Kinn Master Value Propositions */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl space-y-10 px-6 py-16">
            <div className="space-y-4 text-center">
              <h2 className="font-hand text-brand-slate text-h4">Why Kinn</h2>
              <h2 className="font-display text-4xl text-brand-forest">Everything you need to transform your passion into profit</h2>
              <p className="mx-auto max-w-3xl text-brand-forest/80">
                We combine professional validation, modern AI-powered tools, and comprehensive support so Kinn Masters can focus on creating exceptional food experiences.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {valueCards.map((card) => (
                <div key={card.title} className="group rounded-[28px] border border-brand-stone/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-honey/10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-honey/20 text-brand-honey transition-all duration-300 group-hover:bg-brand-honey/30 group-hover:scale-110">
                    <span className="text-lg font-semibold">{card.icon}</span>
                  </div>
                  <h3 className="font-display text-2xl text-brand-forest group-hover:text-brand-honey transition-colors duration-300">{card.title}</h3>
                  <p className="mt-2 text-sm text-brand-forest/80 leading-relaxed">{card.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-brand-cream">
          <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
            <div className="space-y-3 text-center">
              <h2 className="font-hand text-brand-slate text-h4">How it works</h2>
              <h2 className="font-display text-4xl text-brand-forest">Build confidence on Kinn</h2>
              <p className="mx-auto max-w-3xl text-brand-forest/80">
                Whether you&apos;re launching your Kinnchen or exploring local kitchens, every experience is crafted, safe, and human.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex rounded-full border border-brand-stone/60 bg-white p-1 shadow-sm">
                {audienceTabs.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveAudience(tab.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      activeAudience === tab.key
                        ? 'bg-brand-honey text-brand-forest shadow'
                        : 'text-brand-forest/70 hover:text-brand-forest'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="space-y-4 rounded-[28px] bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-honey/25 font-display text-brand-forest group-hover:bg-brand-honey/40 transition-colors duration-300">
                      {index + 1}
                    </span>
                    {step.time && (
                      <span className="text-xs font-medium text-brand-slate bg-brand-slate/10 px-2 py-1 rounded-full">
                        {step.time}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl text-brand-forest">{step.title}</h3>
                  <p className="text-sm text-brand-forest/80 leading-relaxed">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seller Snapshot */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl grid gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-xs mx-auto">
              <img src="/images/demo.png" alt="Kinn SaaS demo" className="w-full h-auto object-contain rounded-[24px] shadow-xl" />
            </div>
            <div className="space-y-6">
              <h3 className="font-display text-3xl text-brand-forest">What Kinn Masters get on Kinn</h3>
              <ul className="grid gap-4 text-brand-forest/80">
                <li className="rounded-2xl bg-brand-cream p-4">
                  <span className="font-display text-lg text-brand-forest">Compliance concierge</span>
                  <p className="text-sm">Templates, checklists, and 1:1 guidance to get certified and launch your Kinnchen quickly.</p>
                </li>
                <li className="rounded-2xl bg-brand-cream p-4">
                  <span className="font-display text-lg text-brand-forest">Professional Kinnchen storefront</span>
                  <p className="text-sm">Customisable profile with menu cards, story blocks, and CTA buttons—showcase your culinary journey.</p>
                </li>
                <li className="rounded-2xl bg-brand-cream p-4">
                  <span className="font-display text-lg text-brand-forest">Payment & order management</span>
                  <p className="text-sm">Stripe-powered checkout plus order tracking so you can focus on what you do best - cooking.</p>
                </li>
              </ul>
              <NavLink to="/kinn-seller" className="btn-primary w-fit">
                Start your application
              </NavLink>
            </div>
          </div>
        </section>

        {/* Stories */}
        <section className="bg-brand-cream">
          <div className="mx-auto max-w-6xl space-y-10 px-6 py-16">
            <div className="space-y-3 text-center">
              <h2 className="font-hand text-brand-slate text-h4">Stories from our Kinn Masters</h2>
              <h3 className="font-display text-4xl text-brand-forest">Real Kinnchen, real impact</h3>
              <p className="mx-auto max-w-2xl text-brand-forest/80">
                Meet the Kinn Masters redefining local food economies—each story features heritage, resourcefulness, and community care.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {stories.map((story) => (
                <article key={story.name} className="relative rounded-[28px] bg-white p-6 shadow-lg">
                  <span className="absolute -top-4 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-honey text-2xl text-brand-forest">
                    "
                  </span>
                  <p className="mt-6 text-sm text-brand-forest/80 leading-relaxed">{story.quote}</p>
                  <div className="mt-4 space-y-1">
                    <p className="font-hand text-lg text-brand-forest">{story.name}</p>
                    <p className="text-xs text-brand-slate font-medium">{story.business}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative h-72 overflow-hidden rounded-[32px] shadow-xl sm:h-96">
              <img src="/images/buyer_section.png" alt="Buyer enjoying Kinn" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="space-y-6">
              <h2 className="font-hand text-brand-slate text-h4">About Kinn</h2>
              <h2 className="font-display text-4xl text-brand-forest">We exist to make homegrown food businesses thrive</h2>
              <p className="text-brand-forest/80">
                From early guidance on certifications to storytelling tools that help buyers connect, our team partners with Kinn Masters every step of the way. We believe culture-rich meals deserve modern infrastructure and equitable growth.
              </p>
            </div>
          </div>
        </section>

      </main>
    </Fragment>
  )
}

export default Homepage
