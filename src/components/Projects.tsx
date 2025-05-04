import { useState } from "react";
import { ProjectDetailsModal } from "./ProjectDetailsModal";

const Projects = ({ resumeProjects, resumeBasicInfo }) => {
  const [deps, setDeps] = useState({});
  const [detailsModalShow, setDetailsModalShow] = useState<boolean>(false);

  const handleDetailsModalShow = (data) => {
    console.log(data)
    setDeps(data);
    setDetailsModalShow(true);
  };

  const handleDetailsModalClose = () => {
    setDetailsModalShow(false);
  };

  if (!resumeProjects || !resumeBasicInfo) return null;

  const sectionName = resumeBasicInfo.section_name.projects;

  const projectItems = resumeProjects.map((project) => (
    <div
      className="col-sm-12 col-md-6 col-lg-4"
      key={project.title}
      style={{ cursor: "pointer" }}
    >
      <span className="portfolio-item d-block">
        <div className="foto" onClick={() => handleDetailsModalShow(project)}>
          <div>
            <img
              src={project.images[0]}
              alt="projectImages"
              height="230"
              style={{ marginBottom: 0, paddingBottom: 0, position: "relative" }}
            />
            <span className="project-date">{project.startDate}</span>
            <br />
            <p className="project-title-settings mt-3">{project.title}</p>
          </div>
        </div>
      </span>
    </div>
  ));

  return (
    <section id="projects">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span className="underline">{sectionName}</span>
        </h1>
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto">{projectItems}</div>
        </div>
        <ProjectDetailsModal
          show={detailsModalShow}
          onHide={handleDetailsModalClose}
          data={deps}
        />
      </div>
    </section>
  );
};

export default Projects;