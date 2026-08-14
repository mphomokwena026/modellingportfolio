import { DestinationCard } from '@/components/ui/card-21';
import featured1 from '../assets/featured-1.jpg';
import featured2 from '../assets/featured-2.jpg';
import featured3 from '../assets/featured-3.jpg';
import featured4 from '../assets/featured-4.jpg';

export default function FeaturedShoots() {
  const shoots = [
    {
      title: 'Street Editorial',
      subtitle: 'Outdoor & Urban',
      imageUrl: featured1,
      stats: 'Urban Fashion • Natural Light',
      themeColor: '210 70% 35%',
      href: '#gallery',
    },
    {
      title: 'Studio Portraits',
      subtitle: 'Beauty & Headshots',
      imageUrl: featured2,
      stats: 'Commercial • High Fashion',
      themeColor: '340 65% 40%',
      href: '#gallery',
    },
    {
      title: 'Campaign Concepts',
      subtitle: 'Brand & Storytelling',
      imageUrl: featured3,
      stats: 'Brand Campaigns • Creative',
      themeColor: '45 80% 40%',
      href: '#gallery',
    },
    {
      title: 'Runway & Lookbook',
      subtitle: 'Shows & Collections',
      imageUrl: featured4,
      stats: 'Designer Collections • Runway',
      themeColor: '270 60% 35%',
      href: '#gallery',
    },
  ];

  return (
    <section id="featured">
      <div className="section-inner">
        <div className="feature-header">
          <div>
            <p className="eyebrow reveal">Selected work</p>
            <h2 className="section-title reveal">
              Featured <em>shoots</em>
            </h2>
          </div>

          <p className="feature-intro reveal">
            HOVER OR SELECT CARDS TO REVEAL DETAILS
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {shoots.map((s, i) => (
            <div key={i} className="w-full h-[450px] reveal">
              <DestinationCard
                imageUrl={s.imageUrl}
                location={s.title}
                stats={s.stats}
                href={s.href}
                themeColor={s.themeColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
