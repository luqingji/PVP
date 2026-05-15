import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Login from './components/Login';
import Lobby from './components/Lobby';
import Battle from './components/Battle';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: 40 }}>加载中...</div>;

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route
          path="/"
          element={user ? <Lobby user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/battle"
          element={user ? <Battle user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
