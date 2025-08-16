const FirstLists = [
  {
    id: 1,
    status: "active",
    data: [
      {
        id: 1,
        FooterHeader: "About Us",
        FooterName: "About Us",
        link: "/about-us",
      },
      {
        id: 2,
        FooterHeader: "Contact Us",
        FooterName: "Contact Us",
        link: "/contact-us",
      },
      {
        id: 3,
        FooterHeader: "Our Services",
        FooterName: "Our Services",
        link: "/our-services",
      },
    ],
  },
];

const SecondLists = [
  {
    id: 1,
    status: "active",
    data: [
      {
        id: 1,
        FooterHeader: "Home",
        routeName: "/",
        link: "/",
      },
      {
        id: 2,
        FooterHeader: "Our Mission",
        routeName: "/",
        link: "#mission",
      },
      {
        id: 3,
        FooterHeader: "Who we are",
        routeName: "/",
        link: "#we_are",
      },
      {
        id: 4,
        FooterHeader: "Home",
        routeName: "/about-us",
        link: "#aboutBanner",
      },
      {
        id: 5,
        FooterHeader: "Core Values",
        routeName: "/about-us",
        link: "#core_value",
      },
      {
        id: 6,
        FooterHeader: "Our Team",
        routeName: "/about-us",
        link: "#our_team",
      },
      {
        id: 7,
        FooterHeader: "Home",
        routeName: "/our-services",
        link: "#service_banner",
      },
      {
        id: 8,
        FooterHeader: "Our Service",
        routeName: "/our-services",
        link: "#ourService",
      },
      {
        id: 9,
        FooterHeader: "Home",
        routeName: "/contact-us",
        link: "#map",
      },
      {
        id: 10,
        FooterHeader: "Our Partners",
        routeName: "/contact-us",
        link: "#our_partners",
      },
    ],
  },
];

const ThirdLists = [
  {
    id: 1,
    status: "active",
    data: [
      {
        id: 1,
        ContactName: "Capt.Ron",
        ContactNo: "+65 9664 1872",
        ContactMessage:
          "Hello *Capt. Ron*, \nI came across your services and I'm really interested in learning more. \nWhen you have a moment, could you please give me a call? I'd appreciate the opportunity to speak with you. \n\nThank you!",
      },
      {
        id: 2,
        ContactName: "Capt.Senthil",
        ContactNo: "+65 8406 6188",
        ContactMessage:
          "Hi *Capt. Senthil*, \nI hope you're doing well. \nI'm reaching out as I'm interested in your services. \nI'd appreciate it if you could give me a call at your convenience. \n\nThanks a lot!",
      },
    ],
  },
];

export { FirstLists, SecondLists, ThirdLists };
