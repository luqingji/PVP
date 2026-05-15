import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import BattleScene from '../scenes/BattleScene';

export default function Battle({ user }: { user: any }) {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 500,
      parent: 'phaser-container',
      backgroundColor: '#0f0f23',
      scene: [BattleScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    gameRef.current.events.once('ready', () => {
      gameRef.current?.scene.start('BattleScene', { userId: user.id });
    });

    return () => {
      gameRef.current?.destroy(true);
    };
  }, [user.id]);

  return <div id="phaser-container" style={{ width: '100%', height: '100%' }} />;
}
