export interface Pet {
    id: string;
    name: string;
    age: string;
    breed: string;
    distance: string;
    image: string;
    bio: string;
    tags: string[];
    owner: {
        name: string;
        image: string;
    };
}

export const MOCK_PETS: Pet[] = [
    {
        id: '1',
        name: 'Snowball',
        age: '2 years',
        breed: 'Turkish Angora',
        distance: '1.2 km',
        image: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?q=80&w=800&auto=format&fit=crop', // Happy white cat
        bio: 'Elegant, playful, and loves to pose for the camera. 📸 #TurkishAngora',
        tags: ['Friendly', 'Energetic', 'Playful'],
        owner: {
            name: 'Sarah',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '2',
        name: 'Milo',
        age: '8 months',
        breed: 'French Bulldog',
        distance: '3.5 km',
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000&auto=format&fit=crop',
        bio: 'Small potato with big dreams. I snore but I am cute. 🥔',
        tags: ['Chill', 'Foodie', 'Puppy'],
        owner: {
            name: 'Mike',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '3',
        name: 'Bella',
        age: '3 years',
        breed: 'Siamese',
        distance: '0.8 km',
        image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=1000&auto=format&fit=crop',
        bio: 'Queen of the house. Will judge you, but lovingly. 👑',
        tags: ['Sassy', 'Indoor', 'Vocal'],
        owner: {
            name: 'Elena',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '4',
        name: 'Cooper',
        age: '4 years',
        breed: 'Australian Shepherd',
        distance: '5.0 km',
        image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=1000&auto=format&fit=crop',
        bio: 'Agility champion in training. Need someone to keep up with me!',
        tags: ['Smart', 'Active', 'Agility'],
        owner: {
            name: 'David',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '5',
        name: 'Luna',
        age: '1 year',
        breed: 'Golden Retriever',
        distance: '2.1 km',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1000&auto=format&fit=crop',
        bio: 'Professional cuddler and ball enthusiast. I love everyone! 🎾',
        tags: ['Lovable', 'Social', 'Gentle'],
        owner: {
            name: 'Emily',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '6',
        name: 'Oliver',
        age: '5 years',
        breed: 'Maine Coon',
        distance: '0.5 km',
        image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1000&auto=format&fit=crop',
        bio: 'The gentle giant of the cat world. I enjoy bird watching and nap time.',
        tags: ['Cuddly', 'Large', 'Calm'],
        owner: {
            name: 'Sophie',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '7',
        name: 'Rex',
        age: '6 years',
        breed: 'German Shepherd',
        distance: '4.2 km',
        image: 'https://images.unsplash.com/photo-1589944172352-50346c7a10be?q=80&w=1000&auto=format&fit=crop',
        bio: 'Loyal companion and protector. I love long hikes and mental puzzles.',
        tags: ['Protective', 'Loyal', 'Trained'],
        owner: {
            name: 'James',
            image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '8',
        name: 'Coco',
        age: '2 years',
        breed: 'Chocolate Lab',
        distance: '1.8 km',
        image: 'https://images.unsplash.com/photo-1553736026-ff14d1f8d222?q=80&w=1000&auto=format&fit=crop',
        bio: 'I swim better than I walk! Let\'s go to the lake. 🌊',
        tags: ['Swimmer', 'Active', 'Foodie'],
        owner: {
            name: 'Marcus',
            image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '9',
        name: 'Daisy',
        age: '3 years',
        breed: 'Beagle',
        distance: '3.0 km',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1000&auto=format&fit=crop',
        bio: 'I follow my nose wherever it goes! Love sniffing out adventures.',
        tags: ['Curious', 'Sweet', 'Vocal'],
        owner: {
            name: 'Lily',
            image: 'https://images.unsplash.com/photo-1517841905240-472988bad1fa?q=80&w=200&auto=format&fit=crop'
        }
    },
    {
        id: '10',
        name: 'Simba',
        age: '1 year',
        breed: 'Bengal',
        distance: '0.2 km',
        image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=1000&auto=format&fit=crop',
        bio: 'High energy and obsessed with my feather wand. 🐆',
        tags: ['Exotic', 'Wild', 'Fast'],
        owner: {
            name: 'Leo',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
        }
    }
];
