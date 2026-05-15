import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PetList from './PetList';

export default function Lobby({ user }: { user: any }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ padding: 20, color: 'white' }}>
      <h1>欢迎，{user.email}</h1>
      <button onClick={() => navigate('/battle')} style={{ padding: 12, marginRight: 10 }}>
        匹配对战
      </button>
      <button onClick={handleLogout} style={{ padding: 12 }}>登出</button>
      <h2>我的精灵</h2>
      <PetList user={user} />
    </div>
  );
}
