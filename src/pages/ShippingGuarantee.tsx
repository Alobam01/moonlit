import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";

export default function ShippingGuarantee() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-coral/10 text-coral-dark text-sm font-medium mb-4">
              Shipping & Guarantee
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Shipping and
              <span className="text-gradient block">Health Warranty</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We take kitten care seriously. Every kitten goes home with a
              comprehensive care package, up-to-date vaccinations, and a
              congenital warranty.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card variant="feature" className="animate-fade-up">
              <CardContent className="p-8 space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Maintaining the Highest Level of Care
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Maintaining the highest level of care for our beloved kittens is
                  a top priority that we take very seriously. We find great joy
                  in seeing our pets placed in welcoming, loving homes, and we
                  stand behind their health, safety, and well-being.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our kittens are accompanied by a comprehensive care package,
                  complete with up-to-date vaccinations and a 1-year congenital
                  warranty.
                </p>
              </CardContent>
            </Card>

            <Card variant="feature" className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-8 space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Shipping
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Shipping will be arranged once the kitten is paid in full and the
                  contract has been signed.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Shipping is $250-500 via Delivery or Pet Nanny to anywhere in the
                  USA, Canada and Hawaii/Puerto Rico. Munchkin kitties must be
                  shipped with a pet nanny in cabin, cost varies. In summer months,
                  all kittens must be driven or flown in cabin. No cargo shipping
                  allowed—it’s too hot.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You will be given the option at checkout if you need shipping or
                  local pickup. Shipping via pet nanny, the kitten will be between
                  8 to 20 weeks old.
                </p>
              </CardContent>
            </Card>

            <Card variant="feature" className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-8 space-y-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Health Warranty (Two Parts)
                </h2>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Part 1: Protection from Receiving a Sick Kitten
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You must have your kitten examined by a licensed veterinarian
                    within 96 hours of leaving our care. If your veterinarian
                    determines that the kitten is ill and/or unfit for sale, you
                    may return the kitten and we’ll refund the full sale price.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Important details: we require an original written statement
                    from your veterinarian; we won’t reimburse for veterinary
                    fees; kitten shipping fees are not refundable, but if you paid
                    to have your kitten shipped then we’ll pay to have it shipped
                    back.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We adhere strictly to the 96-hour time limit. We understand
                    that vet offices are closed on weekends and holidays, but
                    viruses don’t respect office hours.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Part 2: Long-Term Protection from Genetic/ Congenital Conditions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    If your kitten or cat is diagnosed with a serious genetic defect
                    or congenital disease before 2 years of age, we will provide
                    you with a replacement kitten. Depending on the specific
                    condition, we will work with you to decide who can best care
                    for the sick cat.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Examples that would qualify include life-threatening heart
                    conditions and degenerative nerve disorders. Examples that
                    wouldn’t qualify include innocent heart murmurs or allergies.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    In general, we would accept a veterinarian’s opinion of what
                    constitutes a serious defect, but we may require a second
                    opinion (which would be obtained at our expense.)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card variant="feature" className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <CardContent className="p-8 space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  VIP Nanny Delivery Service
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Don’t have time to come here and pick up your kitten or even meet
                  us at the airport? Take advantage of our VIP nanny delivery
                  service. Our nanny will hand-deliver your new baby to the airport
                  of your choice—simply arrive with a photo ID to pick up your
                  kitten.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Your new furry family member will have their every need attended
                  to during their flight, including play and cuddle time. This
                  all-exclusive VIP (Very Important Pet) service is a luxury option
                  for families who prefer their kitty to travel with a personal
                  assistant.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

