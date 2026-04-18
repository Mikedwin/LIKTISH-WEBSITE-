import type {
  FAQItem,
  NavLink,
  ProjectData,
  ServicePageData,
  TeamMember,
  TestimonialData,
} from "@/types/site";

export const siteContact = {
  phone: "+233 54 279 4665",
  email: "soaliki95@aol.com",
  whatsapp:
    "https://wa.me/233542794665?text=Hello%20LIKTISH%2C%20I%20would%20like%20to%20talk%20about%20a%20solar%20system%20for%20my%20property.",
  address: "BU368, Snooker Avenue, Adientem, Takoradi, Ghana",
  officeHours: "Mon - Sat, 8:00 AM - 6:00 PM",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/#top" },
  { label: "Services", href: "/#services" },
  { label: "Why LIKTISH", href: "/#why-liktish" },
  { label: "Projects", href: "/#projects" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export const stats = [
  { label: "Systems installed", value: "500+" },
  { label: "kW generated", value: "1,200+" },
  { label: "Satisfied customers", value: "300+" },
  { label: "Average panel warranty", value: "25 years" },
];

export const trustBadges = [
  "Certified solar engineering team",
  "Residential to industrial delivery experience",
  "Free site assessment and consultation",
  "Long-term maintenance support",
];

export const whyLiktishPoints = [
  {
    title: "Slash electricity bills",
    body: "Build a system that reduces ECG dependence and protects your budget from rising tariffs.",
  },
  {
    title: "Uninterrupted power",
    body: "Pair panels with storage for dependable backup through dumsor and unstable supply windows.",
  },
  {
    title: "Expert engineering",
    body: "Systems are sized and installed by experienced professionals with a focus on safety and long-term performance.",
  },
  {
    title: "Long-term partnership",
    body: "Maintenance, repairs, and lifetime support keep every LIKTISH system producing at its best.",
  },
];

export const services: ServicePageData[] = [
  {
    slug: "residential",
    label: "Residential",
    title: "Residential Solar",
    shortDescription:
      "Custom home solar systems with battery backup that eliminate dumsor and reduce household energy spend.",
    heroTitle: "Own your power at home",
    heroBody:
      "LIKTISH helps homeowners move from unreliable grid dependency to engineered solar systems designed for comfort, security, and lower monthly bills.",
    benefits: [
      "Lower ECG bills with predictable monthly savings",
      "Battery-ready systems for night-time backup",
      "Clean rooftop layouts that protect property value",
    ],
    painPoints: [
      "Frequent outages and dumsor",
      "Rising household electricity bills",
      "Power instability damaging appliances",
    ],
    process: [
      "Free site visit and roof assessment",
      "System sizing and proposal with savings projection",
      "Installation, commissioning, and handover",
    ],
    systemOptions: [
      "Starter hybrid systems",
      "Full home backup",
      "Premium smart monitoring",
    ],
    faqs: [
      {
        question: "Can LIKTISH install on an existing home?",
        answer:
          "Yes. The team assesses roof structure, load profile, and battery needs before recommending a tailored solution.",
      },
      {
        question: "Will the system work during outages?",
        answer:
          "Hybrid systems with batteries can keep critical loads running during grid outages.",
      },
    ],
    caseStudySlug: "asante-family-home",
  },
  {
    slug: "commercial",
    label: "Commercial",
    title: "Commercial Solar",
    shortDescription:
      "Solar systems for businesses focused on lowering operating costs, improving uptime, and protecting margins.",
    heroTitle: "Make energy a business advantage",
    heroBody:
      "For shops, offices, hospitality, and mixed-use sites, LIKTISH designs commercial systems that reduce cost pressure and power disruption.",
    benefits: [
      "Lower monthly operating expenses",
      "Better uptime for customer-facing operations",
      "Clear ROI narrative for decision makers",
    ],
    painPoints: [
      "Revenue loss during outages",
      "High daytime energy bills",
      "Expensive generator reliance",
    ],
    process: [
      "Energy audit and load analysis",
      "Commercial design with phased options",
      "Fast installation with minimal disruption",
    ],
    systemOptions: [
      "Rooftop systems",
      "Hybrid business continuity",
      "Multi-site rollout planning",
    ],
    faqs: [
      {
        question: "Can the system be expanded later?",
        answer:
          "Yes. Commercial systems are scoped with future growth and staged deployment in mind.",
      },
      {
        question: "Do you provide ROI estimates?",
        answer:
          "Every proposal includes savings guidance, sizing rationale, and phased investment options.",
      },
    ],
    caseStudySlug: "retail-business-complex",
  },
  {
    slug: "industrial",
    label: "Industrial / EPC",
    title: "Industrial / EPC",
    shortDescription:
      "Large-scale engineering, procurement, and construction delivery for factories, plants, and energy-intensive operations.",
    heroTitle: "Industrial solar built for output",
    heroBody:
      "LIKTISH brings technical rigor, site planning, and structured delivery to industrial and EPC-scale solar projects across Ghana.",
    benefits: [
      "High-capacity systems sized for demanding loads",
      "Disciplined EPC delivery process",
      "Long-term reliability and service continuity",
    ],
    painPoints: [
      "High energy costs across heavy operations",
      "Downtime sensitivity in production",
      "Need for contractor discipline and documentation",
    ],
    process: [
      "Pre-feasibility, site study, and engineering brief",
      "Detailed procurement and installation planning",
      "Commissioning, training, and handover support",
    ],
    systemOptions: [
      "Industrial rooftop",
      "Ground-mount EPC",
      "Battery-backed resilience planning",
    ],
    faqs: [
      {
        question: "Can LIKTISH work with plant operations teams?",
        answer:
          "Yes. The industrial process is designed to coordinate with operations, EHS, and procurement stakeholders.",
      },
      {
        question: "What documentation is included?",
        answer:
          "Projects can include engineering documentation, commissioning records, and maintenance planning support.",
      },
    ],
    caseStudySlug: "manufacturing-facility",
  },
  {
    slug: "government",
    label: "Government & Institutions",
    title: "Government & Institutions",
    shortDescription:
      "Structured solar delivery for public sector, education, healthcare, and institutional facilities requiring compliance and accountability.",
    heroTitle: "Institutional solar with accountability",
    heroBody:
      "LIKTISH supports public and institutional buyers with documented, compliant delivery and clear maintenance planning.",
    benefits: [
      "Documented execution for institutional stakeholders",
      "Reliable power for public-facing services",
      "Scalable delivery for campuses and multi-building sites",
    ],
    painPoints: [
      "Need for dependable service continuity",
      "Multi-stakeholder procurement processes",
      "Compliance and reporting expectations",
    ],
    process: [
      "Needs discovery and institutional scoping",
      "Compliance-led proposal and implementation plan",
      "Commissioning, training, and maintenance handover",
    ],
    systemOptions: [
      "School and campus solar",
      "Clinic and health facility backup",
      "Institutional resilience packages",
    ],
    faqs: [
      {
        question: "Can LIKTISH support phased deployment?",
        answer:
          "Yes. Institutional projects can be broken into stages aligned with funding or operational priorities.",
      },
      {
        question: "Do you support maintenance after launch?",
        answer:
          "Maintenance and long-term support are part of the operating model for institutional projects.",
      },
    ],
    caseStudySlug: "regional-training-centre",
  },
  {
    slug: "maintenance",
    label: "Maintenance & Repairs",
    title: "Maintenance & Repairs",
    shortDescription:
      "Planned maintenance, diagnostics, and repairs for LIKTISH systems and qualifying third-party solar installations.",
    heroTitle: "Protect your solar investment",
    heroBody:
      "From preventive inspections to inverter faults and battery performance issues, LIKTISH keeps systems operating safely and efficiently.",
    benefits: [
      "Longer asset life through planned maintenance",
      "Fast issue diagnosis and repair support",
      "Support for third-party systems after assessment",
    ],
    painPoints: [
      "Declining system performance",
      "Battery or inverter faults",
      "No reliable support after installation",
    ],
    process: [
      "Inspection and diagnostic review",
      "Maintenance plan or repair scope",
      "Follow-up reporting and recommendations",
    ],
    systemOptions: [
      "Preventive maintenance plans",
      "Corrective repairs",
      "System optimization audits",
    ],
    faqs: [
      {
        question: "Do you support systems installed by another contractor?",
        answer:
          "Yes, after a technical assessment confirms the system can be safely serviced.",
      },
      {
        question: "Can maintenance be scheduled regularly?",
        answer:
          "Yes. LIKTISH offers ongoing maintenance plans tailored to system size and usage profile.",
      },
    ],
    caseStudySlug: "legacy-system-recovery",
  },
];

export const projects: ProjectData[] = [
  {
    slug: "asante-family-home",
    title: "Asante Family Home",
    category: "Residential",
    location: "Takoradi",
    systemSize: "5 kW hybrid system",
    summary:
      "A full-home backup package that stabilised household power and cut the family's ECG bill.",
    challenge:
      "The family experienced repeated outages, unstable power for appliances, and high evening generator costs.",
    solution:
      "LIKTISH delivered a hybrid rooftop system with battery storage sized for daily household loads and backup resilience.",
    results: [
      "Monthly bill dropped by an estimated 82%",
      "Critical home circuits remain powered during outages",
      "System monitoring supports proactive maintenance",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  },
  {
    slug: "retail-business-complex",
    title: "Retail Business Complex",
    category: "Commercial",
    location: "Kumasi",
    systemSize: "30 kW commercial rooftop",
    summary:
      "A commercial solar rollout that reduced daytime energy costs and protected tenant operations.",
    challenge:
      "The property owner faced rising energy costs and increasing pressure from tenants affected by power instability.",
    solution:
      "LIKTISH designed a commercial rooftop array with staged installation planning and monitoring-ready infrastructure.",
    results: [
      "Meaningful reduction in daytime utility spend",
      "Better power continuity for retail tenants",
      "Improved asset attractiveness for occupancy",
    ],
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&q=80",
  },
  {
    slug: "manufacturing-facility",
    title: "Manufacturing Facility",
    category: "Industrial",
    location: "Accra",
    systemSize: "150 kW EPC deployment",
    summary:
      "An industrial EPC installation built to offset production energy demand and improve resilience.",
    challenge:
      "The client needed a partner that could work within industrial operating constraints and provide disciplined execution.",
    solution:
      "LIKTISH handled engineering, procurement coordination, phased installation, and commissioning support.",
    results: [
      "Reduced dependence on grid and generator usage",
      "Structured implementation with minimal site disruption",
      "Technical handover and maintenance roadmap completed",
    ],
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "regional-training-centre",
    title: "Regional Training Centre",
    category: "Government",
    location: "Western Region",
    systemSize: "40 kW institutional hybrid system",
    summary:
      "An institutional system that improved daily service continuity across classrooms and admin spaces.",
    challenge:
      "The centre needed a reliable daytime power solution with backup for key operations and clear maintenance guidance.",
    solution:
      "LIKTISH implemented an institutional hybrid system and trained site stakeholders on operations and escalation paths.",
    results: [
      "Improved continuity for learning spaces",
      "Lower operating cost pressure",
      "Clear support path for maintenance and future expansion",
    ],
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&q=80",
  },
  {
    slug: "legacy-system-recovery",
    title: "Legacy System Recovery",
    category: "Commercial",
    location: "Takoradi",
    systemSize: "Maintenance and optimization programme",
    summary:
      "A repair and optimization engagement that restored output on an underperforming third-party installation.",
    challenge:
      "The client's existing system was producing inconsistent output and lacked a clear maintenance plan.",
    solution:
      "LIKTISH conducted diagnostics, replaced faulty components, and introduced a recurring maintenance schedule.",
    results: [
      "Recovered expected production levels",
      "Reduced downtime from recurring faults",
      "Established a long-term support plan",
    ],
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80",
  },
];

export const testimonials: TestimonialData[] = [
  {
    name: "Kwame Asante",
    role: "Homeowner, Takoradi",
    quote:
      "LIKTISH changed our home completely. We stopped planning life around outages, and our monthly bill dropped sharply.",
  },
  {
    name: "Abena Boateng",
    role: "Business Owner, Kumasi",
    quote:
      "The commercial proposal was practical, clearly explained, and the team executed with confidence from start to finish.",
  },
  {
    name: "Ernest Mensah",
    role: "Operations Manager, Accra",
    quote:
      "Their maintenance support stands out. LIKTISH treats performance and reliability as seriously as the installation itself.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Solomon Ali",
    role: "Founder & Lead Engineer",
    credential: "Renewable Energy Systems Specialist",
    bio: "Leads system design, client discovery, and technical delivery for projects ranging from homes to EPC-scale sites.",
  },
  {
    name: "Priscilla Mensah",
    role: "Commercial Projects Lead",
    credential: "Project Delivery & Client Success",
    bio: "Coordinates commercial and institutional delivery with a focus on communication, milestones, and operational continuity.",
  },
  {
    name: "Kweku Badu",
    role: "Service & Maintenance Supervisor",
    credential: "Diagnostics, Repairs, and Aftercare",
    bio: "Owns preventive maintenance and recovery work to keep LIKTISH systems performing over the long term.",
  },
];

export const aboutFaqs: FAQItem[] = [
  {
    question: "Where does LIKTISH work?",
    answer:
      "LIKTISH is based in Takoradi and serves residential, commercial, industrial, and institutional clients across Ghana.",
  },
  {
    question: "Is LIKTISH focused only on installations?",
    answer:
      "No. The company also provides maintenance, diagnostics, and long-term support for solar performance and reliability.",
  },
];

export const legalHighlights = {
  privacy: [
    "Forms collect only the information needed to respond to enquiries and provide quotations or system guidance.",
    "Lead and enquiry data should be stored securely and accessed only by authorized LIKTISH personnel.",
    "Users can opt out of SMS and WhatsApp follow-up communication.",
  ],
  terms: [
    "Website content is informational and does not replace a site-specific technical proposal.",
    "Savings estimates are indicative and depend on usage, system size, and site conditions.",
    "Phone calls, WhatsApp messages, and website enquiries do not become binding agreements until confirmed by LIKTISH.",
  ],
};
