import { FC } from "react";
import Modal from "react-bootstrap/Modal";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProjectDetailsModalProps {
  data?: {
    title: string;
    description: string;
    url?: string;
    technologies?: { class: string; name: string }[];
    images?: string[];
  };
  onHide: () => void;
  [key: string]: unknown;
}

const ProjectDetailsModal: FC<ProjectDetailsModalProps> = ({
  data,
  onHide,
  ...modalProps
}) => {
  if (!data) return null;

  const { title, description, url, technologies = [], images = [] } = data;

  const renderTechnologies = () =>
    technologies.map((tech, index) => (
      <li className="list-inline-item mx-3" key={index}>
        <div className="text-center">
          <i className={tech.class} style={{ fontSize: "300%" }}>
            <p style={{ fontSize: "30%" }}>{tech.name}</p>
          </i>
        </div>
      </li>
    ));

  return (
    <Modal
      {...modalProps}
      centered
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="project-details-modal"
      className="modal-inside"

    >
      <span onClick={onHide} className="modal-close">
        <i className="fas fa-times fa-3x close-icon"></i>
      </span>

      <div className="col-md-12">
        <div className="col-md-10 mx-auto pb-5">
          <div className="slider-tab d-flex gap-2 mb-3">
            <span
              className="iconify slider-iconfiy"
              data-icon="emojione:red-circle"
              data-inline="false"
            ></span>
            <span
              className="iconify slider-iconfiy"
              data-icon="twemoji:yellow-circle"
              data-inline="false"
            ></span>
            <span
              className="iconify slider-iconfiy"
              data-icon="twemoji:green-circle"
              data-inline="false"
            ></span>
          </div>

          <Swiper
            modules={[EffectFade, Navigation, Pagination]}
            effect="fade"
            navigation
            pagination={{ clickable: true }}
            loop
            className="slider-image"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img src={src} alt={`Slide ${index + 1}`} className="w-100" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="col-md-10 mx-auto">
          <h3 className="mb-3">
            {title}
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-href ms-2"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            )}
          </h3>

          <p className="modal-description">{description}</p>

          <div className="text-center">
            <ul className="list-inline mx-auto">{renderTechnologies()}</ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ProjectDetailsModal };
