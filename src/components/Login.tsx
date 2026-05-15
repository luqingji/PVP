import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMessage(error.message);
    else setMessage('魔法链接已发送到邮箱，点击链接登录！');
  };

  return (
    <div style={{ padding: 40, color: 'white', textAlign: 'center' }}>
      <h1>数据精灵：PvP</h1>
      <input
        type="email"
        placeholder="输入邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, marginRight: 10 }}
      />
      <button onClick={handleMagicLink} style={{ padding: 10 }}>
        发送登录链接
      </button>
      <p>{message}</p>
    </div>
  );
}
