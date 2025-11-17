export interface Lang {
  basic_info: BasicInfo;
  projects:   Project[];
  experience: Experience[];
  menu?: Menu[];
}

export interface BasicInfo {
  description_header: string;
  description:        string;
  section_name:       SectionName;
}

export interface SectionName {
  about:      string;
  projects:   string;
  skills:     string;
  experience: string;
}

export interface Experience {
  company:      string;
  title:        string;
  years:        string;
  mainTech:     string[];
  technologies: string[];
}

export interface Project {
  title:        string;
  startDate:    string;
  description:  string;
  images:       string[];
  url:          string;
  technologies: Technology[];
}

export interface Technology {
  class: string;
  name:  string;
}

export interface Menu {
  name: string
}