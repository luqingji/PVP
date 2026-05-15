export interface Pet {
  id: string;
  owner_id: string;
  base_id: number;
  nickname: string | null;
  level: number;
  exp: number;
  iv_hp: number;
  iv_atk: number;
  iv_def: number;
  iv_spd: number;
  is_shiny: boolean;
}

export interface SpriteBase {
  id: number;
  name: string;
  element: string;
  base_hp: number;
  base_atk: number;
  base_def: number;
  base_spd: number;
  image_url: string;
}
