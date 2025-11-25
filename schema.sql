-- Create the products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subtitle TEXT,
  price NUMERIC NOT NULL,
  description TEXT,
  images TEXT[],
  category TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the boutiques table
CREATE TABLE boutiques (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the profiles table, linking to Supabase's auth.users
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the wishlist table
CREATE TABLE wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

-- Create the cart table
CREATE TABLE cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

-- Enable RLS and create policies

-- Policies for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read for products
CREATE POLICY "Allow public read access to products"
  ON products FOR SELECT
  USING (true);

-- Admin insert (uses profiles.id matching auth.uid())
CREATE POLICY "Allow admin to insert products"
  ON products FOR INSERT
  WITH CHECK (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  );

-- Admin update (only admins can update)
CREATE POLICY "Allow admin to update products"
  ON products FOR UPDATE
  USING (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  )
  WITH CHECK (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  );

-- Admin delete (only admins can delete)
CREATE POLICY "Allow admin to delete products"
  ON products FOR DELETE
  USING (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  );

-- Policies for boutiques
ALTER TABLE boutiques ENABLE ROW LEVEL SECURITY;

-- Public read for boutiques
CREATE POLICY "Allow public read access to boutiques"
  ON boutiques FOR SELECT
  USING (true);

-- Admin insert for boutiques
CREATE POLICY "Allow admin to insert boutiques"
  ON boutiques FOR INSERT
  WITH CHECK (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  );

-- Admin update for boutiques
CREATE POLICY "Allow admin to update boutiques"
  ON boutiques FOR UPDATE
  USING (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  )
  WITH CHECK (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  );

-- Admin delete for boutiques
CREATE POLICY "Allow admin to delete boutiques"
  ON boutiques FOR DELETE
  USING (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  );

-- Policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Allow users to view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Allow users to update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow admin to view all profiles
CREATE POLICY "Allow admin to view all profiles"
  ON profiles FOR SELECT
  USING (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  );

-- (Optional) Allow admin to update profiles
CREATE POLICY "Allow admin to update profiles"
  ON profiles FOR UPDATE
  USING (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  )
  WITH CHECK (
    (SELECT COALESCE(is_admin, false) FROM profiles WHERE id = auth.uid())
  );

-- Policies for wishlist
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Users can SELECT rows where they are the owner
CREATE POLICY "Wishlist select for owner"
  ON wishlist FOR SELECT
  USING (auth.uid() = user_id);

-- Users can INSERT only for themselves
CREATE POLICY "Wishlist insert for owner"
  ON wishlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can UPDATE only their own wishlist rows
CREATE POLICY "Wishlist update for owner"
  ON wishlist FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can DELETE only their own wishlist rows
CREATE POLICY "Wishlist delete for owner"
  ON wishlist FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for cart_items
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Users can SELECT their own cart items
CREATE POLICY "Cart select for owner"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

-- Users can INSERT only for themselves
CREATE POLICY "Cart insert for owner"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can UPDATE only their own cart items
CREATE POLICY "Cart update for owner"
  ON cart_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can DELETE only their own cart items
CREATE POLICY "Cart delete for owner"
  ON cart_items FOR DELETE
  USING (auth.uid() = user_id);