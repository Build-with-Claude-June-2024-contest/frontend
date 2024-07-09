export interface Experience {
  id: number;
  member_id: number;
  title: string;
  location: string;
  company_name: string;
  company_url: string;
  date_from: string;
  date_to: string | null;
  duration: string | null;
  description: string | null;
  created: string;
  last_updated: string;
  deleted: number;
  order_in_profile: number;
  company_id: number;
}

export interface Profile {
  id: number;
  name: string;
  title: string;
  location: string;
  logo_url: string;
  member_experience_collection: Experience[];
  url: string;
}
