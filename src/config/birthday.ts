export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  icon: string;
}

export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  rotation?: number;
}

export interface BucketItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface BirthdayConfig {
  name: string;
  nickname: string;
  birthdayAge: number;
  birthdayDate: string;
  relationshipStartDate: string;
  letterText: string[];
  timelineEvents: TimelineEvent[];
  galleryPhotos: PolaroidPhoto[];
  reasons: string[];
  loveMetrics: { name: string; value: number }[];
  bucketList: BucketItem[];
  spotifyEmbedUrl: string;
  youtubeEmbedUrl: string;
  callNumber: string;
}

export const birthdayConfig: BirthdayConfig = {
  name: "Tajji",
  nickname: "My Princess",
  birthdayAge: 22,
  birthdayDate: "2026-07-10T00:00:00",
  relationshipStartDate: "2023-10-20T00:00:00",
  letterText: [
    "Dear Manu,",
    "Happy 22nd Birthday, my beautiful girl. Even though miles separate us today, not a single heartbeat passes without thinking of you.",
    "Thank you for filling my life with love, happiness, laughter, and memories that I'll always cherish. You've brought a light into my world that I never knew existed.",
    "These three years have been the most beautiful chapter of my life. From our first shy greetings to the countless late-night calls and beautiful dates, every single second with you is a treasure.",
    "You deserve every ounce of happiness in the world today and always. I wish I could be right beside you, holding your hand and celebrating your special day.",
    "Until then, look up at the moon and know that my heart is always right there with you. We are under the same sky, breathing the same love.",
    "Happy Birthday. I Love You to the moon and back, forever and always. ❤️"
  ],
  timelineEvents: [
    {
      id: "event-1",
      title: "First Hi 👋",
      date: "July 9, 2023",
      description: "Where it all began. That simple text that brought us together and set us on this beautiful journey. You in your pink floral dress, taking my breath away from day one.",
      image: "/photos/WhatsApp Image 2026-07-09 at 4.45.18 PM.jpeg",
      icon: "❤️"
    },
    {
      id: "event-2",
      title: "Coffee Dates ☕",
      date: "August 15, 2023",
      description: "Our favorite coffee dates—sharing warm drinks and having 'Tajji' and 'Mani' written on the Starbucks cups. Here's to countless more cups shared with you.",
      image: "/photos/WhatsApp Image 2026-07-09 at 4.45.59 PM.jpeg",
      icon: "❤️"
    },
    {
      id: "event-3",
      title: "Gurudwara Blessings 🌸",
      date: "November 12, 2023",
      description: "Seeking blessings together at the Gurudwara. You in your beautiful black suit and embroidered phulkari dupatta covering your head, standing next to me by the holy sarovar. A moment of pure peace.",
      image: "/photos/WhatsApp Image 2026-07-09 at 4.46.02 PM (1).jpeg",
      icon: "❤️"
    },
    {
      id: "event-4",
      title: "Rooftop Celebrations 🎂",
      date: "July 9, 2024",
      description: "Celebrations under the starry sky. Sitting on the rooftop surrounded by glowing candles, cutting cakes, and laughing in each other's arms.",
      image: "/photos/WhatsApp Image 2026-07-09 at 4.46.01 PM.jpeg",
      icon: "❤️"
    },
    {
      id: "event-5",
      title: "Three Years of Us 💍",
      date: "July 9, 2026",
      description: "Three full years of walking hand in hand, sitting on lawns, leaning on shoulders, and loving you more and more every single day.",
      image: "/photos/WhatsApp Image 2026-07-09 at 4.45.58 PM (2).jpeg",
      icon: "❤️"
    }
  ],
  galleryPhotos: [
    {
      id: "photo-1",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.45.57 PM.jpeg",
      caption: "The day I proposed to you, Mani. I was so nervous but look how happy we were, surrounded by red balloons and lights. The start of our forever.",
      rotation: -3
    },
    {
      id: "photo-2",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.00 PM (2).jpeg",
      caption: "Our Valentine's Day. When you hand-made this cute little teddy keychain for me. I still keep it so close, it's one of my most special gifts.",
      rotation: 4
    },
    {
      id: "photo-3",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.04 PM.jpeg",
      caption: "Remember when Mani really wanted to go on a trek? We went up, saw the sunrise together. Such a quiet, beautiful, and special moment for us.",
      rotation: -2
    },
    {
      id: "photo-4",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.45.58 PM.jpeg",
      caption: "Our Yamuna boat ride. The water was so peaceful, and you looked so beautiful smiling with your eyes closed.",
      rotation: 3
    },
    {
      id: "photo-5",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.01 PM (1).jpeg",
      caption: "The mirror selfie we took during our Amritsar trip. One of our most favorite photos.",
      rotation: -4
    },
    {
      id: "photo-6",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.45.59 PM.jpeg",
      caption: "Our ice cream date at Polar Bear. Eating sweets and sharing sweet moments.",
      rotation: 2
    },
    {
      id: "photo-7",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.45.58 PM (1).jpeg",
      caption: "IPU Fest! Our absolute 'Jab We Met' moment. I'll never forget this day.",
      rotation: -1
    },
    {
      id: "photo-8",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.01 PM (2).jpeg",
      caption: "Sitting on the rooftop in the early morning, hugging you tight. I wish time stood still right there.",
      rotation: 5
    },
    {
      id: "photo-9",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.05 PM (1).jpeg",
      caption: "When I moved to Bangalore. Goodbyes are the hardest, but they only made me realize how much you mean to me.",
      rotation: -3
    },
    {
      id: "photo-10",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.45.59 PM (1).jpeg",
      caption: "You looking so beautiful here. I can stare at this smile forever.",
      rotation: 2
    },
    {
      id: "photo-11",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.01 PM (3).jpeg",
      caption: "Another rooftop memory. Under the open sky, just you and me.",
      rotation: -4
    },
    {
      id: "photo-12",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.05 PM.jpeg",
      caption: "That day we went out wandering. Sitting on the bench, holding hands and just talking about everything.",
      rotation: 4
    },
    {
      id: "photo-13",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.45.59 PM (2).jpeg",
      caption: "One of my favorite memories of you. You make everything so bright.",
      rotation: -2
    },
    {
      id: "photo-14",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.02 PM.jpeg",
      caption: "Going to pick you up at the airport with sunflowers. Seeing you walk out was the absolute best feeling ever.",
      rotation: 3
    },
    {
      id: "photo-15",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.03 PM.jpeg",
      caption: "Cozy cafe dates, hugging under the warm lights and forgetting about the rest of the world.",
      rotation: -5
    },
    {
      id: "photo-16",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.00 PM.jpeg",
      caption: "Our first and best photo together at the Red Fort. This will always be extremely close to my heart.",
      rotation: 2
    },
    {
      id: "photo-17",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.02 PM (2).jpeg",
      caption: "Our visit to Akshardham. Such a spiritual and beautiful day out with you.",
      rotation: -3
    },
    {
      id: "photo-18",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.05 PM (2).jpeg",
      caption: "Dancing and partying together in Bangalore. Making the best out of every night.",
      rotation: 4
    },
    {
      id: "photo-19",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.00 PM (1).jpeg",
      caption: "Proposing to you in college, down on one knee. You saying yes made me the happiest person alive.",
      rotation: -2
    },
    {
      id: "photo-20",
      url: "/photos/WhatsApp Image 2026-07-09 at 4.46.06 PM.jpeg",
      caption: "Another club night with you. Dancing, laughing, and living our best life.",
      rotation: 1
    }
  ],
  reasons: [
    "Your laugh, which is my absolute favorite sound in the entire world.",
    "The way your eyes sparkle whenever you talk about something you love.",
    "Your beautiful, kind heart that always puts others first.",
    "How safe and completely at peace I feel when you hold my hand.",
    "Your brilliant mind and the amazing way you see the world.",
    "The cute little nose scrunch you do when you giggle.",
    "How you make even the most boring, ordinary days feel like a grand adventure.",
    "Your endless patience and support, especially on my hard days.",
    "The way you care for animals and every living thing.",
    "Your strength and resilience, which inspires me to be a better person.",
    "The way you look at me, making me feel like the luckiest person alive.",
    "Your voice, which instantly calms my racing mind.",
    "How you remember the tiniest details about me that I forget myself.",
    "Your goofy, adorable sense of humor that always cures my sadness.",
    "The warmth and absolute comfort of your hugs.",
    "How we can talk for hours about everything or sit in comfortable silence.",
    "The way you believe in me even when I struggle to believe in myself.",
    "Your taste in music and how we share songs like secret love letters.",
    "How beautiful you look when you first wake up, completely natural and radiant.",
    "Your cooking and the love you pour into everything you make.",
    "The way you protect and defend the people you care about.",
    "How you can read my mind with just a single glance across the room.",
    "Your beautiful dreams for our future that I can't wait to build with you.",
    "The sweet, soothing scent of your hair that lingers on my shirts.",
    "Simply because you are you—my perfect, beautiful, and irreplaceable girl."
  ],
  loveMetrics: [
    { name: "Trust", value: 100 },
    { name: "Care", value: 100 },
    { name: "Respect", value: 100 },
    { name: "Loyalty", value: 100 }
  ],
  bucketList: [
    { id: "bucket-1", text: "Long Drive in the Rain 🌧️", completed: true },
    { id: "bucket-2", text: "Watching Sunrise together 🌅", completed: false },
    { id: "bucket-3", text: "Goa Beach Trip 🏖️", completed: false },
    { id: "bucket-4", text: "Matching Hoodies 🧥", completed: true },
    { id: "bucket-5", text: "Cozy Movie Night under a blanket fort 🍿", completed: true },
    { id: "bucket-6", text: "Forever Together ❤️", completed: false }
  ],
  spotifyEmbedUrl: "https://open.spotify.com/embed/track/1dGr142guvNEMhp76ZGbVz?utm_source=generator&theme=0",
  youtubeEmbedUrl: "/photos/WhatsApp Video 2026-07-09 at 4.46.06 PM.mp4",
  callNumber: "+1234567890"
};
