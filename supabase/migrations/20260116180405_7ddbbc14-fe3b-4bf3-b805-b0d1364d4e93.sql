-- Add DELETE policy to profiles table that prevents all deletions
-- This maintains data integrity by ensuring profile records cannot be deleted
CREATE POLICY "Profiles cannot be deleted"
ON public.profiles
FOR DELETE
USING (false);