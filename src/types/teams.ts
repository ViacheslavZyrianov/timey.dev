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
  display_name: string;
  photoURL: string;
};
