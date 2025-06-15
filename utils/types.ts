export type Props = {
  data: State;
};

export type PropsUser = {
  data: StateUser;
};

export type PropsID = {
  data: StateID;
};

export type StateUser = {
  username: string;
};

export type State = {
  username: string;
  characters: Character[];
  page: number;
  tPages: number;
};

export type Character = {
  id: string;
  name: string;
  house: string;
  image: string;
  favorite?: boolean;
};

export type StateID = {
  username: string;
  characters: CharacterID;
};

export type CharacterID = {
  id: string;
  name: string;
  house: string;
  image: string;
  species: string;
  gender: string;
  dateOfBirth: string;
  wizard: boolean;
  actor: string;
};