import React from "react";
import { Minus, Plus } from "lucide-react";

const PetAdoptionFAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(0);

  const faqData = [
    {
      question: "What is the adoption process like?",
      answer:
        "Our adoption process involves several steps to ensure the best match between pets and families: 1) Browse available pets on our website 2) Submit an adoption application 3) Meet the pet in person 4) Home check if required 5) Pay adoption fee and complete paperwork. The entire process usually takes 3-7 days.",
    },
    {
      question: "What are the adoption fees?",
      answer:
        "Adoption fees vary depending on the type and age of the pet. All adopted pets come spayed/neutered, vaccinated, microchipped, and with a basic health check. These fees help cover the medical care they've received while in our care.",
    },
    {
      question: "Do you offer post-adoption support?",
      answer:
        "Yes! We provide comprehensive post-adoption support including: behavioral training resources, veterinary care recommendations, a 24/7 pet health helpline for the first month, and access to our pet parent community. We're committed to helping you and your new pet succeed together.",
    },
    {
      question: "What should I prepare before adopting?",
      answer:
        "Before bringing your new pet home, prepare: 1) Basic supplies (food, bowls, bed, collar/leash) 2) Pet-proofed living space 3) Vet appointment scheduled for initial check-up 4) Time off work for adjustment period 5) Training plan if needed. We provide a detailed new pet parent checklist upon application approval.",
    },
    {
      question: "Can I return an adopted pet if it doesn't work out?",
      answer:
        "While we hope every adoption is successful, we understand that sometimes things don't work out. We have a 30-day return policy and will always accept our pets back at any point in their lives. We ask that you contact us first so we can potentially help resolve any issues before returning.",
    },
    {
      question: "Do you offer foster-to-adopt programs?",
      answer:
        "Yes! Our foster-to-adopt program lets you take a pet home for 2 weeks before finalizing the adoption. This gives both you and the pet time to adjust and ensure it's a good match. The adoption fee is only charged if you decide to proceed with the permanent adoption.",
    },
  ];

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-gray-600">
          Everything you need to know about pet adoption and care
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 last:border-0">
            <button
              className="flex justify-between items-center w-full py-6 px-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-gray-800">
                {faq.question}
              </span>
              {openIndex === index ? (
                <Minus className="shrink-0 text-gray-600" size={20} />
              ) : (
                <Plus className="shrink-0 text-gray-600" size={20} />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 pb-6 px-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetAdoptionFAQ;
