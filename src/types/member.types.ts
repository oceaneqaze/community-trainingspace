
export type Member = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
  banned?: boolean;
  limited?: boolean;
  invitation_code?: string;
  invitation_used?: boolean;
};
