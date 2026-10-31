# ClearPath marketing website

ClearPath is a digital growth agency helping businesses build reach and visibility through SEO, GEO and AEO services.

Static, multi-page website for ClearPath. Source copy and reusable styles/scripts are in this project; generated production pages are in `dist/`.

## Local build

Run `npm install` once, then `npm run dev` to build the statically rendered pages and start the local development server. Run `npm run build` to generate the deployable site in `dist/`. React powers the responsive navigation, privacy choices and page effects; page content and SEO metadata are rendered into HTML at build time so every route works as a normal link and remains crawlable.

## Hosting

The static output is configured to deploy from `dist/`. Netlify, Vercel and Cloudflare Pages can host the static files. The contact form uses Netlify Forms (`growth-audit`) and each service page uses the service-specific `service-enquiry` form when deployed on Netlify; configure notifications and spam handling for both form names and test submissions after deployment. Successful submissions redirect to `/thank-you/`. Other hosts need their own form endpoint configured before accepting live enquiries.

## Before public launch

- Replace every bracketed placeholder: phone, WhatsApp number, email, social links, domain and analytics IDs.
- Validate the indicative service and package pricing against actual delivery costs, margins and the intended market before publication.
- Confirm the legal entity, privacy notice, terms and data retention with the actual service setup.
- Connect and test both Netlify form types (`growth-audit` and `service-enquiry`) or configure an equivalent endpoint. Successful submissions redirect to `/thank-you/`, which is noindex.
- Set `CLEARPATH_ORIGIN` to the production domain before building, then connect that custom domain.
- Add only real, permissioned case studies, testimonials and outcome metrics. Remove any section that cannot be supported with verified information.
- Add analytics only after a consent mechanism is configured for the actual tags and jurisdictions. GA4, GTM and Meta Pixel placeholders are not live in this version.
- Review mobile, keyboard use, contrast and performance; run Lighthouse and validate structured data after the real domain and details are in place.

## Security and privacy

The `_headers` file includes baseline security headers. The CSP is deliberately restrictive; update it only for integrations the site actually needs. Keep HTTPS enabled and do not expose API keys in client code.

## SEO reference

See `SEO-PAGE-REFERENCE.md` for the page title, description, H1, keyword and slug inventory. Every public page includes a canonical, Open Graph/Twitter metadata and JSON-LD. `sitemap.xml` and `robots.txt` are generated with the configured origin.

## React and accessibility

This is a static-first React site: all page copy, canonical metadata and structured data are present in the generated HTML, while React handles the mobile menu, cookie-choice interface, a delayed service prompt and reduced-motion-aware card reveals. The service prompt appears after 45 seconds of active browsing, only on pages without an enquiry form, and can be dismissed; dismissal is remembered for seven days. It does not show on contact or thank-you pages. Links remain standard URLs, enquiry forms use native validation and the configured host's form handling, and keyboard navigation includes Escape dismissal, visible focus styles and a skip link.

## Service delivery workflows

Each service page documents the information and access needed to start, a four-step delivery and review process, and the concrete handover. Final scope, platform access, privacy/consent responsibilities, approvals, and any media or provider charges are agreed with the client before implementation.

## GEO and AEO services

The Answer Engine Optimization and Generative Engine Optimization service pages include scoped indicative monthly pricing, separate delivery workflows and service-specific enquiry forms. The research guide at `/journal/geo-aeo-growth-roadmap/` explains public India pricing examples, the source limitations, Google Search guidance, a forecast chart and a qualitative 2026–2028 planning roadmap. Vendor prices are self-published examples rather than an audited market average; validate ClearPath's proposed rates against delivery capacity and margins before launch. The chart clearly labels Gartner's older 2026 forecast as a forecast, not a measured outcome or GEO market-size statistic.

GEO/AEO work follows existing SEO fundamentals: crawlability, useful people-first content, accurate visible facts, accessible pages and structured data that matches what readers can see. Do not promise citations, rankings or AI answer inclusion.

## Starting a service

Every service detail page has a service-specific enquiry form with relevant project questions. It records the selected service, validates required contact and project details, and posts to Netlify Forms before redirecting to the shared thank-you page. The local preview deliberately blocks submission and displays a notice because it cannot deliver enquiries; configure a form provider and its notifications before launch.

## Page SEO inventory

| Page | Title | Meta description | H1 | Target keyword | Suggested slug |
|---|---|---|---|---|---|
| Home | Digital Growth Agency for Businesses Across India \| ClearPath | A human-led digital growth agency for Indian businesses. Connect practical SEO, paid media, conversion-ready websites and customer follow-up with clear scope and measurement. | Get found. Earn trust. Turn interest into action. | digital growth agency India | / |
| Services | Digital Marketing Services for Growth \| ClearPath Agency | Explore ClearPath services for paid ads, local SEO, websites, lead follow-up, content, answer engine optimization and generative engine optimization. | Practical marketing services, connected to growth. | digital marketing services | /services/ |
| Performance Marketing | Google Ads & Meta Ads Management \| ClearPath Agency | Google Ads and Meta campaign management focused on qualified enquiries, clean tracking and clear spend reporting. Get a practical paid media audit. | Paid media that learns from real enquiries | Google Ads management | /services/performance-marketing/ |
| Local SEO & Google Business Profile | Local SEO Services & Google Business Profile \| ClearPath | Improve local search visibility with Google Business Profile optimization, useful service pages and clear enquiry paths. Request a free local growth audit. | Be easier to find and choose nearby | local SEO services | /services/local-seo/ |
| Website & Landing Page Design | Website & Landing Page Design \| ClearPath Agency India | Build a fast, mobile-friendly website or landing page that explains your offer and makes it easy to enquire. Start with a free ClearPath audit. | Pages that make the next step easier | website design for small business | /services/websites/ |
| Email, WhatsApp & Lead Follow-Up | WhatsApp & Email Lead Follow-Up \| ClearPath Agency | Create practical WhatsApp, email and lead follow-up workflows that support timely replies for your business. Review your process with ClearPath. | Follow up with care and consistency | WhatsApp marketing automation | /services/automation/ |
| Content & Social Media Support | Content & Social Media Marketing \| ClearPath Agency | Plan useful social content that supports discovery and customer decisions. Get content support tied to your wider marketing and growth goals. | Useful content that earns attention | social media marketing services | /services/content-social/ |
| Answer Engine Optimization (AEO) | Answer Engine Optimization (AEO) Services \| ClearPath | Make important pages easier to understand across search answers with useful, accessible content and accurate structured data. No answer placement guarantees. | Make useful answers easier to find | answer engine optimization services | /services/answer-engine-optimization/ |
| Generative Engine Optimization (GEO) | Generative Engine Optimization (GEO) Services \| ClearPath | Improve the clarity, evidence and discoverability of your brand across AI-assisted search. Track citations without promising inclusion or recommendations. | Improve the evidence behind your brand | generative engine optimization services | /services/generative-engine-optimization/ |
| Industries | Growth Marketing for Local & Online Businesses \| ClearPath | Growth marketing for local businesses and online brands across India. See how ClearPath supports clinics, retail, real estate, e-commerce, SaaS and more. | Marketing support shaped around your business model. | digital marketing for local businesses | /industries/ |
| Measurement | Marketing Measurement & Reporting \| ClearPath Agency | Learn how ClearPath establishes baselines, defines useful enquiries, reports marketing activity and explains attribution limits. | Measure the work. Understand the limits. Decide what comes next. | marketing measurement and reporting | /results/ |
| Pricing | Digital Marketing Packages & Pricing \| ClearPath in India | Compare indicative ClearPath fees for paid media, local SEO, websites, lead follow-up, content, AEO and GEO. Review scope and request a tailored proposal. | Clear scope. Clear fees. A plan that fits. | digital marketing cost for a small business | /pricing/ |
| About | About ClearPath \| Transparent Growth Agency in India | Meet ClearPath, a growth agency serving businesses across India with measurable work, done-for-you marketing support and transparent reporting. | Clear work for meaningful growth. | performance marketing agency | /about/ |
| Journal | Digital Marketing Journal & Guides \| ClearPath Agency | Read practical guides to local SEO, Google Ads, website design and digital marketing costs for small businesses. Find a clear next step with ClearPath. | Useful marketing guidance for your next decision. | digital marketing resources | /journal/ |
| Contact | Free Growth Audit \| Contact ClearPath Agency | Request a free marketing growth audit from ClearPath. Share your business goals and we’ll review practical opportunities for leads, SEO and conversion. | Tell us what you want to grow. | free digital marketing audit | /contact/ |
| Privacy Policy | Privacy Policy for ClearPath Growth Agency \| India | Learn how ClearPath handles enquiry details, website analytics and privacy choices. Find contact details and request access, correction or deletion. | Privacy Policy | ClearPath privacy policy | /privacy/ |
| Terms | Website Terms of Use \| ClearPath Growth Agency India | Read ClearPath website terms on marketing information, third-party services, intellectual property and outcomes. Contact us with questions today. | Website Terms of Use | ClearPath terms of use | /terms/ |
| Thank You | Growth Audit Request Received \| ClearPath Agency | Thanks, your enquiry has been received. We will review your details and get back to you shortly. | Thanks for reaching out. | growth audit request | /thank-you/ |
| 404 | Page Not Found \| ClearPath Growth Agency | The page you requested could not be found. Return to ClearPath to explore marketing services, practical guides and a free growth audit. | This path needs a new direction. | 404 | /404.html |
| Journal Article | Small Business Digital Marketing Cost \| ClearPath Guide | Learn how to plan a small business digital marketing budget by separating service fees, ad spend, software and creative costs. Read the ClearPath guide. | How much does digital marketing cost for a small business? | digital marketing cost for a small business | /journal/digital-marketing-cost-small-business/ |
| Journal Article | Local SEO Checklist for Small Businesses \| ClearPath | Use this local SEO checklist to review your business profile, website, contact details, reviews and enquiry path. Read the practical guide from ClearPath. | A local SEO checklist for small businesses | local SEO checklist for small businesses | /journal/local-seo-checklist/ |
| Journal Article | How to Get More Google Ads Leads \| ClearPath Guide | Improve Google Ads leads by reviewing search intent, landing pages, conversion tracking and follow-up. Use this practical guide from ClearPath. | How to get more leads from Google Ads | how to get more leads from Google Ads | /journal/more-leads-from-google-ads/ |
| Journal Article | GEO and AEO in India: Pricing, SEO Guidance and Roadmap \| ClearPath | A sourced guide to GEO and AEO services, public India pricing examples, compliant SEO practices, measurement limits and a practical 2026–2028 roadmap. | GEO and AEO in India: a practical growth roadmap | GEO and AEO services India | /journal/geo-aeo-growth-roadmap/ |
