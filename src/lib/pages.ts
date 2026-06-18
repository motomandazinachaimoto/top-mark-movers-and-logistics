// Shared page content for all secondary pages.
// Each page is rendered by <ContentPage /> using this structured data.

export type PageFeature = { title: string; desc: string; bullets?: string[] };
export type PageBlock = {
  kind: "features" | "highlight" | "checklist" | "stats";
  eyebrow?: string;
  heading?: string;
  intro?: string;
  light?: boolean; // render on white surface
  items?: PageFeature[];
  bullets?: string[];
  stats?: { value: string; label: string }[];
};

export type PageContent = {
  slug: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  blocks: PageBlock[];
};

const QUOTE_CTA = { label: "Get Your Free Quote", href: "/quote" };
const CALL_CTA = { label: "Call 0715 729 441", href: "tel:+254715729441" };

export const PAGES: Record<string, PageContent> = {
  about: {
    slug: "about",
    eyebrow: "Corporate Profile",
    title: "Moving Kenya forward,",
    titleAccent: "one shipment at a time.",
    lede:
      "Topmark Movers and Logistics is an asset-heavy operator engineering premium relocations and end-to-end supply chains across 47 counties and 80+ global trade lanes. We pair audited safety with a 24/7 control tower so operators who can't afford delays never have to.",
    ctaPrimary: QUOTE_CTA,
    ctaSecondary: { label: "Meet our network", href: "/coverage" },
    blocks: [
      {
        kind: "features",
        eyebrow: "Mission & Vision",
        heading: "Built for operators who can't afford delays.",
        light: true,
        items: [
          { title: "Our Mission", desc: "Deliver the predictability of an in-house logistics team with the reach of a global 3PL — for every household, SME and enterprise we serve." },
          { title: "Our Vision", desc: "To be East Africa's most trusted asset-heavy mover, recognized globally for safety, transparency and on-time performance." },
          { title: "Our Values", desc: "Safety first. Customer obsession. Operational rigor. Carbon-aware growth. Family-grade care for every box and pallet." },
        ],
      },
      {
        kind: "stats",
        eyebrow: "By the numbers",
        heading: "A scale that operators rely on.",
        stats: [
          { value: "47/47", label: "Kenyan Counties Served" },
          { value: "150+", label: "Active Fleet Assets" },
          { value: "12K+", label: "Successful Moves" },
          { value: "99.4%", label: "On-Time Delivery" },
        ],
      },
      {
        kind: "checklist",
        eyebrow: "Compliance",
        heading: "Audited, insured, accountable.",
        bullets: [
          "ISO 9001 (Quality Management) & ISO 28000 (Supply-Chain Security) certified",
          "Lloyd's-underwritten Goods in Transit cover up to USD 50M",
          "NTSA-compliant fleet with monthly safety inspections",
          "ERC-licensed petroleum transport (where applicable)",
          "Defensive-driving certified drivers, vetted packing crews",
        ],
      },
    ],
  },

  quote: {
    slug: "quote",
    eyebrow: "Get a Free Quote",
    title: "Tell us what to move —",
    titleAccent: "we'll price it in minutes.",
    lede:
      "Our smart quote wizard runs against live fleet capacity, lane pricing and crew availability. You'll get a binding estimate, not a guess.",
    ctaPrimary: { label: "Start the Wizard", href: "/#quote" },
    ctaSecondary: CALL_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "How it works",
        heading: "Four steps. Honest pricing.",
        light: true,
        items: [
          { title: "1 · Route", desc: "Tell us origin, destination and access constraints (lifts, stairs, gated estates)." },
          { title: "2 · Payload", desc: "Pick a profile — studio, 3-bed, office floor, container, or custom inventory." },
          { title: "3 · Services", desc: "Add packing, crating, mounting, insurance uplift and storage as needed." },
          { title: "4 · Confirm", desc: "Receive a binding quote, lock the date, and meet your dedicated move coordinator." },
        ],
      },
      {
        kind: "checklist",
        eyebrow: "What's always included",
        heading: "No surprise line items.",
        bullets: [
          "Free pre-move survey for jobs over KES 30,000",
          "Furniture dismantling & reassembly at destination",
          "Floor & doorway protection at both addresses",
          "GIT insurance on every consignment as standard",
          "Dedicated move coordinator with WhatsApp updates",
        ],
      },
    ],
  },

  "services-index": {
    slug: "services",
    eyebrow: "Service Catalog",
    title: "End-to-end logistics,",
    titleAccent: "engineered for every cargo.",
    lede:
      "From a single studio move in Kilimani to a multi-leg ocean-to-factory program, we run the asset, the crew and the control tower.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "Moving & Relocation",
        heading: "B2C & B2B Moves",
        light: true,
        items: [
          { title: "Residential House Moving", desc: "Full packing, dismantling and home setup. Available at /services/residential." },
          { title: "Office & Corporate Relocations", desc: "Minimal downtime, secure IT & file handling. /services/office" },
          { title: "Premium Packing & Crating", desc: "Heavy-duty materials and custom crates. /services/packing" },
          { title: "Mounting & Handyman", desc: "TVs, art, mirrors, shelving on arrival. /services/mounting" },
        ],
      },
      {
        kind: "features",
        eyebrow: "Road Freight & Haulage",
        heading: "Commercial transport",
        items: [
          { title: "Full Truckload (FTL)", desc: "Dedicated asset, fastest transit. /freight/ftl" },
          { title: "LTL & Groupage", desc: "Consolidated freight, lower cost. /freight/ltl" },
          { title: "Truck Hire & Fleet Rental", desc: "Canters, open trucks, box bodies for lease. /freight/truck-hire" },
          { title: "Petroleum & Bulk Liquid", desc: "ERC-licensed tanker transport. /freight/petroleum" },
          { title: "Industrial Supply Chain", desc: "Port-to-factory raw materials. /freight/industrial" },
        ],
      },
      {
        kind: "features",
        eyebrow: "Global Freight Forwarding",
        heading: "Intermodal & specialized",
        light: true,
        items: [
          { title: "Ocean Freight (FCL / LCL)", desc: "Door-to-door global container logistics. /global/ocean" },
          { title: "Air Cargo", desc: "Expedited international transit for time-critical cargo. /global/air" },
          { title: "Cold Chain", desc: "Pharma, perishables, temperature-controlled. /global/cold-chain" },
          { title: "Project & OOG Cargo", desc: "Heavy haul for oversized industrial equipment. /global/project-cargo" },
        ],
      },
    ],
  },

  "services-residential": {
    slug: "services/residential",
    eyebrow: "Residential",
    title: "Premium house moves,",
    titleAccent: "without the chaos.",
    lede:
      "From studios in Kileleshwa to family homes in Karen — we pack, dismantle, transport, reassemble and set up your new place so you can sleep in your own bed on day one.",
    ctaPrimary: QUOTE_CTA,
    ctaSecondary: CALL_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "What's included",
        heading: "End-to-end household care",
        light: true,
        items: [
          { title: "Pre-move survey", desc: "On-site or video walkthrough to lock scope and avoid surprises." },
          { title: "Full pack & unpack", desc: "Heavy-duty cartons, bubble wrap, picture boxes and wardrobe boxes." },
          { title: "Furniture dismantling", desc: "Beds, wardrobes, modular sofas — disassembled and reassembled at destination." },
          { title: "Mounting & set-up", desc: "TVs, mirrors, curtain rods and art remounted day-of-move." },
        ],
      },
      {
        kind: "checklist",
        eyebrow: "Safety & care",
        heading: "Your home, handled with respect.",
        bullets: [
          "Floor and doorway protection at both addresses",
          "Vetted, uniformed crews with photo ID",
          "Goods in Transit insurance included",
          "Dedicated coordinator with live updates",
        ],
      },
    ],
  },

  "services-office": {
    slug: "services/office",
    eyebrow: "Corporate",
    title: "Office relocations,",
    titleAccent: "with zero downtime.",
    lede:
      "We move whole floors over a weekend — servers, desks, files and people — and have you trading from the new address by Monday 8am.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "Why enterprises pick us",
        heading: "Operational continuity by design",
        light: true,
        items: [
          { title: "IT & server moves", desc: "Power-down protocols, anti-static crates, on-site re-rack and cable management." },
          { title: "Records & files", desc: "Sequenced, sealed and chain-of-custody tracked from cabinet to cabinet." },
          { title: "Phased migration", desc: "Department-by-department schedule mapped to your business hours." },
          { title: "Project manager", desc: "Single point of accountability for HR, IT and Facilities stakeholders." },
        ],
      },
      {
        kind: "checklist",
        heading: "Standard inclusions",
        bullets: [
          "After-hours and weekend execution",
          "Numbered crate program with online manifest",
          "Workstation reassembly & PC reconnection",
          "Confidential document handling under NDA",
        ],
      },
    ],
  },

  "services-packing": {
    slug: "services/packing",
    eyebrow: "Packing & Crating",
    title: "Museum-grade packing for",
    titleAccent: "your most fragile cargo.",
    lede:
      "From porcelain heirlooms to gallery-grade art, we engineer custom protection so the only thing that arrives is the piece itself.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "Materials & methods",
        light: true,
        items: [
          { title: "Heavy-duty cartons", desc: "Double-wall corrugated boxes rated for 30kg+ stacking." },
          { title: "Custom wooden crates", desc: "Built to spec for chandeliers, sculptures and lab equipment." },
          { title: "Fine-art handling", desc: "Glassine wrap, corner blocks, soft-foam interleaves and climate-stable packing." },
          { title: "Specialty wraps", desc: "Anti-static for electronics, food-grade for kitchenware, ESD bags for hardware." },
        ],
      },
    ],
  },

  "services-mounting": {
    slug: "services/mounting",
    eyebrow: "Handyman",
    title: "Mounting, fitting,",
    titleAccent: "and final detailing.",
    lede:
      "The premium touch most movers skip — we remount your TVs, art, mirrors and shelving at the destination, so the new place feels like home before we drive away.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "TV wall-mounting", desc: "Stud-finding, cable concealment and tilt/full-motion brackets." },
          { title: "Art & mirror hanging", desc: "Laser-leveled, anchor-rated for plaster, drywall and concrete." },
          { title: "Curtain & blind installation", desc: "Rods, tracks and blackout fittings cut and mounted on-site." },
          { title: "Light fixture & shelving", desc: "Pendants, picture lights and floating shelves installed by certified crew." },
        ],
      },
    ],
  },

  "freight-ftl": {
    slug: "freight/ftl",
    eyebrow: "Road Freight",
    title: "Full Truckload (FTL):",
    titleAccent: "your cargo, your truck.",
    lede:
      "A dedicated asset from pickup to delivery — single touchpoint, fastest transit and the highest cargo security profile we offer on Kenyan and EAC roads.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "Why FTL",
        light: true,
        items: [
          { title: "Dedicated asset", desc: "One vehicle, one consignment — no co-loading, no consolidation handling." },
          { title: "Fastest transit", desc: "Direct routing with no intermediate stops or terminal dwell." },
          { title: "High security", desc: "Sealed, GPS-tracked, with optional armed escort for high-value moves." },
          { title: "Flexible equipment", desc: "Canters, tautliners, flatbeds, refrigerated and side-loaders." },
        ],
      },
    ],
  },

  "freight-ltl": {
    slug: "freight/ltl",
    eyebrow: "Road Freight",
    title: "LTL & Groupage:",
    titleAccent: "pay only for what you ship.",
    lede:
      "Consolidate smaller cargo with other shippers on our scheduled lanes between Nairobi, Mombasa, Kisumu, Eldoret and beyond — and unlock significant cost savings.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "Daily scheduled lanes", desc: "Predictable departures on Kenya's busiest commercial corridors." },
          { title: "Pallet & parcel rates", desc: "Transparent pricing by volume, weight or pallet position." },
          { title: "Hub & spoke network", desc: "Cross-dock terminals in Nairobi and Mombasa for fast turnaround." },
          { title: "Full visibility", desc: "Tracked from booking to PoD — even on shared trucks." },
        ],
      },
    ],
  },

  "freight-petroleum": {
    slug: "freight/petroleum",
    eyebrow: "Bulk Liquid",
    title: "Petroleum & liquid bulk —",
    titleAccent: "moved under license, safely.",
    lede:
      "ERC-licensed tanker operations for fuel marketers, energy clients and chemical producers — engineered around safety, traceability and compliance.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "Safety architecture",
        light: true,
        items: [
          { title: "Licensed tankers", desc: "Calibrated, bottom-loaded units compliant with EPRA standards." },
          { title: "Hazmat-trained drivers", desc: "Defensive-driving and IATA-DGR certified with annual refresh." },
          { title: "Real-time telemetry", desc: "GPS, geofencing, harsh-braking alerts and route deviation flags." },
          { title: "Spill response", desc: "On-board kits and a 24/7 incident desk with one-hour SLA." },
        ],
      },
      {
        kind: "checklist",
        heading: "Cargo profiles handled",
        bullets: [
          "Petrol, diesel, kerosene and JetA1",
          "Bitumen and heavy fuel oils",
          "Industrial lubricants and base oils",
          "Approved bulk chemicals (case-by-case)",
        ],
      },
    ],
  },

  "freight-industrial": {
    slug: "freight/industrial",
    eyebrow: "Supply Chain",
    title: "Industrial raw materials,",
    titleAccent: "port to factory floor.",
    lede:
      "Dedicated port-to-plant programs for manufacturers — predictable, sequenced and accountable inbound logistics that keep your lines running.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "Port pickup & clearance", desc: "Coordinated with your CFA for fast container release from Mombasa." },
          { title: "Just-in-time scheduling", desc: "Deliveries synced to production windows, not the other way around." },
          { title: "Dedicated fleet pool", desc: "Reserved capacity so your trucks never compete on the spot market." },
          { title: "KPI reporting", desc: "Monthly dashboards on OTIF, dwell, demurrage and cost-per-tonne." },
        ],
      },
    ],
  },

  "global-ocean": {
    slug: "global/ocean",
    eyebrow: "Ocean Freight",
    title: "Ocean freight,",
    titleAccent: "FCL & LCL, door-to-door.",
    lede:
      "Direct allocations with MSC, Maersk and CMA CGM. We handle origin pickup, export clearance, ocean carriage, destination clearance and final-mile delivery — on a single bill of lading.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "Capabilities",
        light: true,
        items: [
          { title: "FCL allocations", desc: "20', 40' GP, HC and reefer slots on East Africa's busiest lanes." },
          { title: "LCL consolidations", desc: "Weekly cross-dock consolidations ex-Shanghai, Dubai and Rotterdam." },
          { title: "Customs brokerage", desc: "Licensed CFA team handling KRA, KEBS and KPA processes end-to-end." },
          { title: "Door-to-door control", desc: "One operator, one invoice, one ETA — for the whole journey." },
        ],
      },
    ],
  },

  "global-air": {
    slug: "global/air",
    eyebrow: "Air Cargo",
    title: "Air cargo for",
    titleAccent: "time-critical movements.",
    lede:
      "When delay isn't an option — Emirates SkyCargo, Qatar Cargo and Kenya Airways partnerships put your shipment on the next available wide-body.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "Express & general air", desc: "Next-flight-out, deferred and consolidated air options." },
          { title: "Charter & on-board courier", desc: "Dedicated lift or hand-carry for critical spares and live samples." },
          { title: "Dangerous goods", desc: "IATA-DGR certified team for batteries, chemicals and pharma." },
          { title: "Bonded handling", desc: "Customs-bonded pickup, screening and delivery into JKIA / Eldoret." },
        ],
      },
    ],
  },

  "global-coldchain": {
    slug: "global/cold-chain",
    eyebrow: "Temperature Controlled",
    title: "Cold chain logistics,",
    titleAccent: "engineered for integrity.",
    lede:
      "Validated reefer corridors for pharmaceuticals, biotech, fresh produce and dairy — with continuous temperature telemetry from origin to destination.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "Multi-zone reefers", desc: "Frozen (-20°C), chilled (2–8°C) and ambient (15–25°C) controlled units." },
          { title: "Live telemetry", desc: "Per-shipment temperature logs accessible in real time, archived for audit." },
          { title: "Pharma-grade SOPs", desc: "GDP-aligned operating procedures with deviation reporting." },
          { title: "Last-mile cold", desc: "Cold-room cross-docks and refrigerated final-mile vans." },
        ],
      },
    ],
  },

  "global-project": {
    slug: "global/project-cargo",
    eyebrow: "Project & OOG",
    title: "Project cargo &",
    titleAccent: "out-of-gauge logistics.",
    lede:
      "Generators, transformers, mining equipment and wind components — moved by engineers, not just drivers. Route surveys, permits and lifting plans included.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "Route survey", desc: "Bridge clearances, turning radii and overhead lines mapped before dispatch." },
          { title: "Permits & escorts", desc: "KeNHA abnormal-load permits and police escort coordination." },
          { title: "Specialized equipment", desc: "Low-loaders, extendable trailers, hydraulic axles and mobile cranes." },
          { title: "Lift planning", desc: "Method statements and RAMS for every pick and set-down." },
        ],
      },
    ],
  },

  fleet: {
    slug: "fleet",
    eyebrow: "Our Fleet",
    title: "150+ assets,",
    titleAccent: "all owned, all audited.",
    lede:
      "We don't broker your cargo to the spot market. Every vehicle on the road for you is on our books, on our maintenance schedule and on our telematics platform.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "Asset categories",
        light: true,
        items: [
          { title: "Light commercial vans", desc: "1T–3T closed vans for parcel and last-mile work." },
          { title: "Canters & box bodies", desc: "3.5T–7T mid-size units — the backbone of our urban moves." },
          { title: "Prime movers & trailers", desc: "10–40T tractor units with curtain-sider, flatbed and skeletal options." },
          { title: "Specialty units", desc: "Reefers, tankers, low-loaders and crane-mounted trucks." },
        ],
      },
      {
        kind: "checklist",
        heading: "Fleet standards",
        bullets: [
          "Monthly NTSA inspections + weekly internal checks",
          "GPS telemetry and dashcams on every vehicle",
          "Average fleet age under 4 years",
          "Euro IV+ emission standards on long-haul units",
        ],
      },
    ],
  },

  coverage: {
    slug: "coverage",
    eyebrow: "Network & Coverage",
    title: "47 counties.",
    titleAccent: "One operator.",
    lede:
      "From Lamu to Lokichogio, Mombasa to Malaba — and onwards across Uganda, Tanzania, Rwanda, Burundi, DRC and South Sudan via the Northern and Central corridors.",
    ctaPrimary: QUOTE_CTA,
    blocks: [
      {
        kind: "features",
        eyebrow: "Regional hubs",
        light: true,
        items: [
          { title: "Nairobi HQ", desc: "Industrial Area control tower, cross-dock and admin." },
          { title: "Mombasa Port", desc: "Container yard, CFS partners and bonded warehousing." },
          { title: "Kisumu & Eldoret", desc: "Western Kenya forward bases for inland & cross-border work." },
          { title: "Cross-border desks", desc: "Malaba, Busia, Namanga, Lunga Lunga and Isebania." },
        ],
      },
      {
        kind: "stats",
        heading: "Regional reach",
        stats: [
          { value: "47/47", label: "Kenyan counties" },
          { value: "6", label: "EAC countries served" },
          { value: "5", label: "Border posts staffed" },
          { value: "80+", label: "Global trade lanes" },
        ],
      },
    ],
  },

  careers: {
    slug: "careers",
    eyebrow: "Careers",
    title: "Join the crew that",
    titleAccent: "moves Kenya.",
    lede:
      "We're always looking for vetted drivers, experienced packers, logistics coordinators and control-tower operators. If you take pride in showing up and finishing the job, we want to meet you.",
    ctaPrimary: { label: "Email your CV", href: "mailto:careers@topmark.co" },
    blocks: [
      {
        kind: "features",
        eyebrow: "Open roles",
        light: true,
        items: [
          { title: "Long-haul Drivers (Class CE)", desc: "EAC routes, dedicated trucks, performance bonus." },
          { title: "Packing & Crating Crew", desc: "Full-time and surge crews for residential and commercial moves." },
          { title: "Move Coordinators", desc: "Customer-facing operators owning quote-to-delivery." },
          { title: "Control-Tower Dispatch", desc: "24/7 ops desk — telemetry, ETA management, incident handling." },
        ],
      },
      {
        kind: "checklist",
        heading: "What we offer",
        bullets: [
          "Above-market base + performance bonuses",
          "Medical cover for you and dependents",
          "Defensive-driving and forklift certifications paid for",
          "Clear promotion path from crew to coordinator to manager",
        ],
      },
    ],
  },

  blog: {
    slug: "blog",
    eyebrow: "Knowledge",
    title: "Topmark Insights",
    lede:
      "Industry analysis, household moving checklists, commercial supply-chain tips and Topmark announcements.",
    blocks: [
      {
        kind: "features",
        eyebrow: "Featured",
        light: true,
        items: [
          { title: "The 30-day moving checklist", desc: "What to do four weeks, two weeks and 24 hours before move day." },
          { title: "FTL vs LTL: a cost calculator for Kenyan SMEs", desc: "When dedicated capacity actually pays for itself." },
          { title: "Cold-chain in East Africa: 2026 outlook", desc: "What pharma and agri shippers should plan for next quarter." },
          { title: "Cross-border tips: Malaba & Busia", desc: "Documents, dwell times and how to avoid demurrage." },
        ],
      },
    ],
  },

  contact: {
    slug: "contact",
    eyebrow: "Talk to us",
    title: "We answer the phone.",
    titleAccent: "Even on Sunday.",
    lede:
      "Our 24/7 control tower is staffed by humans who can dispatch a truck, re-route a shipment or escalate an incident — without a chatbot in the way.",
    ctaPrimary: CALL_CTA,
    ctaSecondary: { label: "Email Operations", href: "mailto:operations@topmark.co" },
    blocks: [
      {
        kind: "features",
        eyebrow: "Channels",
        light: true,
        items: [
          { title: "24/7 Hotline", desc: "+254 715 729 441 — dispatch, incidents, ETA queries." },
          { title: "Operations Email", desc: "operations@topmark.co — quotes, bookings, documentation." },
          { title: "WhatsApp Business", desc: "Same number — photos of cargo and locations welcome." },
          { title: "Head Office", desc: "Industrial Area, Nairobi · Mon–Sat 8am–6pm walk-ins." },
        ],
      },
    ],
  },

  "legal-terms": {
    slug: "legal/terms",
    eyebrow: "Legal",
    title: "Terms of Service",
    lede:
      "These terms govern your use of Topmark Movers and Logistics services. By booking a job with us, you agree to the conditions below. This page is maintained by Topmark and is not a substitute for the signed service agreement covering enterprise contracts.",
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "Scope of service", desc: "We provide packing, transport, warehousing and forwarding services as agreed in your signed quote or master service agreement." },
          { title: "Booking & cancellation", desc: "Confirmed bookings may be rescheduled up to 48 hours before pickup at no charge. Late cancellations incur a 25% mobilization fee." },
          { title: "Liability", desc: "Liability is capped per consignment as specified in your service agreement and is supplemented by our Goods in Transit insurance." },
          { title: "Acceptable cargo", desc: "We do not transport illegal goods, undeclared hazardous materials, live animals (outside dedicated programs), or cash." },
        ],
      },
    ],
  },

  "legal-privacy": {
    slug: "legal/privacy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    lede:
      "How Topmark collects, uses and protects your personal data under the Kenya Data Protection Act, 2019. This page is maintained by Topmark to answer common privacy questions about our services.",
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "What we collect", desc: "Contact details, pickup/delivery addresses, cargo descriptions, and payment information necessary to deliver the service you booked." },
          { title: "How we use it", desc: "To deliver and improve our services, communicate about your booking, handle incidents and meet regulatory obligations." },
          { title: "Who we share with", desc: "Only with subprocessors essential to fulfilling your booking (insurance, customs, banking) under written confidentiality." },
          { title: "Your rights", desc: "Access, correction, deletion and objection requests can be sent to privacy@topmark.co and are actioned within 30 days." },
        ],
      },
    ],
  },

  "legal-insurance": {
    slug: "legal/insurance",
    eyebrow: "Legal",
    title: "Goods in Transit Insurance",
    lede:
      "Every consignment Topmark moves is covered by Goods in Transit (GIT) insurance as standard. This page summarizes how coverage works; the binding terms are in your insurer-issued certificate.",
    blocks: [
      {
        kind: "features",
        light: true,
        items: [
          { title: "Standard cover", desc: "Loss, damage and theft during transit, packing and short-term storage incidental to the move." },
          { title: "Limits", desc: "Default liability limits apply per consignment; uplifts to USD 50M per shipment are available on request." },
          { title: "Exclusions", desc: "Pre-existing damage, undeclared high-value items, inherent vice (e.g. perishables out of cold chain) and war risks." },
          { title: "Claims", desc: "Notify us within 7 days of delivery with photographs and the consignment number. We handle the insurer interaction end-to-end." },
        ],
      },
    ],
  },
};
