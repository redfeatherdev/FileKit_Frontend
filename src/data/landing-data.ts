export const navMenuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Contact',
    href: '/contact-us',
  },
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
  },
  {
    title: 'Terms & Conditions',
    href: '/terms',
  }
];

export const storeFile = [
  {
    title: 'Create an account',
    description:
      'Quickly sign up to efficiently manage and securely store your files with FileKit’s user-friendly platform.',
    icon: 'User',
    color: '#9F57CB',
    shadowColor: '#9F57CB80',
  },
  {
    title: 'Upload your file',
    description:
      'Easily upload any file type using our simple, robust drag-and-drop or upload interface for seamless management.',
    icon: 'UpArrow',
    color: '#597AEA',
    shadowColor: '#597AEA80',
  },
  {
    title: 'Share file instantly',
    description:
      'Instantly share files securely with colleagues or clients, enhancing collaboration and communication.',
    icon: 'Hyperlink',
    color: '#57CBAA',
    shadowColor: '#57CBAA80',
  },
];

export const services = [
  {
    title: 'File Sharing',
    description:
      'Share files effortlessly with secure links, enhancing team collaboration and external partnerships.',
    icon: 'FileShare',
  },
  {
    title: 'Upload Files',
    description:
      'Quickly and efficiently upload files of any size and format with our user-friendly interface.',
    icon: 'FileUpload',
  },
  {
    title: 'Collect and receive files',
    description:
      'Streamline the process of collecting files with secure, straightforward, and customizable intake forms.',
    icon: 'FileReceive',
  },
];

export const features = [
  {
    title: 'Authentication',
    description: 'Secure user login with robust protection for your app.',
    image: '/assets/features/authentication.webp',
  },
  {
    title: 'Editable Homepage',
    description: 'Customize your homepage content with customizable options.',
    image: '/assets/features/editable-homepage.webp',
  },
  {
    title: 'Dark Mode',
    description: 'Enhance visual comfort with an optional darker color scheme.',
    image: '/assets/features/dark-mode.webp',
  },
  {
    title: 'File Previews',
    description: 'Quickly view file contents without download the entire file.',
    image: '/assets/features/file-preview.webp',
  },
  {
    title: 'High Performance',
    description: 'Experience efficiency with optimized performance.',
    image: '/assets/features/high-performance.webp',
  },
  {
    title: 'Sharing',
    description:
      'Facilitate seamless file sharing internally with guaranteed security.',
    image: '/assets/features/sharing.webp',
  },
  {
    title: 'Sharable Links',
    description:
      'Create secure links to share files with other users or members.',
    image: '/assets/features/shareable-links.webp',
  },
  {
    title: 'Responsive',
    description: 'Achieve flawless display on all devices and screen sizes.',
    image: '/assets/features/responsive.webp',
  },
  {
    title: 'Custom Pages',
    description: 'Design pages tailored to specific needs and requirements.',
    image: '/assets/features/custom-pages.webp',
  },
  {
    title: 'Analytics',
    description:
      'Gain insights with detailed analytics on file usage and users activity.',
    image: '/assets/features/analytics.webp',
  },
  {
    title: 'Advance Search',
    description:
      'Find files or folders swiftly using powerful and precise search tools.',
    image: '/assets/features/advance-search.webp',
  },
  {
    title: 'Trash',
    description: 'Easily manage deleted files and restore them as needed.',
    image: '/assets/features/trash.webp',
  },
];

export const pricing = {
  individual: [
    {
      slug: 'FREE_USER',
      name: 'Free',
      description: 'Free forever, with basic features.',
      features: {
        included: ['Basic Features'],
        notIncluded: [
          'Email Support',
          'Premium Features',
          '24/7 Chat Support',
          'Unlimited Access',
        ],
      },
      plans: [
        {
          name: '',
          description: '',
          price: '$0/month',
          planId: 'price_1PGGSpRqpbVy5HxZfhS3n3wA',
          trial: '',
          storage: '300MB',
          teams: 2
        },
      ],
    },
    {
      slug: 'PREMIUM_USER',
      name: 'Premium',
      description: 'For premium users, with premium features.',
      features: {
        included: [
          'Basic Features',
          'Email Support',
          'Premium Features',
          '24/7 Chat Support',
        ],
        notIncluded: ['Unlimited Access'],
      },
      plans: [
        {
          name: 'Monthly',
          description: 'The monthly premium plan',
          price: '$99/month',
          planId: 'price_1PGGSpRqpbVy5HxZl3eJ3s4b', // This is the id that will be used to identify the plan in the payment gateway
          trial: '1 Day',
          storage: '1GB',
          teams: 5
        },
      ],
    },
    {
      slug: 'EXCLUSIVE_USER',
      name: 'Exclusive',
      description: 'For exclusive users, with exclusive features.',
      features: {
        included: [
          'Basic Features',
          'Email Support',
          'Premium Features',
          '24/7 Chat Support',
          'Unlimited Access',
        ],
        notIncluded: [],
      },
      plans: [
        {
          name: 'Monthly',
          description: 'The monthly exclusive plan',
          price: '$199/month',
          planId: 'price_1PGGSpRqpbVy5HxZ670MLwX1', // This is the id that will be used to identify the plan in the payment gateway
          trial: '1 Day',
          storage: '10GB',
          teams: 10
        },
      ],
    },
  ],
  team: [
    {
      slug: 'FREE_TEAM',
      name: 'Free',
      description: 'Free forever, with basic features.',
      features: {
        included: ['600MB Storage', 'Basic Features', 'Email Support'],
        notIncluded: ['Premium Features', '24/7 Chat Support', 'Unlimited Access'],
      },
      plans: [
        {
          name: '',
          description: '',
          price: '$0/month',
          planId: 'price_1PGGW1RqpbVy5HxZ0KyhxcgK',
          trial: '',
          storage: '600MB',
          teams: 2
        },
      ],
    },
    {
      slug: 'BASIC_TEAM',
      name: 'Basic',
      description: 'For basic teams, with basic features.',
      features: {
        included: [
          '100GB Storage',
          'Basic Features',
          'Email Support',
          'Premium Features',
          '24/7 Chat Support',
        ],
        notIncluded: ['Unlimited Access'],
      },
      plans: [
        {
          name: 'Monthly',
          description: 'The monthly premium plan',
          price: '$300/month',
          planId: 'price_1PGGW1RqpbVy5HxZBkuDrOnb', // This is the id that will be used to identify the plan in the payment gateway
          trial: '1 Day',
          storage: '100GB',
          teams: 5
        },
      ],
    },
    {
      slug: 'PREMIUM_TEAM',
      name: 'Premium',
      description: 'For premium teams, with premium features.',
      features: {
        included: [
          '500GB Storage',
          'Basic Features',
          'Email Support',
          'Premium Features',
          '24/7 Chat Support',
          'Unlimited Access',
        ],
        notIncluded: [],
      },
      plans: [
        {
          name: 'Monthly',
          description: 'The monthly premium plan',
          price: '$999/month',
          planId: 'price_1PGGW1RqpbVy5HxZm5g7tfNw', // This is the id that will be used to identify the plan in the payment gateway
          trial: '1 Day',
          storage: '500GB',
          teams: 10
        },
      ],
    },
  ],
};

export const testimonials = [
  {
    name: 'Jonathat Taylor',
    username: '@jonathattylor',
    avatar: '/assets/avatars/avatar1.webp',
    post: 'FileKit has completely transformed our workflow with its user-friendly interface and efficiency. Highly recommended for anyone looking for a reliable file management solution.',
    date: new Date(),
  },
  {
    name: 'Isabella Berger',
    username: '@isabellaberger',
    avatar: '/assets/avatars/avatar2.webp',
    post: "Since we started using FileKit, our team's collaboration has significantly improved. It's a reliable, secure platform that has streamlined our document management processes.",
    date: new Date(),
  },
  {
    name: 'Justin Willson',
    username: '@justinwillson',
    avatar: '/assets/avatars/avatar3.webp',
    post: "Fantastic tool with unbeatable features! Amazing! FileKit's support team is always responsive and helpful, making it an excellent choice for our business needs.",
    date: new Date(),
  },
  {
    name: 'Justin Willson',
    username: '@justinwillson',
    avatar: '/assets/avatars/avatar4.webp',
    post: 'FileKit made file management not only easy but also very secure. Its features are perfectly tailored for growing businesses like ours, looking for scalable solutions.',
    date: new Date(),
  },
  {
    name: 'Jonathat Taylor',
    username: '@jonathattylor',
    avatar: '/assets/avatars/avatar5.webp',
    post: "A must-have service for any organization, FileKit's intuitive design and robust functionality make it indispensable for managing our critical data efficiently.",
    date: new Date(),
  },
  {
    name: 'Isabella Berger',
    username: '@isabellaberger',
    avatar: '/assets/avatars/avatar6.webp',
    post: 'We rely on FileKit daily for its excellent value and superb data protection system. Gradually has become an essential tool in our data management strategy.',
    date: new Date(),
  },
];