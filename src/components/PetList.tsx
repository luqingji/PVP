import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Pet } from '../types';

export default function PetList({ user }: { user: any }) {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    supabase
      .from('player_sprites')
      .select('*')
      .eq('owner_id', user.id)
      .then(({ data }) => setPets(data || []));
  }, [user.id]);

  return (
    <div>
      {pets.length === 0 ? <p>暂无精灵</p> : pets.map(pet => (
        <div key={pet.id} style={{ border: '1px solid gray', margin: 5, padding: 5 }}>
          名字: {pet.nickname || '未命名'} | Lv.{pet.level} | 经验: {pet.exp}
        </div>
      ))}
    </div>
  );
}
