export interface Community {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  zipCode: string;
  imageUrl: string;
  lifestyleImages: { title: string; src: string }[];
  keyServices: string;
  petFriendly: boolean;
  hasSpecialCare: boolean;
  availableSizes: string[];
  hobbies: string[];
}

export const communities: Community[] = [
    // Community 1
    {
      id: 1,
      name: 'Abbey Delray South',
      address: '17795 Drive, Delray Beach, FL 33446',
      phoneNumber: '(561) 123-4567',
      zipCode: '33446',
      imageUrl: '/images/communities/abbey-delray.jpg',
      lifestyleImages: [
        { title: 'NUTRITIOUS DINING', src: '/images/lifestyle/dining-1.jpg' },
        { title: 'FITNESS & WELLNESS', src: '/images/lifestyle/fitness-1.jpg' },
        { title: 'LIFELONG LEARNING', src: '/images/lifestyle/learning-1.jpg' },
      ],
      keyServices: "From assisted living to skilled nursing and memory care, we provide a continuum of care tailored to your needs.",
      petFriendly: true,
      hasSpecialCare: true,
      availableSizes: ['1br', '2br'],
      hobbies: ['Sports & Fitness', 'Creative & Performing Arts'],
    },
    // Community 2
    {
      id: 2,
      name: 'The Waterford',
      address: '601 Universe BoulevardJuno Beach, FL 33408',
      phoneNumber: '(561) 234-5678',
      zipCode: '33408',
      imageUrl: '/images/communities/beacon-hill.jpg',
      lifestyleImages: [
        { title: 'EXQUISITE CUISINE', src: '/images/lifestyle/dining-2.jpg' },
        { title: 'AQUATICS CENTER', src: '/images/lifestyle/aquatics.jpg' },
        { title: 'COMMUNITY GARDENS', src: '/images/lifestyle/gardening.jpg' },
      ],
      keyServices: "Offering independent living, assisted living, and memory care with a focus on vibrant, active lifestyles.",
      petFriendly: true,
      hasSpecialCare: true,
      availableSizes: ['1br', '2br', '3br'],
      hobbies: ['Sports & Fitness', 'Nature & Outdoors'],
    },
    // Community 3
    {
      id: 3,
      name: 'Village on the Green',
      address: '500 Village PlaceLongwood, FL 32779',
      phoneNumber: '(407) 345-6789',
      zipCode: '32779',
      imageUrl: '/images/communities/claridge-court.jpg',
      lifestyleImages: [
        { title: 'URBAN LIVING', src: '/images/lifestyle/urban.jpg' },
        { title: 'FINE ARTS', src: '/images/lifestyle/arts.jpg' },
        { title: 'SOCIAL EVENTS', src: '/images/lifestyle/social.jpg' },
      ],
      keyServices: "A premier retirement community offering a luxurious lifestyle with access to comprehensive health services.",
      petFriendly: false,
      hasSpecialCare: true,
      availableSizes: ['studio', '1br'],
      hobbies: ['Art Classes', 'Social Events', 'Lifelong Learning'],
    },
    // Community 4
    {
      id: 4,
      name: "Harbour's Edge",
      address: '401 East Linton Boulevard, Delray Beach, FL 33483',
      phoneNumber: '(561) 456-7890',
      zipCode: '33483',
      imageUrl: '/images/communities/friendship-village.jpg',
      lifestyleImages: [
        { title: 'MULTIPLE RESTAURANTS', src: '/images/lifestyle/dining-3.jpg' },
        { title: 'WOODWORKING SHOP', src: '/images/lifestyle/woodworking.jpg' },
        { title: 'VOLUNTEER GROUPS', src: '/images/lifestyle/volunteer.jpg' },
      ],
      keyServices: "A large, dynamic community with extensive amenities and a full range of care, from independent living to skilled nursing.",
      petFriendly: true,
      hasSpecialCare: true,
      availableSizes: ['1br', '2br', 'villa'],
      hobbies: ['Woodworking', 'Volunteering', 'Fitness Center'],
    },
    // Community 5
    {
      id: 5,
      name: 'Beacon Hill',
      address: '2400 S. Finley Road, Lombard, IL 60148',
      phoneNumber: '(630) 567-8901',
      zipCode: '60148',
      imageUrl: '/images/communities/the-waterford.jpg',
      lifestyleImages: [
        { title: 'COASTAL LIVING', src: '/images/lifestyle/coastal.jpg' },
        { title: 'FRESH SEAFOOD', src: '/images/lifestyle/seafood.jpg' },
        { title: 'OUTDOOR ACTIVITIES', src: '/images/lifestyle/outdoor.jpg' },
      ],
      keyServices: "Enjoy a relaxed, coastal lifestyle with the security of on-site health services and supportive living options.",
      petFriendly: true,
      hasSpecialCare: false,
      availableSizes: ['studio', '1br', '2br'],
      hobbies: ['Outdoor Activities', 'Swimming', 'Social Events'],
    },
    // Community 6
    {
      id: 6,
      name: 'Oak Trace',
      address: '270 Village Drive, Downers Grove, IL 60516',
      phoneNumber: '(630) 678-9012',
      zipCode: '60516',
      imageUrl: '/images/communities/oak-trace.jpg',
      lifestyleImages: [
        { title: 'MODERN APARTMENTS', src: '/images/lifestyle/modern-apt.jpg' },
        { title: 'PERFORMING ARTS', src: '/images/lifestyle/performing-arts.jpg' },
        { title: 'NATURE TRAILS', src: '/images/lifestyle/trails.jpg' },
      ],
      keyServices: "A newly renovated community offering state-of-the-art amenities and a full continuum of care in a beautiful setting.",
      petFriendly: false,
      hasSpecialCare: true,
      availableSizes: ['1br', '2br'],
      hobbies: ['Performing Arts', 'Outdoor Activities', 'Lifelong Learning'],
    },
  ];