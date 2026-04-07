export interface ProjectSpec {
  label: string;
  value: string;
}

export interface SimulationResult {
  label: string;
  value: string;
  expected: string;
  pass: boolean;
}

export interface CodeFile {
  language: string;
  label: string;
  filename: string;
  code: string;
}

export interface ProjectDetails {
  highlights?: string[];
  specs?: ProjectSpec[];
  simulationResults?: SimulationResult[];
  /** legacy single-file — still supported */
  codeSnippet?: { language: string; label: string; code: string };
  /** multi-file code viewer */
  codeFiles?: CodeFile[];
  designNotes?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  gallery_images?: string[];
  github_url?: string;
  demo_url?: string;
  completion_date?: string;
  technologies?: string[];
  featured?: boolean;
  details?: ProjectDetails;
}
