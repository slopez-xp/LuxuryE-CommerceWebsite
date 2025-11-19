import { ImageWithFallback } from './figma/ImageWithFallback';

interface Milestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

export function HeritagePage() {
  const milestones: Milestone[] = [
    {
      year: '1905',
      title: 'Foundation',
      description: 'Hans Wilsdorf and Alfred Davis establish Wilsdorf & Davis in London, the company that would become Rolex.',
      image: 'https://images.unsplash.com/photo-1762592033298-d866290f1508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcm9sZXglMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjM1NTcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      year: '1926',
      title: 'The Oyster',
      description: "The world's first waterproof wristwatch. A revolutionary invention that would become the foundation of all Rolex watches.",
      image: 'https://images.unsplash.com/photo-1706801803974-fc52c9aaac6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMG95c3RlciUyMHBlcnBldHVhbHxlbnwxfHx8fDE3NjM1NTcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      year: '1953',
      title: 'Conquest of Everest',
      description: 'Sir Edmund Hillary and Tenzing Norgay reach the summit of Mount Everest wearing Rolex Oyster Perpetual watches.',
      image: 'https://images.unsplash.com/photo-1730757679771-b53e798846cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMHN1Ym1hcmluZXIlMjBjbG9zZXxlbnwxfHx8fDE3NjM1NTcxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      year: '1963',
      title: 'Cosmograph Daytona',
      description: 'Rolex introduces the Cosmograph Daytona, designed specifically for professional racing drivers.',
      image: 'https://images.unsplash.com/photo-1628498643679-fa021dabb3f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMGRheXRvbmElMjBnb2xkfGVufDF8fHx8MTc2MzU1NTAwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      year: '1970',
      title: 'Datejust Excellence',
      description: 'The Datejust becomes the quintessential watch of reference, embodying the perfect balance of form and function.',
      image: 'https://images.unsplash.com/photo-1649357584808-333476473dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xleCUyMGRhdGVqdXN0JTIwc3RlZWx8ZW58MXx8fHwxNzYzNTU3MTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      year: '2000',
      title: 'Parachrom Hairspring',
      description: 'Rolex develops and patents the blue Parachrom hairspring, offering greater resistance to shocks and temperature variations.',
      image: 'https://images.unsplash.com/photo-1763226015334-9a2d3fb11ea5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMG1vdmVtZW50fGVufDF8fHx8MTc2MzU1NzE0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-8">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto mb-24 text-center">
        <div
          className="mb-6 text-[#a37e2c] tracking-[0.3em]"
          style={{
            fontFamily: '-apple-system, Helvetica Neue, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          SINCE 1905
        </div>
        <h1
          className="mb-8 text-white"
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '4rem',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          A Legacy of
          <br />
          Excellence
        </h1>
        <p
          className="max-w-[800px] mx-auto text-[#cccccc]"
          style={{
            fontFamily: '-apple-system, Helvetica Neue, sans-serif',
            fontSize: '1.125rem',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
          }}
        >
          For over a century, Rolex has been synonymous with innovation, precision, and the relentless pursuit of perfection. Discover the milestones that shaped horological history.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-[1400px] mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#a37e2c] to-transparent hidden lg:block" />

        {/* Milestones */}
        <div className="space-y-32">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div
                className={`${
                  index % 2 === 0 ? 'lg:text-right lg:pr-20' : 'lg:pl-20 lg:col-start-2'
                }`}
              >
                <div
                  className="inline-block mb-4 px-6 py-2 border border-[#a37e2c] rounded-full"
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '1.5rem',
                    color: '#a37e2c',
                    fontWeight: 400,
                  }}
                >
                  {milestone.year}
                </div>
                <h3
                  className="mb-4 text-white"
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '2.25rem',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {milestone.title}
                </h3>
                <p
                  className="text-[#cccccc]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    letterSpacing: '0.01em',
                  }}
                >
                  {milestone.description}
                </p>
              </div>

              {/* Image */}
              <div
                className={`relative ${
                  index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#a37e2c]/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#a37e2c]/10 to-transparent z-10" />
                  <ImageWithFallback
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Decorative corner */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#a37e2c]/30" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#a37e2c]/30" />
              </div>

              {/* Timeline Dot */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-[#a37e2c] rounded-full border-4 border-black shadow-lg shadow-[#a37e2c]/50" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <div className="max-w-[1000px] mx-auto mt-48 text-center">
        <div className="relative py-20">
          {/* Quote Marks */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 text-[#a37e2c]/20"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '8rem',
              lineHeight: 0.5,
            }}
          >
            "
          </div>

          <p
            className="relative z-10 text-white mb-8"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '2rem',
              fontWeight: 400,
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            A Rolex is not just a watch. It is a symbol of excellence, a testament to human achievement, and a companion for life's greatest moments.
          </p>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#a37e2c] to-transparent mx-auto mb-6" />

          <div
            className="text-[#a37e2c] tracking-[0.2em]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            HANS WILSDORF, FOUNDER
          </div>
        </div>
      </div>
    </div>
  );
}
