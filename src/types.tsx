export type CardTypes = {
  id: number;
  full_name: string;
  html_url: string;
  description?: string | null;
  stargazers_count: number;
  language?: string | null;
  owner: { login: string; avatar_url: string };
  updated_at: string;
};
