# Foundation Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up the Next.js project with Supabase integration, complete database schema with RLS policies, and authentication system.

**Architecture:** Monolithic Next.js 14+ application with App Router, using Supabase for database, auth, and storage. Feature-based folder structure with clear separation of concerns.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Supabase (PostgreSQL + Auth + Storage), Zustand, React Hook Form, Zod, Vitest, Playwright

## Global Constraints

- Next.js 14+ with App Router
- TypeScript strict mode
- Tailwind CSS for styling
- Supabase client for database operations (no Prisma ORM)
- Supabase Auth for authentication
- Row Level Security (RLS) on all tables
- Cash on delivery only (no online payments)
- Mobile-first responsive design
- WCAG 2.1 AA accessibility

## File Structure

```
surplus-rescue/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── card.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── utils.ts
│   │   └── validations/
│   │       └── auth.ts
│   ├── hooks/
│   │   └── use-auth.ts
│   ├── store/
│   │   └── auth-store.ts
│   └── types/
│       └── database.ts
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── config.toml
├── tests/
│   ├── unit/
│   │   └── lib/
│   │       └── validations.test.ts
│   └── e2e/
│       └── auth.spec.ts
├── .env.local.example
└── package.json
```

---

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `next.config.js`
- Create: `postcss.config.js`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`

**Interfaces:**
- Produces: Basic Next.js app shell that runs with `npm run dev`

- [ ] **Step 1: Create Next.js project**

```bash
npx create-next-app@latest surplus-rescue --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd surplus-rescue
```

- [ ] **Step 2: Install additional dependencies**

```bash
npm install @supabase/supabase-js @supabase/ssr zustand react-hook-form @hookform/resolvers zod framer-motion lucide-react
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Verify dev server runs**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js project with dependencies"
```

---

### Task 2: Set Up Environment Configuration

**Files:**
- Create: `.env.local.example`
- Create: `.env.local`
- Create: `src/lib/env.ts`

**Interfaces:**
- Produces: Environment variable validation and access

- [ ] **Step 1: Create environment example file**

```bash
cat > .env.local.example << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

- [ ] **Step 2: Create environment validation**

```typescript
// src/lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
})

export const env = envSchema.parse(process.env)
```

- [ ] **Step 3: Commit**

```bash
git add .env.local.example src/lib/env.ts
git commit -m "feat: add environment configuration"
```

---

### Task 3: Create Supabase Client

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/middleware.ts`

**Interfaces:**
- Produces: `createClient()` for browser, `createClient()` for server, middleware helper

- [ ] **Step 1: Create browser client**

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 2: Create server client**

```typescript
// src/lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {}
        },
      },
    }
  )
}
```

- [ ] **Step 3: Create middleware helper**

```typescript
// src/lib/supabase/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/supabase/
git commit -m "feat: add Supabase client helpers"
```

---

### Task 4: Create Database Schema Migration

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`
- Create: `src/types/database.ts`

**Interfaces:**
- Produces: Database tables with RLS policies, TypeScript types

- [ ] **Step 1: Create migration file**

```sql
-- supabase/migrations/001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'business', 'admin', 'rider')),
  is_available BOOLEAN DEFAULT TRUE,
  current_latitude DECIMAL(10, 8),
  current_longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Businesses table
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
  commission_rate DECIMAL(5, 2) DEFAULT 12.5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mystery bags table
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

-- Time slots table
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

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  mystery_bag_id UUID REFERENCES mystery_bags(id) ON DELETE CASCADE,
  time_slot_id UUID REFERENCES time_slots(id),
  rider_id UUID REFERENCES users(id),
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'out_for_delivery', 'delivered', 'cancelled', 'refunded')),
  total_amount DECIMAL(10, 2) NOT NULL,
  commission_amount DECIMAL(10, 2) NOT NULL,
  business_payout DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(20) DEFAULT 'cash_on_delivery',
  delivery_address TEXT,
  delivery_notes TEXT,
  special_requests TEXT,
  scheduled_pickup TIMESTAMP WITH TIME ZONE,
  picked_up_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
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

-- Advertisements table
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

-- Business documents table
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

-- Notifications table
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

-- Platform settings table
CREATE TABLE platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default delivery radius setting
INSERT INTO platform_settings (setting_key, setting_value, description)
VALUES ('delivery_radius_km', '10', 'Maximum delivery radius in kilometers');

-- Row Level Security Policies

-- Users: can only view/update their own profile
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Businesses: owners can manage their own, public can view active
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active businesses" ON businesses
  FOR SELECT USING (is_active = true);

CREATE POLICY "Business owners can manage own businesses" ON businesses
  FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Admins can manage all businesses" ON businesses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Mystery bags: public can view available, business owners can manage own
ALTER TABLE mystery_bags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available mystery bags" ON mystery_bags
  FOR SELECT USING (is_available = true);

CREATE POLICY "Business owners can manage own mystery bags" ON mystery_bags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

-- Time slots: business owners can manage own
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business owners can manage own time slots" ON time_slots
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

-- Orders: customers view own, business owners view their orders, riders view assigned
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (customer_id = auth.uid());

CREATE POLICY "Business owners can view their orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Riders can view assigned orders" ON orders
  FOR SELECT USING (rider_id = auth.uid());

CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Reviews: public can view, customers can create for their orders
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews for their orders" ON reviews
  FOR INSERT WITH CHECK (
    customer_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM orders WHERE id = order_id AND customer_id = auth.uid() AND status = 'delivered'
    )
  );

-- Advertisements: public can view active, business owners can manage own
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active advertisements" ON advertisements
  FOR SELECT USING (is_active = true AND start_date <= NOW() AND end_date >= NOW());

CREATE POLICY "Business owners can manage own advertisements" ON advertisements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

-- Business documents: business owners can manage own, admins can verify
ALTER TABLE business_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Business owners can view own documents" ON business_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM businesses WHERE id = business_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all documents" ON business_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update documents" ON business_documents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Notifications: users can view own
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Platform settings: admins can manage
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage platform settings" ON platform_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

- [ ] **Step 2: Generate TypeScript types**

```bash
npx supabase gen types typescript --project-id your-project-ref > src/types/database.ts
```

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/ src/types/database.ts
git commit -m "feat: add database schema with RLS policies"
```

---

### Task 5: Create Basic UI Components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/card.tsx`

**Interfaces:**
- Produces: Reusable UI components with consistent styling

- [ ] **Step 1: Create Button component**

```tsx
// src/components/ui/button.tsx
import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-[#526B91] text-white hover:bg-[#425a7a] focus:ring-[#526B91]',
      secondary: 'bg-[#E9B949] text-[#526B91] hover:bg-[#d4a83e] focus:ring-[#E9B949]',
      outline: 'border-2 border-[#526B91] text-[#526B91] hover:bg-[#526B91] hover:text-white focus:ring-[#526B91]',
      ghost: 'text-[#526B91] hover:bg-[#526B91]/10 focus:ring-[#526B91]',
      danger: 'bg-[#E87552] text-white hover:bg-[#d46542] focus:ring-[#E87552]',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
```

- [ ] **Step 2: Create Input component**

```tsx
// src/components/ui/input.tsx
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[#526B91] mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#526B91] focus:border-transparent ${
            error ? 'border-[#E87552]' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-[#E87552]">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
```

- [ ] **Step 3: Create Card component**

```tsx
// src/components/ui/card.tsx
import { forwardRef } from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200',
      hover: 'bg-white border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer',
    }

    return (
      <div
        ref={ref}
        className={`rounded-xl p-4 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add basic UI components"
```

---

### Task 6: Create Auth Validation Schemas

**Files:**
- Create: `src/lib/validations/auth.ts`

**Interfaces:**
- Produces: Zod schemas for login, register, forgot password forms

- [ ] **Step 1: Create auth validation schemas**

```typescript
// src/lib/validations/auth.ts
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  role: z.enum(['customer', 'business']).default('customer'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/validations/auth.ts
git commit -m "feat: add auth validation schemas"
```

---

### Task 7: Create Auth Store

**Files:**
- Create: `src/store/auth-store.ts`
- Create: `src/hooks/use-auth.ts`

**Interfaces:**
- Consumes: Supabase client from Task 3
- Produces: `useAuthStore` hook, `useAuth` hook

- [ ] **Step 1: Create auth store**

```typescript
// src/store/auth-store.ts
import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}))
```

- [ ] **Step 2: Create auth hook**

```typescript
// src/hooks/use-auth.ts
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/auth-store'

export function useAuth() {
  const { user, isLoading, setUser, setLoading } = useAuthStore()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)

        if (event === 'SIGNED_IN') {
          router.refresh()
        }
        if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, setUser, setLoading, router])

  const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    })
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  return {
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/store/auth-store.ts src/hooks/use-auth.ts
git commit -m "feat: add auth store and hook"
```

---

### Task 8: Create Auth Pages

**Files:**
- Create: `src/app/(auth)/layout.tsx`
- Create: `src/app/(auth)/login/page.tsx`
- Create: `src/app/(auth)/register/page.tsx`
- Create: `src/app/(auth)/forgot-password/page.tsx`

**Interfaces:**
- Consumes: Auth hook from Task 7, UI components from Task 5, validation schemas from Task 6
- Produces: Functional auth pages

- [ ] **Step 1: Create auth layout**

```tsx
// src/app/(auth)/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-[#FFFBF2] flex items-center justify-center ${inter.className}`}>
      <div className="w-full max-w-md p-8">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create login page**

```tsx
// src/app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const { signIn, isLoading } = useAuth()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setError(null)
    const { error } = await signIn(data.email, data.password)
    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#526B91]">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 bg-[#E87552]/10 border border-[#E87552] rounded-lg text-[#E87552] text-sm">
            {error}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          id="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          id="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <div className="text-center space-y-2">
        <Link href="/forgot-password" className="text-sm text-[#526B91] hover:underline">
          Forgot password?
        </Link>
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#526B91] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create register page**

```tsx
// src/app/(auth)/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const { signUp, isLoading } = useAuth()
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setError(null)
    const { error } = await signUp(data.email, data.password, {
      full_name: data.fullName,
      phone: data.phone,
      role: data.role,
    })
    if (error) {
      setError(error.message)
    } else {
      router.push('/verify-email')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#526B91]">Create Account</h1>
        <p className="text-gray-600 mt-2">Join Surplus Rescue today</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 bg-[#E87552]/10 border border-[#E87552] rounded-lg text-[#E87552] text-sm">
            {error}
          </div>
        )}

        <Input
          label="Full Name"
          id="fullName"
          {...register('fullName')}
          error={errors.fullName?.message}
        />

        <Input
          label="Email"
          type="email"
          id="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Phone (optional)"
          type="tel"
          id="phone"
          {...register('phone')}
          error={errors.phone?.message}
        />

        <Input
          label="Password"
          type="password"
          id="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#526B91]">I want to</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="customer"
                {...register('role')}
                className="text-[#526B91] focus:ring-[#526B91]"
              />
              <span>Order food</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="business"
                {...register('role')}
                className="text-[#526B91] focus:ring-[#526B91]"
              />
              <span>Sell surplus food</span>
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-[#526B91] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
```

- [ ] **Step 4: Create forgot password page**

```tsx
// src/app/(auth)/forgot-password/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { resetPassword, isLoading } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    setError(null)
    const { error } = await resetPassword(data.email)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold text-[#526B91]">Check Your Email</h1>
        <p className="text-gray-600">
          We've sent a password reset link to your email address.
        </p>
        <Link href="/login" className="text-[#526B91] font-medium hover:underline">
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#526B91]">Reset Password</h1>
        <p className="text-gray-600 mt-2">Enter your email to reset your password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 bg-[#E87552]/10 border border-[#E87552] rounded-lg text-[#E87552] text-sm">
            {error}
          </div>
        )}

        <Input
          label="Email"
          type="email"
          id="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Send Reset Link
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link href="/login" className="text-[#526B91] font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/\(auth\)/
git commit -m "feat: add auth pages (login, register, forgot password)"
```

---

### Task 9: Create Middleware for Auth Protection

**Files:**
- Create: `src/middleware.ts`

**Interfaces:**
- Consumes: Supabase middleware from Task 3
- Produces: Protected routes middleware

- [ ] **Step 1: Create middleware**

```typescript
// src/middleware.ts
import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add auth middleware"
```

---

### Task 10: Write Unit Tests

**Files:**
- Create: `tests/unit/lib/validations.test.ts`
- Create: `vitest.config.ts`

**Interfaces:**
- Consumes: Validation schemas from Task 6
- Produces: Passing unit tests

- [ ] **Step 1: Create vitest config**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 2: Create validation tests**

```typescript
// tests/unit/lib/validations.test.ts
import { describe, it, expect } from 'vitest'
import { loginSchema, registerSchema, forgotPasswordSchema } from '@/lib/validations/auth'

describe('loginSchema', () => {
  it('validates correct login data', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
  })

  it('rejects short password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '12345',
    })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  it('validates correct registration data', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'John Doe',
      role: 'customer',
    })
    expect(result.success).toBe(true)
  })

  it('rejects mismatched passwords', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password456',
      fullName: 'John Doe',
      role: 'customer',
    })
    expect(result.success).toBe(false)
  })

  it('rejects short name', () => {
    const result = registerSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      fullName: 'J',
      role: 'customer',
    })
    expect(result.success).toBe(false)
  })
})

describe('forgotPasswordSchema', () => {
  it('validates correct email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'test@example.com',
    })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'invalid-email',
    })
    expect(result.success).toBe(false)
  })
})
```

- [ ] **Step 3: Run tests**

```bash
npm run test
```

Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add tests/unit/ vitest.config.ts
git commit -m "test: add auth validation unit tests"
```

---

### Task 11: Create E2E Test for Auth Flow

**Files:**
- Create: `tests/e2e/auth.spec.ts`
- Create: `playwright.config.ts`

**Interfaces:**
- Consumes: Auth pages from Task 8
- Produces: E2E tests for auth flow

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install
```

- [ ] **Step 2: Create Playwright config**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

- [ ] **Step 3: Create auth E2E tests**

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('can navigate to login page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Sign in')
    await expect(page).toHaveURL('/login')
  })

  test('can navigate to register page', async ({ page }) => {
    await page.goto('/login')
    await page.click('text=Sign up')
    await expect(page).toHaveURL('/register')
  })

  test('shows validation errors on login', async ({ page }) => {
    await page.goto('/login')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Invalid email address')).toBeVisible()
  })

  test('shows validation errors on register', async ({ page }) => {
    await page.goto('/register')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Invalid email address')).toBeVisible()
  })
})
```

- [ ] **Step 4: Run E2E tests**

```bash
npm run test:e2e
```

Expected: Tests pass (some may be skipped if no Supabase connection)

- [ ] **Step 5: Commit**

```bash
git add tests/e2e/ playwright.config.ts
git commit -m "test: add auth E2E tests"
```

---

### Task 12: Update Package.json Scripts

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: Updated npm scripts

- [ ] **Step 1: Add test scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore: add test scripts to package.json"
```

---

## Self-Review Checklist

- [ ] **Spec coverage:** All core infrastructure requirements covered (Next.js setup, Supabase integration, database schema, RLS policies, auth system)
- [ ] **Placeholder scan:** No TBD/TODO/placeholders found
- [ ] **Type consistency:** Database types generated, validation schemas consistent
- [ ] **File paths:** All file paths are exact and consistent
- [ ] **Commands:** All commands are runnable with expected outputs

---

**Plan complete and saved to `docs/superpowers/plans/2026-08-16-foundation-setup.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
