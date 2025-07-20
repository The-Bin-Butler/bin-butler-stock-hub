import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRoles } from '@/hooks/useUserRoles';
import Layout from '@/components/Layout';
import StaffDashboard from '@/components/StaffDashboard';
import TeamLeaderDashboard from '@/components/TeamLeaderDashboard';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const { canManageInventory, isOwner, isLoading: rolesLoading, roles } = useUserRoles();

  console.log('Index page - user:', user?.id);
  console.log('Index page - roles:', roles);
  console.log('Index page - isOwner:', isOwner);
  console.log('Index page - canManageInventory:', canManageInventory);
  console.log('Index page - should show TeamLeaderDashboard:', (canManageInventory || isOwner));

  if (loading || rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Layout>
      {(canManageInventory || isOwner) ? <TeamLeaderDashboard /> : <StaffDashboard />}
    </Layout>
  );
};

export default Index;
