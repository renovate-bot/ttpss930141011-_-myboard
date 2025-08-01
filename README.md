# MyBoard - Personal Whiteboard & Drawing Tool

![MyBoard Banner](./public/images/myboard-banner.png)

**A single-user Miro clone whiteboard app with local state management using Zustand and PostgreSQL persistence - no real-time collaboration, no Liveblocks/Convex dependencies, just pure personal drawing and creativity.**

Originally forked from [aftabrehan/board-wex](https://github.com/aftabrehan/board-wex), this project has been completely refactored and renamed to MyBoard. It removes expensive SaaS dependencies (Liveblocks & Convex) and has been transformed into a self-hostable personal whiteboard solution.

## 🎯 Why This Fork?

The original project relied heavily on paid SaaS services:
- **Clerk** - Authentication service ($74/month)
- **Liveblocks** - Real-time collaboration service (usage-based pricing)
- **Convex** - Backend-as-a-Service platform (usage-based pricing)

This fork removes these dependencies to create a **completely free and self-hostable** solution:
- ✅ **No monthly fees** - Use your own PostgreSQL database  
- ✅ **Full data ownership** - Your drawings stay on your server
- ✅ **Simple architecture** - Zustand for state, Prisma for persistence
- ✅ **Easy deployment** - Standard Next.js app, deploy anywhere
- ✅ **Open-source auth** - Replaced Clerk ($74/month) with free Auth.js

## ✨ Features

### Drawing & Creation Tools
- 🎨 **Freehand Drawing** - Natural pencil tool with pressure sensitivity
- 🟦 **Shapes** - Rectangle, ellipse, and more geometric shapes
- 📝 **Text Tool** - Add and edit text with inline editing
- 🗒️ **Sticky Notes** - Quick notes with auto-sizing text
- 🎯 **Selection Tool** - Multi-select with selection net
- 🖼️ **Frame Tool** - Visual grouping with Miro-inspired auto-adoption

### Canvas Management
- 🔄 **Undo/Redo** - Full history support (up to 50 actions)
- 🎪 **Layers** - Complete layering system with z-index management
- 🌈 **Color Picker** - Full color customization for all elements
- 🔍 **Zoom & Pan** - Navigate your canvas with mouse or trackpad
- 📐 **Grid Background** - Optional grid for precision placement

### Personal Workspace
- 💾 **Auto-save** - Changes persist automatically to PostgreSQL
- ⭐ **Favorites** - Mark important boards for quick access
- 🗂️ **Board Management** - Create, rename, and delete boards
- 🔐 **Authentication** - Secure personal workspace with OAuth (Google/GitHub)
- 🔗 **Public Sharing** - Share read-only board links with anyone

### Security & Privacy
- 🛡️ **Enterprise-Grade Security** - OWASP Top 10 compliant with A+ security score
- 🔒 **Input Sanitization** - XSS protection with comprehensive validation
- 🚫 **CSRF Protection** - Multi-layer protection with rate limiting
- 🎫 **Secure Headers** - Content Security Policy and modern security headers
- 🔍 **Threat Monitoring** - Real-time suspicious activity detection
- 📊 **Data Validation** - JSON schema validation for canvas data integrity

### Performance & UX
- ⚡ **Optimized Rendering** - Smooth 60fps canvas operations
- 🎯 **Keyboard Shortcuts** - Efficient workflow with hotkeys
- 📱 **Responsive Design** - Works on desktop and tablet
- 🌙 **Modern UI** - Clean interface with Shadcn/UI components

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with Immer middleware
- **Authentication**: [Auth.js v5](https://authjs.dev/) (NextAuth) with OAuth providers
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn/UI](https://ui.shadcn.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) (React Query)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📋 Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- pnpm (recommended) or npm

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ttpss930141011/myboard.git
cd myboard
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/myboard"

# Auth.js Configuration
AUTH_SECRET=your-secret-key-here # Generate with: openssl rand -base64 32

# Email Provider (Resend) - Recommended
AUTH_RESEND_KEY=re_xxxxxxxxxxxx # Get from https://resend.com
# Optional: Custom from address
# AUTH_EMAIL_FROM="MyBoard <noreply@yourdomain.com>"

# OAuth Providers (Optional - for social login)
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 4. Set up the database

```bash
# Generate Prisma client
pnpm exec prisma generate

# Run database migrations
pnpm exec prisma migrate dev

# (Optional) Seed the database with sample data
pnpm exec prisma db seed
```

### 5. Start the development server

```bash
pnpm run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 🔐 Authentication Setup

MyBoard supports multiple authentication methods. You can use email magic links (recommended for preview deployments) or OAuth providers.

### Email Authentication (Resend) - Recommended

Email authentication is the simplest way to get started and works perfectly for preview deployments.

#### Setting up Resend
1. Sign up for a free account at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Add to your `.env` file:
   ```bash
   AUTH_RESEND_KEY=re_xxxxxxxxxxxx
   # Optional: Custom from address (default: noreply@myboard.justinxiao.app)
   AUTH_EMAIL_FROM="MyBoard <noreply@yourdomain.com>"
   ```

#### Domain Configuration (Optional)
For production, you can use your own domain:
1. Add your domain in Resend dashboard
2. Configure DNS records as instructed
3. Update `AUTH_EMAIL_FROM` to use your domain

### OAuth Providers (Optional)

If you prefer social login, you can configure OAuth providers:

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env` file

#### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env` file

### Production Setup
For production deployment:
- **Email**: Works automatically with your domain
- **OAuth**: Update redirect URIs to your production domain:
  - Google: `https://yourdomain.com/api/auth/callback/google`
  - GitHub: `https://yourdomain.com/api/auth/callback/github`

## 🎮 Usage

### Creating a Board
1. Click the "+" button or "New board" to create a new whiteboard
2. Give your board a meaningful title
3. Start drawing and creating!

### Drawing Tools
- **Pencil**: Freehand drawing with natural strokes
- **Rectangle/Ellipse**: Click and drag to create shapes
- **Text**: Click to place text, double-click to edit
- **Note**: Create sticky notes that auto-size text

### Canvas Navigation
- **Pan**: Hold middle mouse button or space + drag
- **Zoom**: Ctrl/Cmd + scroll or use zoom controls
- **Select**: Click elements or drag selection net

### Keyboard Shortcuts
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y`: Redo
- `Delete`: Delete selected elements
- `Escape`: Cancel current operation
- `1-5`: Quick tool selection

## 🏗️ Project Structure

```
myboard/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application pages
│   ├── board/[boardId]/   # Board canvas page
│   └── api/               # API routes
├── components/            # Reusable UI components
├── docs/                  # Component design documentation
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── stores/               # Zustand state stores
└── types/                # TypeScript type definitions
```

## 📚 Documentation

### Security Implementation
- **[Security Implementation Summary](./docs/SECURITY_IMPLEMENTATION_SUMMARY.md)** - Comprehensive security architecture overview
- **[Security Guide](./docs/SECURITY.md)** - Detailed security features and best practices

### Core Canvas Components
- **[Frame Component](./docs/FRAME_COMPONENT_DESIGN.md)** - Visual grouping and hierarchical organization with Miro-inspired auto-adoption

## 🔧 Development

### Database Commands

```bash
# View database in Prisma Studio
pnpm exec prisma studio

# Create a new migration
pnpm exec prisma migrate dev --name your_migration_name

# Reset database (WARNING: deletes all data)
pnpm exec prisma migrate reset
```

### Code Quality

```bash
# Run TypeScript type checking
pnpm exec tsc --noEmit

# Run ESLint
pnpm run lint

# Format code with Prettier
pnpm run format
```

### Building for Production

```bash
# Create production build
pnpm run build

# Start production server
pnpm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚀 Roadmap

### Phase 1: Remove SaaS Dependencies ✅
- [x] Remove Liveblocks real-time collaboration
- [x] Remove Convex backend
- [x] Implement Zustand for local state management
- [x] Add PostgreSQL with Prisma for persistence
- [x] Implement auto-save functionality

### Phase 2: Authentication Independence ✅
- [x] **Remove Clerk dependency** 
- [x] Implement self-hosted authentication
  - [x] Auth.js v5 (NextAuth) integration
  - [x] User management with Prisma
  - [x] OAuth providers (Google, GitHub)
- [x] Database migration strategy

### Phase 3: Security Implementation ✅
- [x] **Enterprise-Grade Security Implementation**
  - [x] OWASP Top 10 2024 compliance (A+ grade)
  - [x] Input validation and XSS prevention
  - [x] CSRF protection with rate limiting
  - [x] Comprehensive security headers
  - [x] Canvas data validation system
  - [x] Threat detection and monitoring
  - [x] Security documentation and guides

### Phase 4: Enhanced Features 📋
- [ ] Offline mode with sync
- [ ] Export functionality (PNG, SVG, PDF)
- [ ] Import from other formats
- [ ] More drawing tools (arrows, lines, polygons)
- [ ] Custom fonts and text styling
- [ ] Board templates

### Phase 5: Performance & Deployment 🎯
- [ ] Canvas performance optimizations
- [ ] Docker containerization
- [ ] One-click deployment scripts
- [ ] Backup and restore functionality
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original inspiration from [Miro](https://miro.com/)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)
- Drawing algorithms from [Perfect Freehand](https://github.com/steveruizok/perfect-freehand)

---

Built with ❤️ by [ttpss930141011](https://github.com/ttpss930141011)