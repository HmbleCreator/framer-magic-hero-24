import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  quote: string;
  description: string;
  image: string;
  impact: {
    metric: string;
    value: string;
  }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    company: 'UrbanNest Realty',
    industry: 'Real Estate',
    quote: 'AI automation reduced property listing time by 65% and boosted lead conversion',
    description: 'UrbanNest Realty was drowning in manual property listings and lead follow-ups. Our AI system automated listing creation, optimized pricing strategies, and implemented smart lead nurturing that transformed their sales pipeline.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    impact: [
      { metric: '65% Faster Listing Process', value: '' },
      { metric: '48% More Lead Conversions', value: '' },
      { metric: '55% Reduction in Manual Work', value: '' },
      { metric: '40% Higher Client Satisfaction', value: '' }
    ]
  },
  {
    id: '2',
    company: 'FreshHarvest Grocers',
    industry: 'Retail & E-commerce',
    quote: 'Smart inventory AI cut food waste by 52% and increased profit margins',
    description: 'FreshHarvest struggled with perishable inventory management and overstocking. Our AI-powered demand forecasting and automated reordering system revolutionized their supply chain, drastically reducing waste while ensuring fresh products.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    impact: [
      { metric: '52% Less Food Waste', value: '' },
      { metric: '38% Better Stock Accuracy', value: '' },
      { metric: '45% Improved Margins', value: '' },
      { metric: '60% Faster Restocking', value: '' }
    ]
  },
  {
    id: '3',
    company: 'MediCare Plus',
    industry: 'Healthcare',
    quote: 'AI scheduling eliminated patient wait times and boosted appointment efficiency by 70%',
    description: 'MediCare Plus faced chaotic appointment scheduling and long patient wait times. Our intelligent scheduling system with automated reminders and smart resource allocation transformed their patient experience and operational efficiency.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    impact: [
      { metric: '70% More Efficient Scheduling', value: '' },
      { metric: '85% Reduction in No-Shows', value: '' },
      { metric: '50% Less Wait Time', value: '' },
      { metric: '62% Higher Patient Satisfaction', value: '' }
    ]
  },
  {
    id: '4',
    company: 'TechForge Solutions',
    industry: 'Software Development',
    quote: 'AI-powered code review reduced bugs by 58% and accelerated deployment cycles',
    description: 'TechForge was struggling with inconsistent code quality and slow review processes. Our AI code analysis and automated testing framework enhanced code quality, caught bugs early, and sped up their entire development lifecycle.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    impact: [
      { metric: '58% Fewer Production Bugs', value: '' },
      { metric: '45% Faster Code Reviews', value: '' },
      { metric: '72% Quicker Deployments', value: '' },
      { metric: '35% Higher Developer Productivity', value: '' }
    ]
  },
  {
    id: '5',
    company: 'Luxe Fashion Boutique',
    industry: 'Fashion & Retail',
    quote: 'AI trend analysis increased sales by 43% and reduced unsold inventory by half',
    description: 'Luxe Fashion was missing trends and stuck with unsold inventory. Our AI analyzed social media trends, customer preferences, and seasonal patterns to optimize their buying decisions and personalize marketing campaigns.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    impact: [
      { metric: '43% Sales Increase', value: '' },
      { metric: '50% Less Unsold Stock', value: '' },
      { metric: '68% Better Trend Prediction', value: '' },
      { metric: '55% Higher Marketing ROI', value: '' }
    ]
  }
];

const CaseStudiesSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section id="case-studies" className="py-24 bg-black from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-black border border-white/20 text-white/70 text-sm font-medium mb-6">
            Case Studies
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            See How Smart AI Automation
            <br />
            Transforms Businesses
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            See how AI automation streamlines operations, boosts efficiency and drives growth.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {caseStudies.map((study) => (
                <CarouselItem key={study.id} className="pl-6">
                  <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[320px] px-8 cursor-grab active:cursor-grabbing select-none">
                    
                    {/* Left container → push right */}
                    <div className="flex justify-end">
                      {/* Image Section */}
                      <div className="relative max-w-sm">
                        <div className="relative z-10">
                          <img
                            src={study.image}
                            alt={`${study.company} case study`}
                            className="w-full h-auto object-cover rounded-md pointer-events-none"
                            draggable="false"
                          />
                        </div>
                      </div>
                    </div>
                  
                    {/* Right container → push left */}
                    <div className="flex justify-start">
                      {/* Content Section */}
                      <div className="space-y-6 max-w-md">
                        {/* Company Logo/Name */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {study.company.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <span className="text-white font-semibold text-lg block">
                              {study.company}
                            </span>
                            <span className="text-white/50 text-xs">
                              {study.industry}
                            </span>
                          </div>
                        </div>

                        {/* Quote */}
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-snug">
                          "{study.quote}"
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm md:text-base leading-relaxed">
                          {study.description}
                        </p>

                        {/* Impact Metrics */}
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold text-base">Impact:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {study.impact.map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                                <span className="text-white/80 text-sm">
                                  {item.metric}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Drag Indicator */}
          <div className="flex items-center justify-center mt-12">
            <span className="text-white/70 text-xs font-medium tracking-wider uppercase">
              {`← Drag to Explore →`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;