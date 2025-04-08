"use client";

const animation_one = "animate-in fade-in duration-700 ease-in";

import { Barlow } from "@/fonts/Barlow";

export default function Page() {
  return (
    <div className={`bg-black mt-24 mb-10  mx-auto ${Barlow.className}`}>
      <section className={`flex flex-row mx-auto container ${animation_one}`}>
        <div className="bg-gradient-to-r from-[#efe9df] to-white w-60 hidden sm:block sm:rounded-l-lg"></div>

        <div className="bg-white w-full  pt-4 rounded md:rounded-r-lg  text-black !important">
          {/* Affiliate Disclosure */}
          <p className="px-2 mx-2 my-2 pt-3 text-lg">
            <strong>Affiliate Disclosure</strong>
          </p>

          {/* Affiliate Relationships */}
          <p className="px-2 mx-2 my-2 pt-2 text-xs">
            <strong>Affiliate Relationships</strong>
          </p>

          <p className="px-2 mx-2 my-2 text-xs">
            The Pod Transcripts (hereafter referred to as “we,” “us,” or “our”)
            is a participant in affiliate marketing programs, which means we may
            earn commissions from qualifying purchases made through our
            affiliate links. These programs are designed to provide a means for
            websites like ours to earn advertising fees by linking to products
            or services offered by third-party companies.
          </p>

          {/* Transparency and Integrity */}
          <p className="px-2 mx-2 my-2 pt-2 text-xs">
            <strong>Transparency and Integrity</strong>
          </p>

          <p className="px-2 mx-2 my-2 text-xs">
            We believe in transparency and honesty when it comes to our
            affiliate relationships. Rest assured that our reviews,
            recommendations, and opinions are always based on our own
            experiences, research, and knowledge of the products or services we
            endorse. Our primary goal is to provide valuable information and
            resources to our readers.
          </p>

          {/* Affiliate Links */}
          <p className="px-2 mx-2 my-2 pt-2 text-xs">
            <strong>Affiliate Links</strong>
          </p>

          <p className="px-2 mx-2 my-2 text-xs">
            When you click on an affiliate link on The Pod Transcripts and make
            a purchase, we may earn a commission from the sale. This commission
            comes at no additional cost to you and helps support our website,
            allowing us to continue providing high-quality content and
            resources.
          </p>

          <p className="px-2 mx-2 my-2 text-xs">
            Please note that not all links on our website are affiliate links.
            We may also include non-affiliate links to products or services that
            we believe are valuable to our readers, regardless of any potential
            compensation.
          </p>

          {/* Amazon Associates Program */}
          <p className="px-2 mx-2 my-2 pt-2 text-xs">
            <strong>Amazon Associates Program</strong>
          </p>

          <p className="px-2 mx-2 my-2 text-xs">
            The Pod Transcripts is a participant in the Amazon Services LLC
            Associates Program, an affiliate advertising program designed to
            provide a means for us to earn fees by linking to Amazon.com and
            affiliated sites.
          </p>

          {/* Earnings Disclosure */}
          <p className="px-2 mx-2 my-2 pt-2 text-xs">
            <strong>Earnings Disclosure</strong>
          </p>

          <p className="px-2 mx-2 my-2 text-xs">
            While we may earn commissions through affiliate links, it is
            important to understand that these earnings do not influence the
            content, reviews, or recommendations we provide. We maintain our
            commitment to providing unbiased, accurate, and helpful information
            to our readers.
          </p>

          {/* Your Support */}
          <p className="px-2 mx-2 my-2 pt-2 text-xs">
            <strong>Your Support</strong>
          </p>

          <p className="px-2 mx-2 my-2 text-xs">
            By using our affiliate links to make purchases, you are supporting
            The Pod Transcripts and helping us continue to deliver valuable
            content to our audience. We sincerely appreciate your support, and
            it is our commitment to always prioritize the interests of our
            readers.
          </p>

          {/* Contact Us */}
          <p className="px-2 mx-2 my-2 pt-3 text-s">
            <strong>Contact Us</strong>
          </p>

          <p className="px-2 mx-2 my-2 pb-5 text-xs">
            If you have any questions about the Affiliate Disclosure, do not
            hesitate to{" "}
            <a href="mailto: tomonari.feehan@protonmail.com">
              <strong className="text-teal-500"> contact us</strong>
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
