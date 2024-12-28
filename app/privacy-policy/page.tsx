import React from "react";

const Page = () => {
  return (
    <div className="h-screen my-6 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg my-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
        <p className="mt-4 text-lg text-gray-700">
          Last updated: January 1, 2024
        </p>

        <div className="mt-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p>
              Welcome to Our Movie Booking App. This Privacy Policy explains
              how we collect, use, and protect your personal data when you
              access our services. By using our app, you agree to the terms and
              conditions outlined in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Information We Collect</h2>
            <p>
              We may collect the following types of personal information:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Account information (name, email, etc.)</li>
              <li>Usage data (app interactions, page views, etc.)</li>
              <li>Payment information (if applicable)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">How We Use Your Data</h2>
            <p>
              We use the collected data for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>To provide and personalize our services</li>
              <li>To improve user experience and app performance</li>
              <li>To process payments and bookings</li>
              <li>To communicate with you about updates and promotions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Data Protection</h2>
            <p>
              We take your privacy seriously and implement security measures to
              protect your personal data. However, please note that no method of
              data transmission over the internet is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Third-Party Services</h2>
            <p>
              We may share your data with third-party service providers to
              facilitate certain operations, such as payment processing. These
              third parties are obligated to keep your information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request corrections to any inaccurate data</li>
              <li>Request the deletion of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of any significant changes through the app or via email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p>
              <strong>Email:</strong> support@moviebookingapp.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
