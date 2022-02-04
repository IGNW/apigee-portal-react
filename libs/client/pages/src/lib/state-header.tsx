import { firebaseAuth } from '@cdw/client/database';
import { Header } from '@cdw/components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export function StateHeader() {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const navigate = useNavigate();
  const handleSignOut = () => {
    firebaseAuth.signOut().then(() => {
      console.log('Signed out');
      navigate('/login');
    });
  };

  if (!user) return null;

  return <Header onSignOut={handleSignOut} />;
}

export default StateHeader;
