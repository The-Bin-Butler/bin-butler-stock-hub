import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

type UserRole = 'owner' | 'team_leader' | 'staff' | 'bin_cleaner' | 'bin_team_leader' | 'admin_staff' | 'admin_leader';

export function useUserRoles() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setRoles([]);
      setIsLoading(false);
      return;
    }

    const fetchUserRoles = async () => {
      try {
        console.log('Fetching roles for user:', user.id);
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        console.log('Roles data:', data);
        console.log('Roles error:', error);

        if (error) {
          console.error('Error fetching user roles:', error);
          setRoles(['staff']); // Default to staff role
        } else {
          const userRoles = data?.map(r => r.role as UserRole) || ['staff'];
          console.log('User roles set to:', userRoles);
          setRoles(userRoles);
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setRoles(['staff']); // Default to staff role
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRoles();
  }, [user]);

  const hasRole = (role: UserRole): boolean => {
    return roles.includes(role);
  };

  const isOwner = hasRole('owner');
  const isTeamLeader = hasRole('team_leader');
  const isStaff = hasRole('staff');

  // Check if user can manage inventory (team leaders and owners)
  const canManageInventory = isOwner || isTeamLeader;
  
  // Check if user can view admin features (owners only)
  const canViewAdminFeatures = isOwner;

  console.log('Current user roles:', roles);
  console.log('isOwner:', isOwner, 'isTeamLeader:', isTeamLeader, 'canManageInventory:', canManageInventory);

  return {
    roles,
    isLoading,
    hasRole,
    isOwner,
    isTeamLeader,
    isStaff,
    canManageInventory,
    canViewAdminFeatures
  };
}