import {
    FileText,
    ExternalLink,
  } from "lucide-react";


import angloinfo from '../assets/img/angloinfo.png'
import pragmanila from '../assets/img/pragmanila.png'
import ubp from '../assets/img/ubp.png'
import stok from '../assets/img/stok.jpg'
import wgp from '../assets/img/wgp.jpg'
import ipay from '../assets/img/ipay.jpeg'

function Experience({ CONFIG }) {
    const jobs = [
        {
            intro: "Built and led a software consultancy Firm",
            industry: 'Software Development Executive',
            description: "Founded and scaled a software consultancy over 12 years — leading teams of engineers, architecting full-stack solutions in Django and React, and growing client partnerships across multiple industries.",
            dates: "12 Years",
            title: "CEO and CTO",
            company: "Pragmanila Solutions Inc.",
            image: pragmanila,
        },
        {
            intro: "Shipped fintech APIs under compliance",
            industry: "Backend API Development",
            description: "Developed and maintained backend APIs for one of the Philippines’ largest banks, working within strict BSP regulatory and security compliance frameworks in a high-velocity fintech environment.",
            dates: "5 Years",
            title: "Change Manager / API Developer",
            company: "Unionbank of the Philippines",
            image: ubp,
        },
        {
            intro: "Full-stack lead for a high-traffic international portal",
            industry: "Full Stack Web Development",
            description: "Led a team of senior developers building and maintaining a high-traffic, multi-region web portal — balancing hands-on engineering with technical leadership and cross-team coordination.",
            dates: "8 Years",
            title: "Software Engineer",
            company: "Angloinfo Ltd.",
            image: angloinfo,
        },
        {
            intro: "Versatile Front End Specialist",
            industry: "Front End Web Development",
            description: "From software development to CTO and CEO, I’ve led innovation, architecture, mentorship, and corporate vision to build impactful tech and business growth.",
            dates: "2 Years",
            title: "Senior Front End Specialist",
            company: "The Coapperative",
            image: "http://",
            hide: true
        },
        {
            intro: "Frontend specialist across a decade of shifting standards",
            industry: "Front End Web Development",
            description: "Evolved through major frontend paradigm shifts — from table-less markup and CSS floats to component-driven development with React — delivering polished, performant interfaces throughout.",
            dates: "2 Years",
            title: "Senior Front End Developer",
            company: "Stok Media AB",
            image: stok,
        },
        {
            intro: "Built SEO-driven web and mobile products",
            industry: "Application Development",
            description: "Designed and developed web applications and mobile apps for affiliate marketing platforms, with a strong focus on search engine optimisation strategies that directly drove business revenue.",
            dates: "3 Years",
            title: "Lead Front End Developer",
            company: "Web Guide Partner",
            image: wgp,
        },
        {
            intro: "Technical compliance manager for fintech dev tools",
            industry: "Technical Project Management",
            description: "Owned technical documentation and compliance delivery for a fintech company building developer-facing software tools — bridging engineering teams and regulatory requirements with precision.",
            dates: "3 Years",
            title: "Senior Technical Project Manager",
            company: "iPayment Solutions",
            image: ipay,
        },
    ];

    return (
        <div className="bg-green-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-52">
                <div className="">
                <span className="mb-2 block text-sm font-semibold text-orange-400">My Career in a Nutshell</span>
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Experience</h2>
                    <p className="mt-2 text-lg/8 text-gray-300">From early code to CTO — a 20-year journey where technology grows like grass: rooted in fundamentals, spreading through systems, and continuously evolving across frontend craft, fintech, and leadership.</p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-none sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                
                {jobs.map((job, i) => (
                    <div key={i} className={job.hide? 'hidden': ''}>
                        <article className="flex max-w-xl flex-col items-start justify-between bg-stone-950 p-5 after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl after:sm:rounded-3xl">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time className="text-gray-400">{job.industry}</time>
                                <span className="rounded-full bg-gray-800/60 px-3 py-1.5 font-medium text-gray-300">{job.dates}</span>
                            </div>
                            <div className="grow">
                                <h3 className="mt-3 text-lg/6 font-semibold text-white">{job.intro}</h3>
                                <p className="mt-5 text-sm/6 text-slate-300">{job.description}</p>
                            </div>
                            <div className="mt-8 flex items-center gap-x-4">
                                <img src={job.image} alt={job.company} className="size-10 rounded-full bg-gray-800" />
                                <div className="text-sm/6">
                                    <p className="font-semibold text-white">{job.title}</p>
                                    <p className="text-slate-400">{job.company}</p>
                                </div>
                            </div>
                        </article>

                    </div>
                ))}

                </div>

                {/* Full CV CTA */}
                <div className="mt-16 flex justify-center">
                    <a
                        href={CONFIG?.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-md bg-transparent border-2 border-orange-400 px-8 py-4 text-sm font-semibold text-orange-400 hover:bg-orange-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 transition-colors"
                    >
                        <FileText size={18} />
                        Request for a Full Work History
                        <ExternalLink size={14} className="opacity-60" />
                    </a>
                </div>

            </div>
        </div>
    );
  }

  export default Experience