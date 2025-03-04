import React from 'react';

interface Community {
  name: string;
  description: string;
  discordLink: string;
}

const communities: Community[] = [
  {
    name: 'Tamil Nadu DeC Community',
    description: 'A vibrant community of EV enthusiasts from Tamil Nadu, sharing experiences and promoting sustainable transportation.',
    discordLink: 'https://discord.gg/PHPECBkH'
  },
  {
    name: 'India Rapteez Rider Community',
    description: 'Connect with fellow EV riders across India, share your journeys, and discover new riding experiences.',
    discordLink: 'https://discord.gg/PHPECBkH'
  },
  {
    name: 'Mountain EV Community',
    description: 'For adventure seekers exploring mountain trails with their EVs, sharing tips and organizing group rides.',
    discordLink: 'https://discord.gg/PHPECBkH'
  },
  {
    name: 'City EV Community',
    description: 'Urban EV users sharing insights on city navigation, charging spots, and sustainable urban mobility.',
    discordLink: 'https://discord.gg/PHPECBkH'
  },
  {
    name: 'EV Enthusiasts Hub',
    description: 'A diverse community of EV enthusiasts discussing latest trends, technology, and innovations in electric mobility.',
    discordLink: 'https://discord.gg/PHPECBkH'
  }
];

const Communities: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Explore Communities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">{community.name}</h3>
            <p className="text-gray-600 mb-4">{community.description}</p>
            <a
              href={community.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Join Community
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communities;