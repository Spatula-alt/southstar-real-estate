
-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  municipality TEXT,
  property_id TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating_overall INTEGER NOT NULL DEFAULT 5,
  rating_service INTEGER NOT NULL DEFAULT 5,
  rating_hospitality INTEGER NOT NULL DEFAULT 5,
  rating_affordability INTEGER NOT NULL DEFAULT 5,
  rating_trust INTEGER NOT NULL DEFAULT 5,
  feedback TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS policies: public can insert, only authenticated can read (for admin)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can insert messages/appointments/reviews
CREATE POLICY "Anyone can insert contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews" ON public.reviews FOR SELECT USING (status = 'approved');

-- Authenticated users can read all (for admin dashboard)
CREATE POLICY "Authenticated can read all contact_messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read all appointments" ON public.appointments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read all reviews" ON public.reviews FOR SELECT TO authenticated USING (true);

-- Authenticated users can update status
CREATE POLICY "Authenticated can update contact_messages" ON public.contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can update appointments" ON public.appointments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can update reviews" ON public.reviews FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
