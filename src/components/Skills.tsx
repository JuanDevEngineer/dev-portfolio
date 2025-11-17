import { FC } from "react";

import { Icon } from "@iconify/react";
import { Icon as IconInfo, ResumeInfo } from "../types";

interface SkillsProps {
  sharedSkills?: { icons: IconInfo[] };
  resumeBasicInfo?: ResumeInfo;
}

const Skills: FC<SkillsProps> = ({ sharedSkills, resumeBasicInfo }) => {
  if (!sharedSkills || !resumeBasicInfo) {
    return null;
  }

  const sectionName = resumeBasicInfo.section_name.skills;

  const skills = sharedSkills.icons.map((skill: IconInfo, i: number) => (
    <div key={i}>
      <span>
        <div className="text-center skills-title">
          <Icon icon={skill.class} width="90" height="90" />
          <p className="text-center">{skill.name}</p>
        </div>
      </span>
    </div>
  ));

  return (
    <section id="skills">
      <div className="col-md-12">
        <div className="col-md-12">
          <h1 className="section-title">
            <span className="skills-text underline">{sectionName}</span>
          </h1>
        </div>
        <div className="skills-list">{skills}</div>
      </div>
    </section>
  );
};

export default Skills;
