-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  is_new BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view announcements)
CREATE POLICY "Announcements are viewable by everyone" 
ON public.announcements 
FOR SELECT 
USING (true);

-- Create policy for insert (no auth required for developer mode)
CREATE POLICY "Anyone can insert announcements" 
ON public.announcements 
FOR INSERT 
WITH CHECK (true);

-- Create policy for update (no auth required for developer mode)
CREATE POLICY "Anyone can update announcements" 
ON public.announcements 
FOR UPDATE 
USING (true);

-- Create policy for delete (no auth required for developer mode)
CREATE POLICY "Anyone can delete announcements" 
ON public.announcements 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_announcements_updated_at
BEFORE UPDATE ON public.announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for announcement images
INSERT INTO storage.buckets (id, name, public) VALUES ('announcements', 'announcements', true);

-- Create policies for announcement image uploads
CREATE POLICY "Announcement images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'announcements');

CREATE POLICY "Anyone can upload announcement images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'announcements');

CREATE POLICY "Anyone can update announcement images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'announcements');

CREATE POLICY "Anyone can delete announcement images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'announcements');