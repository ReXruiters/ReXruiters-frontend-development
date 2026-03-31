// ---- Jobs, companies, activities, profile seed data ----
export const initialJobs = [
  {
    id: 1, title: "Senior Frontend Developer", level: "Senior Level", location: "Bangalore",
    mode: "Hybrid", date: "Jan 20, 2026", status: "Published", skills: ["React","TypeScript","Tailwind CSS"],
    applicants: 4, shortlisted: 1,
    description: `## Senior Frontend Developer

**Location:** Bangalore · Hybrid
**Level:** Senior (5+ years)

### About the Role
We are looking for a Senior Frontend Developer to join our engineering team...`,
    assessment: `## Assessment Plan — Senior Frontend Developer

### Round 1: Screening (30 min)
1. Walk me through your experience with React and TypeScript.
...`,
    candidates: [
      { id:1, name:"Priya Sharma", location:"Bangalore", currentCTC:"₹15.0L", expectedCTC:"₹20.0L", notice:"30 days", score:87, hireability:"89 - Strong Fit", status:"Completed" },
      { id:2, name:"Rahul Verma", location:"Delhi", currentCTC:"₹16.0L", expectedCTC:"₹22.0L", notice:"60 days", score:78, hireability:"81 - Strong Fit", status:"Completed" },
      { id:3, name:"Ananya Iyer", location:"Bangalore", currentCTC:"₹18.0L", expectedCTC:"₹24.0L", notice:"15 days", score:94, hireability:"95 - Strong Fit", status:"Shortlisted" },
      { id:4, name:"Neha Kapoor", location:"Pune", currentCTC:"₹14.0L", expectedCTC:"₹19.0L", notice:"45 days", score:72, hireability:"74 - Potential Fit", status:"Completed" },
    ]
  },
  {
    id: 2, title: "Product Designer", level: "Mid Level", location: "Mumbai",
    mode: "Remote", date: "Jan 25, 2026", status: "Published", skills: ["Figma","UI/UX Design","Prototyping"],
    applicants: 1, shortlisted: 0,
    description: `## Product Designer

**Location:** Mumbai · Remote
**Level:** Mid Level (3+ years)

### About the Role
Looking for a creative Product Designer...`,
    assessment: null,
    candidates: [
      { id:5, name:"Vikram Singh", location:"Mumbai", currentCTC:"₹12.0L", expectedCTC:"₹18.0L", notice:"30 days", score:65, hireability:"68 - Potential Fit", status:"Completed" },
    ]
  }
];

export const companies = [
  { name:"Acme Corp", email:"admin@acme.com", color:"bg-blue-500", jobs:12, initials:"AC" },
  { name:"TechVision Solutions", email:"hr@techvision.io", color:"bg-purple-500", jobs:8, initials:"TV" },
  { name:"Global Innovations Inc", email:"talent@globalinno.com", color:"bg-green-500", jobs:15, initials:"GI" },
  { name:"StartupHub Ventures", email:"recruiting@startuphub.com", color:"bg-red-400", jobs:5, initials:"SH" },
  { name:"Enterprise Systems Ltd", email:"careers@enterprise-sys.com", color:"bg-orange-500", jobs:18, initials:"ES" },
  { name:"Digital Wave Technologies", email:"jobs@digitalwave.tech", color:"bg-teal-500", jobs:12, initials:"DW" },
];

export const recentActivities = [
  { text:"Ananya Iyer completed assessment", time:"2 hours ago", color:"bg-green-500" },
  { text:"New application for Product Designer", time:"5 hours ago", color:"bg-blue-500" },
  { text:"Rahul Verma submitted profile", time:"1 day ago", color:"bg-blue-500" },
];

export const companyProfile = {
  name:"Acme Corp", industry:"Technology", size:"50-200 employees", founded:"Founded 2015",
  about:"Acme Corp is a leading technology company specializing in innovative software solutions...",
  location:"Bangalore, India", website:"https://acmecorp.com", email:"admin@acme.com", phone:"+91 98765 43210",
  perks:["Health Insurance","Flexible Hours","Remote Work","Learning Budget","Stock Options"],
  stats:{ jobsPosted:12, totalApplications:156, successfulHires:23 }
};