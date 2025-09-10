import type { CardTypes } from "../types";

type Options = { signal?: AbortSignal };

type GitHubAPIRepo = {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  owner: { login: string; avatar_url: string };
  updated_at: string;
};

export async function searchRepos(
  query: string,
  per_page = 30,
  page = 1,
  opts?: Options
): Promise<CardTypes[]> {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const params = new URLSearchParams({
    q: query,
    per_page: String(per_page),
    page: String(page),
  });
  const res = await fetch(
    `https://api.github.com/search/repositories?${params.toString()}`,
    {
      headers: token ? { Authorization: `token ${token}` } : undefined,
      signal: opts?.signal,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${text}`);
  }

  const { items = [] } = (await res.json()) as { items?: GitHubAPIRepo[] };

  // normalize to Repo type (we keep only fields we need)
  return items.map((it) => ({
    id: it.id,
    full_name: it.full_name,
    html_url: it.html_url,
    description: it.description,
    stargazers_count: it.stargazers_count,
    language: it.language,
    owner: { login: it.owner.login, avatar_url: it.owner.avatar_url },
    updated_at: it.updated_at,
  }));
}
