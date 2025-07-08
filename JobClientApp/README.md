# Volmatica Admin System

A comprehensive React-based admin system built with Material-UI (MUI) featuring role-based authentication, recruiter management, and job posting functionality.

## Features

### Authentication System
- **Role-based Login**: System Admin and Recruiter roles
- **Secure Authentication**: JWT token-based authentication
- **User Management**: Profile dropdown with change password and logout options

### System Administrator Dashboard
- **Recruiter Management**: Full CRUD operations for recruiters
- **Statistics Dashboard**: Total and active recruiters count
- **Form Validation**: Comprehensive validation for all forms
- **Data Table**: Interactive table with sorting, filtering, and actions

### Recruiter Dashboard
- **Job Post Management**: Create, view, edit, and delete job posts
- **Candidate Management**: Add candidates to job posts with status tracking
- **Statistics**: Active job posts, total job posts, and offered candidates
- **Status Management**: Move candidates through different stages

### Key Technologies
- **React 18**: Modern functional components with hooks
- **Material-UI (MUI)**: Professional UI components and theming
- **React Router**: Client-side routing with protected routes
- **Context API**: State management for authentication and notifications
- **Responsive Design**: Mobile-first approach with breakpoints

## Demo Accounts

### System Administrator
- **Email**: admin@volmatica.com
- **Password**: Admin@111
- **Access**: Full recruiter management capabilities

### Recruiter
- **Email**: Ibad@Volmatica.com
- **Password**: Ibad@111
- **Access**: Job posting and candidate management

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd volmatica-admin-system
   
   # Or extract the downloaded files
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - Use the demo accounts provided above to login

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── admin/           # Admin-specific components
│   ├── common/          # Shared components
│   ├── layout/          # Layout components
│   └── recruiter/       # Recruiter-specific components
├── contexts/            # React context providers
├── data/               # Mock data
├── pages/              # Main page components
├── services/           # API service layer
├── theme/              # MUI theme configuration
├── utils/              # Utility functions
├── App.jsx             # Main app component
└── main.jsx            # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Form Validation Rules

### Recruiter Form
- **Name**: No special characters allowed
- **Email**: Valid email format required
- **Password**: Minimum 8 characters, 1 uppercase, 1 number, 1 special character, no spaces
- **Gender**: Required selection from dropdown

### Job Post Form
- **Job Title**: Required field
- **Description/Responsibilities/Qualifications**: Required text fields
- **Salary Range**: Valid numbers with max >= min
- **Stage**: Required selection from predefined options

### Candidate Form
- **Name & Email**: Required with proper validation
- **Status**: Required selection from interview stages
- **CV Upload**: File upload required (simulated)

## Features Overview

### Admin Features
- View total and active recruiters statistics
- Add new recruiters with comprehensive form validation
- View all recruiters in a sortable table
- Edit existing recruiter information
- Toggle recruiter active/inactive status
- Delete recruiters with confirmation

### Recruiter Features
- View job posting statistics dashboard
- Create new job posts with detailed information
- Manage job post status (active/inactive)
- Add candidates to specific job posts
- Track candidate progress through interview stages
- Download candidate CVs (simulated)
- Move candidates to next interview stage
- Reject candidates when necessary

### Common Features
- Responsive design for all screen sizes
- Toast notifications for all actions
- Professional Material-UI styling
- Secure logout functionality
- Protected routes based on user roles
- Clean and intuitive user interface

## API Integration

All API calls are currently mocked with hardcoded data for demonstration purposes. The actual API integration points are commented in the code and can be easily uncommented and configured when connecting to a real backend.

### API Service Structure
- `authAPI`: Authentication endpoints
- `recruiterAPI`: Recruiter management endpoints
- `jobAPI`: Job posting endpoints
- `candidateAPI`: Candidate management endpoints

## Customization

### Theme Customization
The application uses a custom MUI theme located in `src/theme/theme.js`. You can modify:
- Primary color scheme (currently blue #00B4FF)
- Typography settings
- Component styling overrides
- Spacing and layout preferences

### Adding New Features
The modular structure makes it easy to extend:
1. Add new components in appropriate directories
2. Create new contexts for state management
3. Add new routes in `App.jsx`
4. Extend mock data in `src/data/mockData.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Code splitting with React.lazy (can be implemented)
- Optimized re-renders with React.memo
- Efficient state management with Context API
- Minimal bundle size with tree-shaking

## Security Features

- Protected routes based on authentication
- Role-based access control
- JWT token storage in localStorage
- Input validation and sanitization
- XSS protection through React's built-in safeguards

## Contributing

1. Follow the existing code structure and naming conventions
2. Add proper validation for all forms
3. Include appropriate error handling
4. Maintain responsive design principles
5. Update documentation for new features

## License

This project is created for demonstration purposes. Please refer to your organization's licensing requirements for production use.

## Support

For technical support or questions about the implementation, please refer to the codebase documentation or create an issue in the project repository.