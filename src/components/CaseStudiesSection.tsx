import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { type CarouselApi } from './ui/carousel';
import { useEffect } from 'react';
import caseStudyImage from '../assets/case-study-suitcase.jpg';

interface CaseStudy {
  id: string;
  company: string;
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
    company: 'Logoipsum',
    quote: 'AI-driven forecasting cut inventory waste by 40% for TrailForge',
    description: 'TrailForge, a suitcase brand, faced stock issues and inefficiencies. Our AI forecasting optimized inventory and production cycles, helping them save costs and deliver faster.',
    image: caseStudyImage,
    impact: [
      { metric: '40% Less Inventory Waste', value: '' },
      { metric: '35% Faster Production', value: '' },
      { metric: '20% More Accurate Forecasting', value: '' },
      { metric: '25% Faster Fulfillment', value: '' }
    ]
  },
  {
    id: '2',
    company: 'TechFlow',
    quote: 'Smart automation increased customer satisfaction by 60%',
    description: 'TechFlow struggled with manual customer support processes. Our AI automation solution streamlined their workflow, reduced response times, and improved customer experience significantly.',
    image: caseStudyImage,
    impact: [
      { metric: '60% Higher Customer Satisfaction', value: '' },
      { metric: '50% Faster Response Times', value: '' },
      { metric: '30% Reduced Support Costs', value: '' },
      { metric: '45% More Efficient Workflow', value: '' }
    ]
  },
  {
    id: '3',
    company: 'DataVision',
    quote: 'AI analytics boosted revenue by 35% in 6 months',
    description: 'DataVision needed better insights from their data. Our AI analytics platform provided actionable intelligence that drove strategic decisions and significant revenue growth.',
    image: caseStudyImage,
    impact: [
      { metric: '35% Revenue Increase', value: '' },
      { metric: '80% Better Data Accuracy', value: '' },
      { metric: '65% Faster Decision Making', value: '' },
      { metric: '40% Improved ROI', value: '' }
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
          <div className="inline-block px-4 py-2 rounded-full bg-black border border-white-1px text-white/70 text-sm font-medium mb-6">
            Case Studies
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            See How Smart AI Automation
            <br />
            Transforms Businesses
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            See how AI automation streamlines operations, boosts and drives growth.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {caseStudies.map((study) => (
                <CarouselItem key={study.id} className="pl-6">
                  <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[320px] px-8">
                    
                    {/* Left container → push right */}
                    <div className="flex justify-end">
                      {/* Image Section */}
                      <div className="relative max-w-sm">
                        <div className="relative z-10">
                          <img
                            src={study.image}
                            alt="Case study product"
                            className="w-full h-auto object-cover rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  
                    {/* Right container → push left */}
                    <div className="flex justify-start">
                      {/* Content Section */}
                      <div className="space-y-6 max-w-md">
                        {/* Company Logo/Name */}
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              {study.company.charAt(0)}
                            </span>
                          </div>
                          <span className="text-white font-semibold text-lg">
                            {study.company}
                          </span>
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
                          <h4 className="text-white font-semibold text-base">Impact :</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {study.impact.map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
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
            <span className="text-white/70 text-xs font-small tracking-wider uppercase">
              {`← Drag to Explore →`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;