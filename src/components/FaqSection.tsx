import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can AI automation help my business?",
      answer: "AI automation streamlines repetitive tasks, reduces human error, and allows your team to focus on high-value activities. It can improve efficiency by up to 40%, reduce operational costs, and provide 24/7 availability for customer service and data processing."
    },
    {
      question: "Is AI automation difficult to integrate?",
      answer: "Not at all! Our AI automation solutions are designed for seamless integration with your existing systems. We provide step-by-step guidance, dedicated support, and custom implementation plans tailored to your business needs. Most clients see results within the first week."
    },
    {
      question: "What industries can benefit from AI automation?",
      answer: "AI automation benefits virtually every industry including healthcare, finance, retail, manufacturing, real estate, marketing, customer service, and more. Whether you're in B2B or B2C, AI can optimize your workflows, improve customer experience, and drive growth."
    },
    {
      question: "Do I need technical knowledge to use AI automation?",
      answer: "No technical expertise required! Our AI automation tools are designed with user-friendly interfaces that anyone can use. We provide comprehensive training, documentation, and ongoing support to ensure you get the most out of your AI investment."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer comprehensive support including 24/7 customer service, dedicated account managers, technical support, training resources, and regular check-ins to ensure optimal performance. Our team is always ready to help you maximize your AI automation results."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-gray-300 px-4 py-2 rounded-full text-sm mb-6 border border-white-1px">
            FAQs
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            We've Got the Answers<br />
            You're Looking For
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Quick answers to your AI automation questions.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-black border border-gray-900 rounded-lg overflow-hidden hover:border-gray-800 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              >
                <h3 className="text-base font-semibold text-white pr-3">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 pb-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;