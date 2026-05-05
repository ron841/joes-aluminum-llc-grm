// Content slots authored from the Design pack content-inventory.md (iter-1).
// Pending tags render as visible placeholder copy; never fabricate.

export const PENDING_PLACEHOLDER = "[ pending walkthrough ]";

export const site = {
  business_name: "Joe's Aluminum L.L.C.",
  display_name: "Joe's Aluminum",
  tagline: "Screens, sealed and squared. Most of The Villages, most of Lake County.",
  phone_display: "(352) 602-3785",
  phone_tel: "tel:+13526023785",
  address_street: "5121 Magnolia Ridge Road",
  address_city_state_zip: "Fruitland Park, FL 34731",
  fb_url: "https://www.facebook.com/Joesaluminumllc/",
  gbp_listing_url:
    "https://www.google.com/maps/place/?q=place_id:ChIJ0zECOhZpk6IRxhg27R8MKvE",
  aggregate_rating: "5.0",
  review_count: 115,
  founded_year: 2017,
  static_forms_key: "sf_e0e200934d4f36c17a10d00c",
};

export const nav = {
  brand_wordmark: "Joe's Aluminum",
  links: [
    { label: "What He Does", href: "#services" },
    { label: "What People Say", href: "#proof" },
    { label: "About Joe", href: "#about" },
    { label: "All 115 Reviews", href: "/reviews" },
    { label: "Contact", href: "#contact" },
  ],
  cta_phone: "Call (352) 602-3785",
};

export const hero = {
  eyebrow: "Screen repair, lanai work, aluminum trade.",
  headline:
    "The screens, the doors, the windows on the lanai. He shows up the same week and names the price on the first call.",
  subhead:
    "One-hundred-fifteen reviews. Five stars. Most of The Villages knows the number by now.",
  cta_primary: { label: "Call (352) 602-3785", href: "tel:+13526023785" },
  cta_secondary: { label: "See the work", href: "#proof" },
  trust_line:
    "Joe's Aluminum L.L.C. · Fruitland Park, FL · serving Lake County, Sumter County, and The Villages",
};

export type TrustItem = {
  headline: string;
  subhead: string;
  isQuote?: boolean;
};

export const trust: TrustItem[] = [
  { headline: "115 reviews", subhead: "Five stars on Google." },
  {
    headline: "Replies to every review",
    subhead: "Twenty-nine of thirty in our last sample.",
  },
  {
    headline: "Out the same week",
    subhead: "“Called Monday. At my house at 9am Wednesday.”",
    isQuote: true,
  },
  {
    headline: "Joe and his dad",
    subhead: "Two-person operation. Most jobs in a day.",
  },
  {
    headline: "The Villages refers him",
    subhead:
      "“Joe is our Go-To for any screen repairs.” / Cole Ramsey, window cleaning company, The Villages",
    isQuote: true,
  },
];

export const services = {
  eyebrow: "What He Does",
  headline: "Screens first. Aluminum work next.",
  intro:
    "Joe re-screens lanais and pool cages all week long. The rest of the aluminum trade. Vinyl windows, gutters, metal-roof leaks. All on the same truck.",
  cards: [
    {
      title: "Lanai re-screening",
      description:
        "Tear out the old mesh. Spline in new. Most lanais done in a morning, the bigger ones by lunch.",
      quote:
        "“Took them exactly one hour to get both doors fully operational again.”",
      photo: "01.jpg",
      alt: "Joe's Aluminum lanai screen work",
    },
    {
      title: "Pool cages and birdcages",
      description:
        "Pool cage panels, screen rooms, birdcage repair on torn or sagging mesh. Ladder work included.",
      quote:
        "“He has done a great job repairing the pool screen in my rental property.”",
      photo: "02.jpg",
      alt: "Pool cage and birdcage screen repair",
    },
    {
      title: "Screen doors",
      description:
        "Sliders that won't slide. Doors that won't latch. Re-hang, adjust, re-thread. Or replace the whole panel.",
      quote:
        "“They re-hung both doors, adjusted both door bottoms and adjusted both thresholds.”",
      photo: "03.jpg",
      alt: "Screen door re-hang and adjustment",
    },
    {
      title: "Vinyl windows on lanais",
      description:
        "Re-rolled vinyl, replaced panels, new tracks. The kind of work that turns a tired sunroom back into a sunroom.",
      quote:
        "“Super happy I could get your vinyl windows looking new again.”",
      photo: "04.jpg",
      alt: "Vinyl window panel replacement on a lanai",
    },
    {
      title: "Aluminum gutters",
      description:
        "Sealing leaks, re-pitching runs, replacing damaged sections. Before-and-after photos at every job.",
      quote:
        "“He came out and did the repairs over the next week. He did an excellent job, took before and after pics and was very thorough!”",
      photo: "05.jpg",
      alt: "Aluminum gutter repair work",
    },
    {
      title: "Metal roof leaks",
      description:
        "Aluminum roofs that drip at the seams. Sealed, not patched. Same day when the schedule allows.",
      quote:
        "“Came out the day after I called. Gave me a quick quote and when I asked when we could schedule, he said they would do it right then.”",
      photo: "06.jpg",
      alt: "Metal roof leak repair",
    },
  ],
};

export const proof = {
  eyebrow: "What People Say",
  headline: "Three of one-hundred-fifteen.",
  testimonials: [
    {
      body: "“I met Joe a few years ago when he replaced my lanai screens at my house. His reliability, workmanship and pricing is given with the highest praise. I own a painting company in The Villages and paint a lot of exteriors where I have to remove the screen on many lanai's. Joe is the only one I refer all my clients to with 100% satisfaction.”",
      attribution: "Michael Baruch",
      role: "painting company owner, The Villages",
      stars: 5,
      relative_date: "a year ago",
      reply:
        "“Mike! Thank you for taking time out of your day to leave us a wonderful review. It has been a pleasure meeting you a working with you. Thank you for the business. Truly appreciate it.”",
    },
    {
      body: "“Neither of my two screen doors on my lanai (patio villa) were opening or closing properly. Called Joe's Aluminum on Monday. They were at my house at 9am Wednesday. Took them exactly one hour to get both doors fully operational again. They re-hung both doors, adjusted both door bottoms and adjusted both thresholds. They did a great job!! And what they charged me was very reasonable and very fair.”",
      attribution: "Dave H",
      role: "Patio villa owner",
      stars: 5,
      relative_date: "3 months ago",
      reply:
        "“Thank you Dave! Along with the kind words. Super happy we could get both of your doors working like new again. We truly appreciate your business.”",
    },
    {
      body: "“We inherited a lake house that had fallen into some disrepair, especially the screens on the back porch. Joe and his dad showed up and quoted us a very competitive price. We hired him because he is communicative, honest, and ethical. They both arrived ON TIME and worked so hard. Turns out his quote was lower than it needed to be, but Joe refused to quote us any higher of a price.”",
      attribution: "Lou Berger",
      role: "Lake-house owner",
      stars: 5,
      relative_date: "9 months ago",
      reply:
        "“Thank very much for the business & trusting us!! We are super happy we could take care of your screens and making your patio enjoyable again.”",
    },
  ],
  grid: [
    { photo: "grid-1.jpg", alt: "Finished lanai screen work" },
    { photo: "grid-2.jpg", alt: "Pool cage panel repair" },
    { photo: "grid-3.jpg", alt: "Screen door installation" },
    { photo: "grid-4.jpg", alt: "Aluminum gutter detail" },
  ],
  see_all: { label: "See all 115 reviews", href: "/reviews" },
};

export const about = {
  eyebrow: "About Joe",
  headline: "The aluminum guy The Villages already calls.",
  paragraphs: [
    "Joe runs a screen-and-aluminum shop out of Fruitland Park. Most of his work is on the lanais, pool cages, and screen rooms of The Villages, plus the rest of Lake County and the Sumter County edge.",
    "He works with his dad. Two trucks, one phone number, most jobs in a day. He answers the phone himself and gives a number on the first call.",
    "The other Villages contractors know him. The painters call him when they need to put a lanai back together. The window cleaners send their customers his way for screen repair. That's the most honest thing a small operator can put on a website.",
  ],
  signature_pending: "Joe " + PENDING_PLACEHOLDER + ", Owner",
  founded_line: "Established 2017.",
};

export const faq = {
  eyebrow: "A few quick answers",
  headline: "What people ask before they call.",
  items: [
    {
      question: "What's the typical turnaround?",
      answer:
        "Most calls get an estimate the same day, often by phone. The work itself usually lands within the same week. Monday call, Wednesday on site is the common pattern.",
      open: true,
    },
    {
      question: "What does a re-screen cost?",
      answer:
        "Joe gives every estimate over the phone or on a quick visit, free. Pricing depends on the size of the lanai or pool cage, the spline material, and the access.",
    },
    {
      question: "Where do you work?",
      answer:
        "The Villages, Fruitland Park, and most of Lake County and Sumter County. If you're nearby and not sure, just call. Joe will tell you.",
    },
    {
      question: "Screens only, or full aluminum work?",
      answer:
        "Screens are the bulk of the work. Lanais, pool cages, doors, individual windows. Beyond that: vinyl window panels, aluminum gutters, and metal-roof leak repair.",
    },
  ],
};

export const contact = {
  eyebrow: "Get a number",
  headline: "Call Joe. He'll tell you what it costs.",
  phone_label: "Call",
  phone_display: "(352) 602-3785",
  phone_href: "tel:+13526023785",
  address_label: "Shop",
  address_lines: ["5121 Magnolia Ridge Road", "Fruitland Park, FL 34731"],
  hours_label: "Hours",
  hours_display: "Monday to Sunday, 9am to 7pm",
  form: {
    intro: "Or send a quick note. Joe checks email between jobs.",
    name_label: "Your name",
    phone_label: "Best phone",
    address_label: "Where's the work?",
    message_label: "What needs doing?",
    submit_label: "Send to Joe",
    success_message:
      "Thanks. Joe will get back to you. If it's urgent, call (352) 602-3785.",
    error_message:
      "Something went wrong sending the form. Please call (352) 602-3785.",
  },
};

export const footer = {
  brand_wordmark: "Joe's Aluminum L.L.C.",
  tagline: "Fruitland Park, Florida. Established 2017.",
  contact_phone_display: "(352) 602-3785",
  contact_phone_href: "tel:+13526023785",
  contact_address_lines: [
    "5121 Magnolia Ridge Road",
    "Fruitland Park, FL 34731",
  ],
  fb_label: "Facebook",
  fb_href: "https://www.facebook.com/Joesaluminumllc/",
  gbp_label: "Google Business",
  gbp_href:
    "https://www.google.com/maps/place/?q=place_id:ChIJ0zECOhZpk6IRxhg27R8MKvE",
  copyright: "© 2026 Joe's Aluminum L.L.C.",
};

export const sticky = {
  label: "Call Joe",
  phone_display: "(352) 602-3785",
  phone_href: "tel:+13526023785",
};
