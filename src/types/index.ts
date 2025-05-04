export interface Info {
  basic_info: BasicInfo;
  skills: Skills;
}

export interface BasicInfo {
  name: string;
  titles: string[];
  social: Social[];
  image: string;
}

export interface Social {
  name: string;
  url: string;
  class: string;
}

export interface Skills {
  icons: Icon[];
}

export interface Icon {
  name: string;
  class: string;
  level: string;
}
