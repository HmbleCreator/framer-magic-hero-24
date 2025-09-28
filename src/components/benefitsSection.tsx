import React from 'react';
import { Zap, Users, Clock, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';
import { useHeadingReveal } from '@/hooks/use-heading-reveal';

const BenefitsSection = () => {
  const benefitsHeading = useHeadingReveal({ direction: 'fade-up', delay: 200 });
  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "Increased Productivity",
      description: "Gain actionable insights with AI-driven analytics to improve decision-making and strategy."
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Better Customer Experience",
      description: "Personalized AI interactions improve response times, customer engagement, and overall satisfaction."
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "24/7 Availability",
      description: "AI-powered systems operate around the clock, ensuring seamless support and execution without downtime."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-white" />,
      title: "Cost Reduction",
      description: "AI automation minimizes manual work, cuts operational costs, and optimizes resource allocation for better profitability."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: "Data-Driven Insights",
      description: "Leverage AI to analyze vast data sets, identify trends, and make smarter, faster, and more accurate business decisions."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "Scalability & Growth",
      description: "AI adapts to your business needs, allowing you to scale efficiently without increasing workload or costs."
    }
  ];

  return (
  <section id="benefits" className="bg-black text-white py-16 px-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-black text-gray-300 px-3 py-1 rounded-full text-sm mb-4 border border-white-1px">
            Benefits
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            The Key Benefits of AI<br />
            for Your Business Growth
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Discover how AI automation enhances efficiency, reduces costs, and drives
            business growth with smarter, faster processes.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-black border border-gray-800/50 rounded-xl p-6 hover:bg-gray-900/50 transition-colors duration-300"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;