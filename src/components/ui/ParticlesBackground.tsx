import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";

import { MoveDirection, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

import bootstrapicon from "../../assets/particles/logo-bootstrap.svg"
import htmlicon from "../../assets/particles/logo-html-5.svg"
import javascripticon from "../../assets/particles/logo-javascript.svg"
import mongoicon from "../../assets/particles/logo-mongodb.svg"
import nextjsicon from "../../assets/particles/logo-nextjs.svg"
import nodejsicon from "../../assets/particles/logo-nodejs.svg"
import phpicon from "../../assets/particles/logo-php.svg"
import reacticon from "../../assets/particles/logo-react.svg"
import reactnativeicon from "../../assets/particles/logo-reactnative.svg"
import sqlicon from "../../assets/particles/logo-sql.svg"
import typescripticon from "../../assets/particles/logo-typescript.svg"
import cssicon from "../../assets/particles/logos-css-3.svg"

const ParticlesBackground = () => {
  const [init, setInit] = useState<boolean>(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // const particlesLoaded = async (container?: Container): Promise<void> => {
  //   console.log(container);
  // };

  const options: ISourceOptions = useMemo(() => ({
      fullScreen: {
        enable: true,
        zIndex: 1,
      },
      detectRetina: true,
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: ["push"],
          },
          onDiv: [
            {
              enable: false,
              selectors: "#repulse-div",
              mode: "repulse",
            },
          ],
          onHover: {
            enable: true,
            mode: ["bubble"],
            parallax: {
              enable: false,
              force: 60,
              smooth: 10,
            },
          },
          resize: { enable: true },
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 2,
          },
          connect: {
            distance: 80,
            radius: 60,
            links: {
              opacity: 0.5,
            },
          },
          grab: {
            distance: 400,
            links: {
              opacity: 1,
            },
          },
          push: {
            quantity: 2,
          },
          remove: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          blink: false,
          color: "#000000",
          consent: false,
          distance: 150,
          enable: false,
          opacity: 0.4,
          width: 1,
        },
        move: {
          attract: {
            enable: false,
            rotate: {
              x: 600,
              y: 1200,
            },
          },
          bounce: false,
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          // limit: 20, // Removed to match the expected type
          value: 15,
        },
        opacity: {
          value: {
            min: 0.2,
            max: 1,
          },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        rotate: {
          value: 0,
          random: true,
          animation: {
            enable: true,
            speed: 5,
            sync: false,
          },
          direction: "random",
        },
        shape: {
          type: "image",
          options: {
            image: [
              { src: bootstrapicon, width: 20, height: 20 },
              { src: htmlicon, width: 20, height: 20 },
              { src: javascripticon, width: 20, height: 20 },
              { src: mongoicon, width: 20, height: 20 },
              { src: nextjsicon, width: 20, height: 20 },
              { src: nodejsicon, width: 20, height: 20 },
              { src: phpicon, width: 20, height: 20 },
              { src: phpicon, width: 20, height: 20 },
              { src: reacticon, width: 20, height: 20 },
              { src: reactnativeicon, width: 20, height: 20 },
              { src: sqlicon, width: 20, height: 20 },
              { src: typescripticon, width: 20, height: 20 },
              { src: cssicon, width: 20, height: 20 },
            ],
          },
        },
        size: {
          value: 16,
          random: false,
          animation: {
            enable: false,
            speed: 70,
            minimumValue: 0.1,
            sync: false,
          },
        },
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      polygon: {
        draw: {
          enable: false,
          lineColor: "#ffffff",
          lineWidth: 0.5,
        },
        move: {
          radius: 10,
        },
        scale: 1,
        url: "",
      },
      background: {
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover",
      },
  }),[]);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        // particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export { ParticlesBackground };
