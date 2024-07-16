export type TypeTeamRead = {
  id: string;
  name: string;
  description: string;
  members: string[];
};

export type TypeTeamCreate = {
  name: string;
  description: string;
};

export type TypeTeamMemberRead = {
  id: string;
  photoURL: string;
  display_name: string;
  email: string;
};
