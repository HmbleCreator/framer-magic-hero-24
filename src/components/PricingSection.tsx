import React, { useState } from 'react';
import { Check, Rocket, Zap, Crown } from 'lucide-react';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const pricingHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });

  const pricingPlans = [
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      name: "Starter",
      price: isAnnual ? 37 : 45,
      description: "Perfect for small businesses starting with AI automation.",
      buttonText: "Choose this plan",
      buttonStyle: "bg-gray-700 hover:bg-gray-600 text-white",
      features: [
        "Basic workflow automation",
        "AI-powered personal assistant",
        "Standard analytics & reporting",
        "Email & chat support",
        "Up to 3 AI integrations"
      ],
      isPopular: false
    },
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      name: "Professional",
      price: isAnnual ? 75 : 90,
      description: "Perfect for small businesses starting with AI automation.",
      buttonText: "Choose this plan",
      buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
      features: [
        "Advanced workflow automation",
        "AI-driven sales & marketing tools",
        "Enhanced data analytics & insights",
        "Priority customer support",
        "Up to 10 AI integrations"
      ],
      isPopular: true
    },
    {
      icon: <Crown className="w-6 h-6 text-white" />,
      name: "Enterprise",
      price: "Custom",
      description: "Perfect for small businesses starting with AI automation.",
      buttonText: "Schedule a call",
      buttonStyle: "bg-gray-700 hover:bg-gray-600 text-white",
      features: [
        "Fully customizable AI automation",
        "Dedicated AI business consultant",
        "Enterprise-grade compliance",
        "24/7 VIP support",
        "Unlimited AI integrations"
      ],
      isPopular: false
    }
  ];

  return (
  <section id="pricing" className="bg-black text-white py-20 px-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-black text-gray-300 px-4 py-2 rounded-full text-sm mb-6 border border-white-1px">
            Pricing
          </div>
          <h2 ref={pricingHeading.ref as React.RefObject<HTMLHeadingElement>} className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${pricingHeading.animationClasses}`}>
            The Best AI Automation,<br />
            at the Right Price
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Choose a plan that fits your business needs and start automating with AI
          </p>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                isAnnual ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  isAnnual ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annually
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-black border rounded-xl p-5 ${
                plan.isPopular 
                  ? 'border-purple-500 bg-gradient-to-b from-purple-900/20 to-black' 
                  : 'border-gray-800'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-center gap-3 mb-3">
                {plan.icon}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
              </div>

              {/* Price */}
              <div className="mb-3">
                {typeof plan.price === 'number' ? (
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-400 ml-1 text-sm">/month</span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold">{plan.price}</div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-5 text-sm">
                {plan.description}
              </p>

              {/* CTA Button */}
              <button className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 mb-5 ${plan.buttonStyle} group relative overflow-hidden`} style={{height: '48px'}}>
                <span className="block transition-transform duration-500 group-hover:-translate-y-full group-hover:opacity-0">
                  {plan.buttonText}
                </span>
                <span className="block absolute left-0 right-0 top-full transition-transform duration-500 translate-y-0 group-hover:translate-y-[-150%] group-hover:opacity-100 opacity-0">
                  {plan.buttonText}
                </span>
              </button>

              {/* Features */}
              <div>
                <h4 className="text-base font-semibold mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;