# ReXruiters - Complete Hiring Platform MVP

A modern, full-featured hiring platform built with React, TypeScript, and Tailwind CSS. Designed to help companies streamline their recruitment process with intelligent candidate scoring and comprehensive analytics.

## ✨ Features

### 🏠 **Dashboard with Sidebar Navigation**
- **Home**: Overview dashboard with bento grid layout showing key metrics
- **Insights**: Advanced analytics with interactive charts and visualizations
- **Create Job**: Multi-step job creation wizard
- **Jobs**: Manage active jobs and drafts
- **Profile**: Full employer profile management
- **Settings**: Comprehensive settings with tabs for general, notifications, security, billing, and team

### 📊 **Employer Dashboard**
- Beautiful bento grid design with purple/lavender color scheme
- Real-time stats: Active jobs, total candidates, shortlisted, rejected
- Recent activity feed
- Quick access to all jobs
- Maximum 3 active jobs enforcement

### 📝 **Job Creation Flow (4 Steps)**
1. **Job Intake Form**: Collect all job requirements, skills, experience, salary
2. **JD Generation**: AI-powered generation of 3 job description versions:
   - Formal: Traditional corporate style
   - Startup: Modern and energetic tone
   - Skills-first: Focused on outcomes
3. **Assessment Selection**: Choose between Short (20-25min) or Standard (35-45min)
4. **Publish & Share**: Generate public application link

### 📈 **Job Dashboard**
- **Candidates Tab**: Full table with filtering, sorting, and bulk actions
- **Analytics Tab**: 
  - Hireability distribution (pie chart)
  - Application timeline (line chart)
  - Role-wise performance (bar chart)
  - Score breakdown (radar chart)
  - Top skills in demand
  - Key insights and recommendations
- **JD Tab**: View selected job description
- **Assessment Tab**: View assessment configuration
- **Settings Tab**: Manage job status, copy link, delete job

### 🎯 **Candidate Scoring System**
- **Assessment Score (65%)**: Technical evaluation results
- **Profile Fit Score (30%)**: Skills match and experience alignment
- **Reliability Score (5%)**: Attention to detail and completion rate
- **Hireability Labels**:
  - Strong Fit: 80-100
  - Potential Fit: 60-79
  - Weak Fit: 0-59

### 📋 **Candidate Reports**
- Comprehensive candidate snapshot with contact info
- Score breakdown with visual progress bars
- Strengths analysis
- Risk areas identification
- Skill gaps detection
- 5-8 recommended interview questions
- Final assessment interpretation
- PDF download capability

### 🌐 **Public Candidate Application Flow**
- Job landing page with full JD
- Step 1: Basic details (contact, CTC, notice period)
- Step 2: Profile builder (skills, work history, education)
- Step 3: Timed assessment with auto-save
- Step 4: Completion confirmation

### 📊 **Advanced Insights Page**
- Hireability distribution
- Average time to shortlist
- Strong vs weak fit ratio
- Application timeline (7 days)
- Role-wise performance trends
- Score breakdown across criteria
- Top skills in demand
- Actionable recommendations

### 👤 **Employer Profile**
- Company logo with easy upload
- Company information (industry, size, founded)
- About section
- Contact information
- Benefits & perks
- Hiring statistics
- Edit mode with inline editing

### ⚙️ **Settings**
- **General**: Theme, language, email preferences
- **Notifications**: Granular control over email notifications
- **Security**: Password change, 2FA, privacy settings
- **Billing**: Plan management, payment method, billing history
- **Team**: Team member management, invitations, roles

## 🎨 Customization

### Changing the Logo

The logo appears in two places:

1. **Sidebar** (in `/src/app/components/DashboardLayout.tsx`, line ~51):
```tsx
<img 
  src="YOUR_LOGO_URL_HERE" 
  alt="ReXruiters Logo" 
  className="h-10 w-auto" 
/>
```

2. **Profile Avatar** (in `/src/app/components/DashboardLayout.tsx`, lines ~107 and ~139):
```tsx
<AvatarImage src="YOUR_COMPANY_AVATAR_URL" />
```

### Customizing Colors

The purple/lavender theme can be customized in:
- `/src/styles/theme.css`: Main color variables
- Tailwind classes: Replace `purple-600`, `purple-500`, etc. with your brand colors

### Mock Data

Update mock data in:
- `/src/app/context/AppContext.tsx`: Jobs and candidates data
- `/src/app/components/EmployerProfile.tsx`: Company profile data

## 🚀 Key Workflows

### For Employers

1. **Dashboard Overview**: View all hiring metrics at a glance
2. **Create Job**: Use the 4-step wizard to publish a job
3. **Review Candidates**: Sort, filter, and analyze applications
4. **View Reports**: Deep dive into individual candidate reports
5. **Track Analytics**: Monitor hiring trends and performance
6. **Manage Profile**: Keep company information up-to-date

### For Candidates (Public Flow)

1. **Discover Job**: Visit public job link
2. **Apply**: Fill in basic details
3. **Build Profile**: Add skills and work history
4. **Take Assessment**: Complete timed evaluation
5. **Confirmation**: Receive next steps

## 📱 Responsive Design

- Fully responsive across desktop, tablet, and mobile
- Optimized layouts for different screen sizes
- Touch-friendly interactions

## 🔒 MVP Considerations

This is an MVP without backend integration:
- All data is stored in React context (client-side only)
- No authentication system
- No actual file uploads
- No real payment processing
- Mock scoring calculations

## 🛠️ Tech Stack

- **React 18.3.1**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Styling
- **Recharts**: Charts and visualizations
- **React Router DOM**: Navigation
- **Radix UI**: Accessible components
- **Lucide React**: Icons
- **Sonner**: Toast notifications

## 📄 License

This is an MVP/demo application.
