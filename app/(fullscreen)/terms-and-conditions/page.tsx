import Link from "next/link";
import React from "react";

export default function TermsAgreement() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-8" style={{ color: "#ff8f18" }}>
            Terms of Service
          </h1>

          {/* 1. Prototype Disclaimer */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Prototype Notice</h2>
            <p className="text-gray-800">
              <span style={{ color: "#ff8f18", fontWeight: "bold" }}>
                This application is a prototype.
              </span>{" "}
              It is not a real service, not connected to any real courts or
              event organizers. All features, data, and interactions inside this
              application are strictly for portfolio and demonstration purposes
              only.
            </p>
            <p className="text-gray-800 mt-3">
              Throughout this application, we repeatedly emphasize that{" "}
              <span style={{ color: "#ff8f18", fontWeight: "bold" }}>
                this is NOT a real booking system
              </span>{" "}
              and does not represent any official partnership or collaboration.
            </p>
          </section>

          {/* 2. Booking & Event Disclaimer */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              2. Booking & Event Disclaimer
            </h2>
            <p className="text-gray-800">
              All courts and events displayed inside the application are
              fictional. They are not affiliated with any real-world venues,
              brands, or organizers. Any resemblance to real entities is purely
              coincidental.
            </p>
            <p className="text-gray-800 mt-3">
              The booking flow exists only as a simulation to showcase UI/UX and
              system behavior.
            </p>
          </section>

          {/* 3. Payment Gateway Notice */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              3. Payment Gateway Simulation
            </h2>
            <p className="text-gray-800">
              This application includes a simulated payment flow using a mock
              version of Midtrans.{" "}
              <span className="text-primary font-bold">
                No real payment is processed
              </span>
              , and users must not input real financial information.
            </p>
            <p className="text-gray-800 mt-3">
              All payment screens exist solely for demonstration. Any
              transaction displayed has no monetary value.
            </p>
            <p className="text-gray-800 mt-3">
              If you want to test the payment feature, please use the{" "}
              <Link
                className="text-primary font-bold underline"
                href="https://simulator.sandbox.midtrans.com/"
                target="_blank"
              >
                Midtrans Payment Simulator
              </Link>
              .
            </p>
          </section>

          {/* 4. User Data Privacy */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. User Data Privacy</h2>
            <p className="text-gray-800">
              The application may collect basic input data for demonstration
              purposes only. This data is{" "}
              <span style={{ color: "#ff8f18", fontWeight: "bold" }}>
                not stored, sold, shared, or used commercially
              </span>
              .
            </p>
            <p className="text-gray-800 mt-3">
              Users are advised not to submit any sensitive personal
              information.
            </p>
          </section>

          {/* 5. Limitations */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Limitations</h2>
            <ul className="list-disc ml-6 text-gray-800 space-y-2">
              <li>
                This prototype may contain incomplete features or inaccuracies.
              </li>
              <li>
                The developer is not responsible for any misunderstanding caused
                by this demonstration.
              </li>
              <li>
                No guarantee of uptime, accuracy, or performance is provided.
              </li>
            </ul>
          </section>

          {/* 6. Prototype Purpose */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Intended Use</h2>
            <p className="text-gray-800">
              This prototype exists to demonstrate interface design, interaction
              flow, and system architecture for a booking application concept.
              It should not be used in a real operational environment.
            </p>
          </section>

          {/* 7. Revisions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Revisions</h2>
            <p className="text-gray-800">
              The terms may be updated or adjusted as the prototype evolves. By
              using this demo, you acknowledge that changes may occur without
              notice.
            </p>
          </section>

          {/* 8. Contact */}
          <section>
            <h2 className="text-xl font-semibold mb-4">8. Contact</h2>
            <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
              <p className="text-gray-800">
                For questions regarding this prototype, contact:
              </p>
              <Link
                href="https://www.linkedin.com/in/riecky-poerwadiredja/"
                className="inline-flex items-center hover:opacity-80 underline"
                style={{ color: "#ff8f18", fontWeight: "bold" }}
              >
                Riecky Poerwadiredja
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
