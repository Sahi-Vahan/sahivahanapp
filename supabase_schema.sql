-- ==============================================================================
-- SAHIVAHAN PRODUCTION SUPABASE DATABASE SCHEMA
-- Version: 1.0.0
-- Architecture: Lead-to-Organization Dispatch, Dynamic Catalogs & Moderated Reviews
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES / USERS TABLE (Linked with Supabase Auth auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 2. PARTNER ORGANIZATIONS TABLE
-- Inspection and diagnostic partner companies in each metro cluster
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
    id TEXT PRIMARY KEY, -- e.g. 'ORG-BLR-001'
    name TEXT NOT NULL,
    gstin TEXT NOT NULL UNIQUE,
    contact_person TEXT NOT NULL,
    designation TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    cities TEXT[] NOT NULL DEFAULT '{}',
    vehicle_types TEXT[] NOT NULL DEFAULT '{car, bike}',
    sla_hours INTEGER NOT NULL DEFAULT 4,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending_verification')),
    lead_count INTEGER NOT NULL DEFAULT 0,
    completed_count INTEGER NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Organizations (Readable by authenticated users/admins, writable by admins)
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Organizations viewable by authenticated users" 
ON public.organizations FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Organizations manageable by admin role" 
ON public.organizations FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ------------------------------------------------------------------------------
-- 3. INSPECTION SERVICES CATALOG TABLE (Dynamic Services)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('car', 'bike', 'commercial', 'ev')),
    tagline TEXT NOT NULL,
    badge TEXT,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    duration TEXT NOT NULL,
    checklist_count INTEGER NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    description TEXT NOT NULL,
    popular BOOLEAN DEFAULT false,
    icon_name TEXT DEFAULT 'ShieldCheck',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Services (Publicly readable)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active services are viewable by everyone" 
ON public.services FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage services" 
ON public.services FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ------------------------------------------------------------------------------
-- 4. INSPECTION QUERIES / LEADS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.queries (
    id TEXT PRIMARY KEY, -- e.g. 'SV-INQ-2026-8941'
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('car', 'bike', 'commercial', 'ev')),
    vehicle_make_model TEXT NOT NULL,
    vehicle_year INTEGER NOT NULL,
    vehicle_reg_number TEXT,
    service_id TEXT REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT NOT NULL,
    inspection_address TEXT NOT NULL,
    city TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time_slot TEXT NOT NULL,
    customer_notes TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'assigned', 'in_progress', 'completed', 'cancelled')),
    assigned_org_id TEXT REFERENCES public.organizations(id) ON DELETE SET NULL,
    assigned_org_name TEXT,
    assigned_at TIMESTAMPTZ,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Queries
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own inspection query" 
ON public.queries FOR INSERT WITH CHECK (
    auth.uid() = user_id OR auth.role() = 'anon'
);

CREATE POLICY "Users can view their own queries" 
ON public.queries FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can update and manage all queries" 
ON public.queries FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_queries_status ON public.queries(status);
CREATE INDEX IF NOT EXISTS idx_queries_city ON public.queries(city);
CREATE INDEX IF NOT EXISTS idx_queries_assigned_org ON public.queries(assigned_org_id);

-- ------------------------------------------------------------------------------
-- 5. FEEDBACK / REVIEWS TABLE (Moderated)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.feedbacks (
    id TEXT PRIMARY KEY, -- e.g. 'REV-1001'
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    vehicle_info TEXT NOT NULL,
    city TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT NOT NULL,
    comment TEXT NOT NULL,
    would_recommend BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected')),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Feedback
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved reviews are publicly viewable" 
ON public.feedbacks FOR SELECT USING (
    status = 'approved' OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Authenticated users can submit feedback" 
ON public.feedbacks FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
);

CREATE POLICY "Admins have full control over reviews" 
ON public.feedbacks FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ------------------------------------------------------------------------------
-- 6. BLOGS TABLE (Dynamic Automotive Guides)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    author_role TEXT NOT NULL,
    read_time TEXT NOT NULL,
    cover_image TEXT,
    tags TEXT[] NOT NULL DEFAULT '{}',
    is_published BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blogs are viewable by everyone" 
ON public.blogs FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage blogs" 
ON public.blogs FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

