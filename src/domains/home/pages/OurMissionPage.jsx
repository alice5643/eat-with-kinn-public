import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const OurMissionPage = () => {
  return (
    <Fragment>
      <main className="bg-brand-cream">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-cream via-brand-stone/35 to-white text-brand-forest">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <h1 className="font-display text-4xl leading-tight text-brand-forest sm:text-5xl lg:text-6xl mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-brand-forest/80 leading-relaxed">
              We exist to make homegrown food businesses thrive by creating a platform where passionate cooks can build sustainable, compliant businesses while connecting with their communities.
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl text-brand-forest">Why Kinn Exists</h2>
                <div className="space-y-4 text-brand-forest/80">
                  <p>
                    Too many talented home cooks struggle with the complexity of starting a legitimate food business. From food safety certifications to payment processing, the barriers feel overwhelming.
                  </p>
                  <p>
                    Meanwhile, communities are hungry for authentic, local food experiences but don't know where to find trusted, professional home-based food businesses.
                  </p>
                  <p>
                    Kinn bridges this gap by providing the infrastructure, guidance, and platform that transforms culinary passion into thriving, compliant businesses.
                  </p>
                </div>
              </div>
              <div className="relative h-72 overflow-hidden rounded-[32px] shadow-xl">
                <img 
                  src="/images/seller_section.png" 
                  alt="Kinn Masters at work" 
                  className="absolute inset-0 h-full w-full object-cover" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-brand-cream">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-brand-forest mb-4">Our Values</h2>
              <p className="text-brand-forest/80 max-w-3xl mx-auto">
                These principles guide everything we build and every decision we make.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white rounded-[28px] p-8 text-center shadow-lg">
                <div className="w-16 h-16 rounded-full bg-brand-honey/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-display text-xl text-brand-forest mb-4">Authentic Community</h3>
                <p className="text-brand-forest/80 text-sm">
                  We celebrate the rich culinary traditions and stories that make each Kinn Master unique, fostering genuine connections between cooks and their communities.
                </p>
              </div>

              <div className="bg-white rounded-[28px] p-8 text-center shadow-lg">
                <div className="w-16 h-16 rounded-full bg-brand-honey/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="font-display text-xl text-brand-forest mb-4">Accessible Excellence</h3>
                <p className="text-brand-forest/80 text-sm">
                  Professional-grade tools and guidance shouldn't be reserved for big businesses. We make compliance, technology, and growth resources accessible to everyone.
                </p>
              </div>

              <div className="bg-white rounded-[28px] p-8 text-center shadow-lg">
                <div className="w-16 h-16 rounded-full bg-brand-honey/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-display text-xl text-brand-forest mb-4">Sustainable Growth</h3>
                <p className="text-brand-forest/80 text-sm">
                  We believe in building businesses that thrive long-term, supporting both the financial wellbeing of Kinn Masters and the food security of their communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl text-brand-forest">How We Started</h2>
                <div className="space-y-4 text-brand-forest/80">
                  <p>
                    Kinn began when we noticed a pattern: incredibly talented home cooks who wanted to share their food with their communities but felt overwhelmed by the business and compliance requirements.
                  </p>
                  <p>
                    We saw bakers posting in local Facebook groups, caterers struggling with payment systems, and cultural food experts unable to scale beyond word-of-mouth because they lacked the infrastructure.
                  </p>
                  <p>
                    Meanwhile, we were part of communities hungry for authentic, local food experiences but didn't have a trusted way to discover and support these passionate cooks.
                  </p>
                  <p>
                    So we built Kinn—a platform that handles the complexity so Kinn Masters can focus on what they do best: creating amazing food experiences.
                  </p>
                </div>
              </div>
              <div className="relative h-72 overflow-hidden rounded-[32px] shadow-xl">
                <img 
                  src="/images/buyer_section.png" 
                  alt="Community enjoying Kinn" 
                  className="absolute inset-0 h-full w-full object-cover" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="bg-brand-cream">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl text-brand-forest mb-4">Our Impact</h2>
              <p className="text-brand-forest/80 max-w-3xl mx-auto">
                We measure success by the thriving businesses and strengthened communities we help create.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div className="bg-white rounded-[28px] p-8 shadow-lg">
                <div className="text-3xl font-bold text-brand-honey mb-2">50+</div>
                <div className="font-display text-lg text-brand-forest mb-2">Kinn Masters</div>
                <div className="text-sm text-brand-forest/80">Passionate cooks building sustainable food businesses</div>
              </div>

              <div className="bg-white rounded-[28px] p-8 shadow-lg">
                <div className="text-3xl font-bold text-brand-honey mb-2">1000+</div>
                <div className="font-display text-lg text-brand-forest mb-2">Orders Fulfilled</div>
                <div className="text-sm text-brand-forest/80">Delicious meals connecting communities</div>
              </div>

              <div className="bg-white rounded-[28px] p-8 shadow-lg">
                <div className="text-3xl font-bold text-brand-honey mb-2">15+</div>
                <div className="font-display text-lg text-brand-forest mb-2">Neighbourhoods</div>
                <div className="text-sm text-brand-forest/80">Local communities discovering authentic flavors</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <h2 className="font-display text-3xl text-brand-forest mb-6">Join Our Mission</h2>
            <p className="text-brand-forest/80 mb-8 text-lg">
              Whether you're a passionate cook ready to start your food business or someone who loves supporting local culinary talent, there's a place for you in the Kinn community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <NavLink to="/kinn-seller" className="btn-primary">
                Become a Kinn Master
              </NavLink>
              <NavLink to="/search" className="btn-secondary">
                Discover Kinn Masters
              </NavLink>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default OurMissionPage;
