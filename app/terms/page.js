export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for The Retreat Cottage — a luxury homestay near Dharampur, Himachal Pradesh.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 text-primary-200 text-base leading-relaxed">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-medium text-accent-400 mb-4">
          Terms of Service
        </h1>
        <p className="text-primary-300 text-sm">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing and using the website and services of The Retreat Cottage
          (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), located near
          Dharampur, Himachal Pradesh, India, you agree to be bound by these
          Terms of Service. If you do not agree, please refrain from using our
          services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">
          2. Booking &amp; Reservations
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>
            All bookings are subject to availability and confirmation by The
            Retreat Cottage.
          </li>
          <li>
            A valid government-issued photo ID is required at the time of
            check-in for all guests.
          </li>
          <li>
            The number of guests must not exceed the capacity of the booked
            accommodation.
          </li>
          <li>
            Check-in time is 2:00 PM and check-out time is 11:00 AM unless
            otherwise communicated.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">
          3. Payment &amp; Cancellation
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>
            Full payment or an advance booking amount is required at the time of
            reservation.
          </li>
          <li>
            Cancellations made 7 or more days before the check-in date are
            eligible for a full refund minus processing fees.
          </li>
          <li>
            Cancellations made within 7 days of check-in may attract a
            cancellation charge of up to 50% of the total booking amount.
          </li>
          <li>No-shows will not be eligible for a refund.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">4. Guest Conduct</h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>
            Guests are expected to maintain decorum and respect the peaceful
            environment of the property.
          </li>
          <li>
            Loud music, parties, or any activity causing disturbance to other
            guests or neighbours is strictly prohibited.
          </li>
          <li>Smoking is not permitted inside any room or enclosed area.</li>
          <li>
            Any damage to property caused by guests will be charged accordingly.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">
          5. Food &amp; Beverages
        </h2>
        <p>
          We offer a homemade vegetarian menu. Non-vegetarian food may be
          ordered from outside with prior permission. Alcohol consumption is the
          guest&apos;s responsibility; we do not provide or serve alcoholic
          beverages.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">6. Liability</h2>
        <p>
          The Retreat Cottage shall not be held liable for any loss, damage, or
          injury sustained by guests during their stay, including but not
          limited to loss of personal belongings, accidents, or natural
          calamities. Guests are advised to take necessary precautions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">7. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws
          of India. Any disputes arising from these terms shall be subject to
          the exclusive jurisdiction of the courts in Solan, Himachal Pradesh.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">8. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at{" "}
          <a
            href="mailto:info@retreatcottage.in"
            className="text-accent-400 hover:text-accent-300 transition-colors underline"
          >
            info@retreatcottage.in
          </a>{" "}
          or call{" "}
          <a
            href="tel:+919906039157"
            className="text-accent-400 hover:text-accent-300 transition-colors underline"
          >
            +91 99060 39157
          </a>
          .
        </p>
      </section>
    </div>
  );
}
