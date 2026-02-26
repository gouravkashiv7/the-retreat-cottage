export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for The Retreat Cottage — a luxury homestay near Dharampur, Himachal Pradesh.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 text-primary-200 text-base leading-relaxed">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-medium text-accent-400 mb-4">
          Privacy Policy
        </h1>
        <p className="text-primary-300 text-sm">Last updated: February 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">1. Introduction</h2>
        <p>
          The Retreat Cottage (&quot;we,&quot; &quot;our,&quot; or
          &quot;us&quot;) is committed to protecting the privacy of our guests
          and website visitors. This Privacy Policy explains how we collect,
          use, and safeguard your personal information in accordance with the
          Information Technology Act, 2000 and the Information Technology
          (Reasonable Security Practices and Procedures and Sensitive Personal
          Data or Information) Rules, 2011.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">
          2. Information We Collect
        </h2>
        <p>We may collect the following information:</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and government-issued ID details for check-in.
          </li>
          <li>
            <strong>Booking Details:</strong> Dates of stay, number of guests,
            room preferences, and special requests.
          </li>
          <li>
            <strong>Payment Information:</strong> Transaction details processed
            through our secure payment partners.
          </li>
          <li>
            <strong>Usage Data:</strong> Browser type, IP address, pages
            visited, and time spent on our website (collected via cookies).
          </li>
          <li>
            <strong>Authentication Data:</strong> If you sign in using Google,
            we receive your name, email, and profile picture from your Google
            account.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>To process and confirm your bookings and reservations.</li>
          <li>
            To communicate booking confirmations, updates, and promotions.
          </li>
          <li>To improve our website experience and services.</li>
          <li>To comply with legal obligations under Indian law.</li>
          <li>To ensure the safety and security of our guests and property.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">
          4. Data Sharing &amp; Disclosure
        </h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share your data with:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>
            <strong>Service Providers:</strong> Payment processors, cloud
            hosting (Supabase, Vercel), and authentication services (Google
            OAuth) that assist in delivering our services.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required by law or to
            protect our rights and safety.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">5. Cookies</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. Cookies
          help us understand how you interact with our site and remember your
          preferences. You can disable cookies in your browser settings, but
          this may affect your experience.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">6. Data Security</h2>
        <p>
          We implement reasonable security practices and procedures as mandated
          by Indian IT laws. Your data is stored securely using encrypted
          databases and access is restricted to authorised personnel only.
          However, no method of electronic storage is 100% secure.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>
            Request deletion of your data (subject to legal retention
            requirements).
          </li>
          <li>Withdraw consent for marketing communications.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">
          8. Third-Party Links
        </h2>
        <p>
          Our website may contain links to external sites (Google Maps,
          Instagram, etc.). We are not responsible for the privacy policies or
          content of these external sites.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-white font-medium">9. Contact Us</h2>
        <p>
          For any questions or concerns regarding this Privacy Policy, please
          reach out to us at{" "}
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
