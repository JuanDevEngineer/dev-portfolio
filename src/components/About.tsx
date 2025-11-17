import { FC } from "react";
import { Icon } from "@iconify/react";
import { BasicInfo } from "../types";

interface AboutProps {
  sharedBasicInfo?: BasicInfo;
  resumeBasicInfo?: {
    "description_header": string,
    "description": string,
    "section_name": {
        "about": string,
        "projects": string,
        "skills": string,
        "experience": string
    }
  } 
}

const About: FC<AboutProps> = ({ sharedBasicInfo, resumeBasicInfo }) => {
  const profilepic = sharedBasicInfo ? "images/" + sharedBasicInfo.image : null;
  const sectionName = resumeBasicInfo?.section_name?.about;
  const hello = resumeBasicInfo?.description_header;
  const about = resumeBasicInfo?.description;

  return (
    <section id="about">
      <div className="col-md-12">
        <h1 style={{ color: "black" }}>
          <span className="underline">{sectionName}</span>
        </h1>
        <div className="row center mx-auto mb-5">
          <div className="col-md-4 mb-5 center">
            <div className="polaroid">
              <span style={{ cursor: "auto" }}>
                {profilepic && (
                  <img
                    height="320px"
                    width="550px"
                    src={profilepic}
                    alt="Avatar placeholder"
                  />
                )}
                <Icon
                  icon='logos:nodejs-icon'
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
                <Icon
                  icon='logos:react'
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
                <Icon
                  icon='logos:typescript-icon'
                  style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                />
              </span>
            </div>
          </div>

          <div className="col-md-8 center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <span
                    className="iconify"
                    data-icon="emojione:red-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                  }}
                >
                  <br />
                  <span className="wave">{hello} :) </span>
                  <br />
                  <br />
                  {about}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
