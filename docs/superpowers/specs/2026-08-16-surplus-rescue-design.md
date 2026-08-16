# Surplus Rescue - Design Specification

**Date:** 2026-08-16
**Version:** 1.0
**Status:** Approved

## 1. Overview

Surplus Rescue is a surplus food rescue marketplace web app where restaurants, cafes, bakeries, grocery stores, fresh markets, snack shops, convenience stores, and food producers can post their safe surplus food through secret bags with discount prices within time limits. Customers can order food online with cash on delivery.

### Core Value Proposition
- **For Businesses:** Reduce food waste, recover costs, attract new customers
- **For Customers:** Get quality food at steep discounts, reduce environmental impact
- **For Platform:** Commission-based revenue model with advertising opportunities

### Target Users
1. **Customers** - Price-conscious, environmentally aware consumers
2. **Businesses** - Restaurants, cafes, bakeries, grocery stores, fresh markets, snack shops, convenience stores, food producers
3. **Admin** - Platform administrators managing operations

## 2. Technical Architecture

### Tech Stack
- **Framework:** Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Database:** Supabase (PostgreSQL) with Row Level Security
- **Authentication:** Supabase Auth (Email, Google, Apple OAuth)
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Testing:** Vitest (unit/integration) + Playwright (E2E)
- **Deployment:** Vercel + Supabase
- **Email:** Resend
- **Error Tracking:** Sentry
- **Real-time:** Supabase Realtime (WebSocket subscriptions)
- **File Storage:** Supabase Storage
- **CI/CD:** GitHub Actions

### Architecture Pattern
**Monolithic Next.js Application** - Single codebase with clear separation of concerns through feature-based folder structure.

### Color Palette
- **Primary Background:** Cream (#FFFBF2) - 60%
- **Primary Color:** Navy (#526B91) - 25%
- **Accent Color:** Gold (#E9B949) - 10%
- **Warning/Alert:** Coral (#E87552) - 3%
- **Success/Environmental:** Sage (#6F9B78) - 2%

## 3. Database Schema

### Core Tables

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'business', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### businesses
```sql
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  business_type VARCHAR(50) NOT NULL CHECK (business_type IN ('restaurant', 'cafe', 'bakery', 'grocery', 'fresh_market', 'snack_shop', 'convenience', 'producer')),
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(20),
  email VARCHAR(255),
  logo_url TEXT,
  cover_image_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  delivery_radius_km DECIMAL(5, 2) DEFAULT 5.0,
  commission_rate DECIMAL(5, 2) DEFAULT 12.5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### mystery_bags
```sql
CREATE TABLE mystery_bags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('mixed_meals', 'bakery', 'grocery', 'produce', 'snacks', 'beverages', 'desserts')),
  original_value DECIMAL(10, 2) NOT NULL,
  selling_price DECIMAL(10, 2) NOT NULL,
  quantity_available INTEGER NOT NULL DEFAULT 1,
  quantity_sold INTEGER DEFAULT 0,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  available_from TIMESTAMP WITH TIME ZONE,
  available_until TIMESTAMP WITH TIME ZONE,
  pickup_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### time_slots
```sql
CREATE TABLE time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  max_orders INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  mystery_bag_id UUID REFERENCES mystery_bags(id) ON DELETE CASCADE,
  time_slot_id UUID REFERENCES time_slots(id),
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled', 'refunded')),
  total_amount DECIMAL(10, 2) NOT NULL,
  commission_amount DECIMAL(10, 2) NOT NULL,
  business_payout DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(20) DEFAULT 'cash_on_delivery',
  delivery_address TEXT,
  delivery_notes TEXT,
  special_requests TEXT,
  scheduled_pickup TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### advertisements
```sql
CREATE TABLE advertisements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  ad_type VARCHAR(20) NOT NULL CHECK (ad_type IN ('banner', 'carousel', 'featured')),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  link_url TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  cost DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### business_documents
```sql
CREATE TABLE business_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('business_license', 'food_safety_cert', 'insurance', 'health_permit')),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS) Policies
- Users can only view/update their own profile
- Business owners can only manage their own businesses and mystery bags
- Customers can only view their own orders
- Admins have full access to all tables
- Public read access for active mystery bags and businesses

## 4. User Roles & Permissions

### Customer
- Browse available mystery bags
- Place orders with cash on delivery
- Track order status
- Rate and review businesses
- Manage profile and delivery addresses
- View order history

### Business Owner
- Create and manage business profile
- Upload verification documents
- Create/edit/delete mystery bags
- Set delivery radius and time slots
- View orders and update status
- Respond to reviews
- Purchase advertising spots
- View analytics dashboard

### Admin
- Verify business documents
- Manage all users and businesses
- Handle disputes and refunds
- Manage advertising campaigns
- View platform analytics
- Configure system settings

## 5. Core Features

### 5.1 Mystery Bags System
- **Secret Bags:** Customers don't know exact items, just category and value
- **Categories:** Mixed meals, Bakery, Grocery, Produce, Snacks, Beverages, Desserts
- **Dynamic Pricing:** Business sets original value and selling price (discount %)
- **Time-Limited:** Available only during specific time slots
- **Quantity Management:** Track available and sold quantities

### 5.2 Time Slot Management
- **Predefined Slots:** 10-11am, 5-6pm, 9-10pm (delivery only)
- **Day Configuration:** Businesses can enable/disable slots per day
- **Capacity Limits:** Maximum orders per time slot
- **Real-time Availability:** Updates as orders are placed

### 5.3 Order Flow
1. Customer browses available mystery bags
2. Selects bag and preferred time slot
3. Confirms delivery address and notes
4. Places order (Cash on Delivery)
5. Business receives notification and confirms
6. Business prepares order
7. Order marked ready for pickup/delivery
8. Customer receives order and pays cash
9. Order marked delivered
10. Customer can rate and review

### 5.4 Delivery Management
- **Self-Delivery:** Businesses handle their own delivery
- **Custom Radius:** Businesses set delivery radius in km
- **Address Validation:** Ensure delivery address is within radius
- **Delivery Instructions:** Customers can add special instructions

### 5.5 Payment System
- **Cash on Delivery Only:** No online payment processing
- **Commission Calculation:** Platform takes 10-15% per order
- **Business Payout:** Calculated after commission deduction
- **Receipt Generation:** Digital receipts for all transactions

### 5.6 Review & Rating System
- **5-Star Ratings:** Simple rating system
- **Text Reviews:** Optional comments
- **Anonymous Option:** Customers can review anonymously
- **Business Responses:** Businesses can respond to reviews
- **Average Rating:** Displayed on business profile

### 5.7 Advertising System
- **Banner Ads:** Homepage banner carousel
- **Featured Spots:** Carousel on homepage
- **Paid Placement:** Businesses pay for visibility
- **Analytics:** Track impressions and clicks
- **Scheduling:** Set start and end dates

### 5.8 Notification System
- **Email Notifications:** Order confirmations, status updates
- **Push Notifications:** Real-time updates (future enhancement)
- **In-App Notifications:** Notification center
- **Business Alerts:** New orders, reviews, document status

### 5.9 Admin Dashboard
- **User Management:** View, edit, disable users
- **Business Verification:** Review and approve documents
- **Order Management:** View all orders, handle disputes
- **Analytics:** Platform-wide metrics and reports
- **Content Management:** Manage categories, settings

## 6. UI/UX Design

### Design Principles
- **Warm & Inviting:** Food-focused, community-driven aesthetic
- **Clear Hierarchy:** Easy to scan and navigate
- **Mobile-First:** Responsive design for all devices
- **Accessible:** WCAG 2.1 AA compliance
- **Fast:** Optimized performance with lazy loading

### Key Pages

#### Homepage
- Hero section with value proposition
- Featured businesses carousel (paid advertising)
- Available mystery bags grid
- Search and filter options
- Category navigation

#### Business Listing
- Business profile with cover image
- Mystery bags available
- Time slots and delivery info
- Reviews and ratings
- Contact information

#### Mystery Bag Detail
- High-quality images
- Category and value information
- Original vs. selling price
- Available time slots
- Business information
- Add to order button

#### Order Checkout
- Delivery address form
- Time slot selection
- Special requests
- Order summary
- Place order button

#### Order Tracking
- Real-time status updates
- Timeline visualization
- Business contact info
- Delivery instructions

#### Business Dashboard
- Overview analytics
- Mystery bag management
- Order management
- Review responses
- Advertising management

#### Admin Dashboard
- Platform metrics
- User management
- Business verification
- Order disputes
- System settings

### Components
- **Navigation:** Sticky header with search, cart, notifications
- **Cards:** Mystery bag cards with images, prices, time info
- **Modals:** Order confirmation, review submission
- **Forms:** Address, business profile, mystery bag creation
- **Tables:** Order history, business analytics
- **Notifications:** Toast messages, notification center

## 7. API Structure

### Supabase Edge Functions
- `create-order` - Process new orders
- `update-order-status` - Update order status
- `calculate-commission` - Calculate platform commission
- `send-notification` - Send email/push notifications
- `verify-document` - Process document verification
- `generate-receipt` - Create order receipts

### Real-time Subscriptions
- Order status updates
- New mystery bag availability
- Notification delivery
- Review submissions

## 8. Security Considerations

### Authentication
- Secure password hashing (bcrypt)
- JWT token management
- OAuth provider integration
- Session management

### Authorization
- Row Level Security (RLS) policies
- Role-based access control
- API route protection
- Middleware validation

### Data Protection
- Input validation with Zod
- SQL injection prevention (parameterized queries)
- XSS protection (React escaping)
- CSRF protection
- File upload validation

### Payment Security
- No online payment data stored
- Cash on delivery only
- Order verification system

## 9. Testing Strategy

### Unit Tests (Vitest)
- Component testing
- Utility function testing
- Form validation testing
- API route testing

### Integration Tests (Vitest)
- Database operations
- Authentication flows
- Order processing
- Notification sending

### E2E Tests (Playwright)
- User registration/login
- Mystery bag browsing
- Order placement
- Business management
- Admin operations

### Test Coverage
- Minimum 80% code coverage
- Critical paths: 100% coverage
- Regular test runs in CI/CD

## 10. Success Metrics & KPIs

### Business Metrics
- **Monthly Active Users (MAU)**
- **Order Volume**
- **Average Order Value**
- **Customer Retention Rate**
- **Business Retention Rate**
- **Revenue (Commission + Advertising)**

### Environmental Metrics
- **Food Waste Reduction (kg)**
- **CO2 Emissions Saved**
- **Meals Rescued**

### Platform Metrics
- **Page Load Time**
- **Error Rate**
- **Uptime**
- **Support Ticket Volume**
- **App Store Rating**

## 11. Project Structure

```
surplus-rescue/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/
│   │   │   ├── business/
│   │   │   ├── admin/
│   │   │   └── orders/
│   │   ├── (marketplace)/
│   │   │   ├── businesses/
│   │   │   ├── mystery-bags/
│   │   │   └── search/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── marketplace/
│   │   ├── business/
│   │   ├── admin/
│   │   └── shared/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── utils/
│   │   └── validations/
│   ├── hooks/
│   ├── store/
│   ├── types/
│   └── styles/
├── public/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── prisma/
└── package.json
```

## 12. Deployment

### Vercel Configuration
- Automatic deployments from main branch
- Preview deployments for PRs
- Environment variables management
- Domain configuration

### Supabase Configuration
- Production database
- Storage buckets
- Edge functions
- Realtime subscriptions

### CI/CD Pipeline
- Lint and type checking
- Unit and integration tests
- E2E tests
- Build verification
- Deployment to staging/production

---

**Document prepared by:** Claude Code
**Review status:** Pending user review
**Next step:** Implementation planning with writing-plans skill