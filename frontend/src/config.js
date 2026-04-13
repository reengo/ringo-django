import logo from './assets/img/logo-ringo-pad.png';

export const sections = [
  { id: "skills",     label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "blog",       label: "Blog" },
  { id: "profile",    label: "Profile" },
  { id: "contact",    label: "Contact" },
];

export const CONFIG = {
  name: 'Ringo!',
  logoPath: logo,
  role: 'Chief Technology Officer',
  headline: '20+ years building software — from table-less CSS to React, from engineer to CEO. I architect scalable systems, lead engineering teams, and turn technical vision into shipped products.',
  targetEmail: process.env.REACT_APP_EMAIL_SERVICE,
  emailJS: {
    serviceId:  process.env.REACT_APP_EMAIL_APP_ID,
    templateId: process.env.REACT_APP_EMAIL_TEMPLATE,
    publicKey:  process.env.REACT_APP_EMAIL_PUBLIC_KEY,
  },
  cvLink: process.env.REACT_APP_CV_LINK,
  socials: {
    github:    process.env.REACT_APP_SOCIALS_GITHUB,
    linkedin:  process.env.REACT_APP_SOCIALS_LINKEDIN,
    instagram: process.env.REACT_APP_SOCIALS_INSTAGRAM,
    x:         process.env.REACT_APP_SOCIALS_X,
  },
  colors: {
    primary:     "#247A3B",
    accent:      "#FF8C2D",
    neutral:     "#FFFFFF",
    darkNeutral: "#0f172a",
    darkText:    "#f8fafc",
  },
};
