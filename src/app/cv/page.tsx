import {
  BiCurrentLocation,
  BiDownload,
  BiEnvelope,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import BaseLayout from "../_components/layout/BaseLayout";
import { Fragment } from "react";
import { baseMetadata } from "@/constants";

export const metadata = baseMetadata("cv", "CV");

const Contact = () => (
  <>
    <h2 className="text-4xl font-bold my-4">Contact</h2>

    <ul>
      <li className="flex gap-2 items-center">
        <BiEnvelope />
        <a
          href="mailto:azharridho42@gmail.com"
          target="_blank"
          rel="me noopener"
        >
          <span>azharridho42@gmail.com</span>
        </a>
      </li>
      <li className="flex gap-2 items-center">
        <BiLogoLinkedinSquare />
        <a
          href="https://www.linkedin.com/in/ridhozhr10/"
          target="_blank"
          rel="me noopener"
        >
          <span>linkedin.com/in/ridhozhr10</span>
        </a>
      </li>
      <li className="flex gap-2 items-center">
        <BiCurrentLocation />
        <span>Depok, Jawa Barat, Indonesia</span>
      </li>
    </ul>
  </>
);

const Profile = () => (
  <>
    <h2 className="text-4xl font-bold my-4">Profile</h2>
    <p>
      I am a versatile software developer, with a specific focus on web
      development.Passionate about informatics, I am dedicated to crafting
      seamless user experiencesand delivering my work with effective
      communication.
    </p>
    <p>
      Grounded in the principles of honesty and simplicity, I approach any
      problem froman adaptive to a technical perspective with commitment to
      swift and efficientresolution.
    </p>
  </>
);

const Skills = () => (
  <>
    <h2 className="text-4xl font-bold my-4">Skills</h2>
    <ul className="list-disc ml-4">
      <li>Javascript & Typescript, Golang, Shell</li>
      <li>CSS & CSS Framework</li>
      <li>Unit & E2E Testing</li>
      <li>RestAPI, gRPC, Web Socket</li>
      <li>SQL (PostgreSQL, MySQL, MariaDB)</li>
      <li>NoSQL (MongoDB, Firestore, Redis)</li>
      <li>Message Broker (RabbitMQ)</li>
      <li>Git & CI/CD Pipelines</li>
      <li>Linux & sh/bash</li>
      <li>Docker & Kubernetes</li>
      <li>Google Cloud Platform</li>
      <li>Teaching & Mentoring</li>
      <li>Agile Framework</li>
    </ul>
  </>
);

const WorkExperience = () => {
  const list = [
    {
      position: "Web Development Lecturer",
      company: "Purwadhika Digital School",
      fromTo: "Jan, 2023 - Dec, 2023",
      daily: [
        "teaching web development bootcamp program",
        "handling technical lead / project manager position for bootcamp final project",
        "providing feedback for alumni to start their career",
      ],
      keypoint: [
        "Teaching",
        "Mentoring",
        "ReactJS/NextJS",
        "Nodejs",
        "Typescript",
        "SQL",
      ],
    },
    {
      position: "Software Engineer",
      company: "PT. Nodeflux Teknologi Indonesia",
      fromTo: "Jan, 2019 - Jun, 2022",
      daily: [
        "Maintaining & developing core product (VisionAIre)",
        "frontend using ReactJS & NextJS",
        "backend using Golang",
        "all packaged using docker image and deployed on GKE",
        "Part of RnD teams for developing IoT product",
        "Monitoring & Reporting problem on production server",
      ],
      keypoint: [
        "Golang",
        "ReactJS",
        "k8s",
        "Gitlab CI/CD",
        "RestAPI",
        "gRPC",
        "PostgreSQL",
        "RabbitMQ",
        "GCP",
      ],
    },
    {
      position: "Fullstack Web Developer",
      company: "PT. Conexus Solusi",
      fromTo: "Feb, 2018 - Jan, 2019",
      daily: [
        "Developing personality assesment application, eg: MBTI, The Predictive Indexe, etc",
        "Managing on-premise server infrastructure",
      ],
      keypoint: [
        "AngularJS",
        "PHP (Laravel)",
        "MySQL",
        "Web Socket",
        "Linux (Ubuntu Server)",
      ],
    },
    {
      position: "Junior Implementor",
      company: "PT. Spasi Indonesia",
      fromTo: "Feb, 2017 - Feb, 2018",
      daily: [
        "Costumizing HRIS specifically for training & development module.",
        "Providing services directly to client / user",
      ],
      keypoint: ["PHP", "SQL Server"],
    },
    {
      position: "Junior Web Developer",
      company: "PT. TNC Digital Media",
      fromTo: "Jun, 2016 - Feb, 2017 ",
      daily: [
        <>
          Creating & costumizing website using wordpress, such as:
          <ul className="list-disc ml-4">
            <li>E-commerce</li>
            <li>Blog</li>
            <li>Company Profile</li>
          </ul>
        </>,
        "Costumizing wordpress plugin & theme",
      ],
      keypoint: ["PHP", "CSS", "Wordpress", "SEO"],
    },
  ];

  return (
    <>
      <h2 className="text-4xl font-bold my-4">Work Experience</h2>
      <ul>
        {list.map((d) => (
          <li key={d.position + d.company} className="mb-5">
            <h3 className="text-lg font-bold">{d.position}</h3>
            <div className="flex mb-2">
              <h4 className="grow">{d.company}</h4>
              <span className="shrink">{d.fromTo}</span>
            </div>
            <ul className="list-disc ml-5">
              {d.daily.map((item, i) => (
                <li key={`${item}${i}`}>{item}</li>
              ))}
            </ul>
            <div className="mt-1">
              {d.keypoint.map((item, i) => (
                <Fragment key={d.company + item}>
                  <span className="font-bold">{item}</span>
                  {i < d.keypoint.length - 1 ? ", " : " "}
                </Fragment>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const Languages = () => (
  <>
    <h2 className="text-4xl font-bold my-4">Languages</h2>
    <ul>
      <li className="grid grid-cols-3 items-center mb-2">
        <span className="col-span-2">Bahasa Indonesia</span>
        <span className="text-sm">Native Speaker</span>
      </li>
      <li className="grid grid-cols-3 items-center">
        <span className="col-span-2">English</span>
        <span className="text-sm">Professional Proficiency</span>
      </li>
    </ul>
  </>
);

const Education = () => (
  <>
    <h2 className="text-4xl font-bold my-4">Education</h2>
    <ul>
      <li className="flex md:flex-col flex-wrap justify-between mb-2">
        <span className="text-lg font-bold w-full">Universitas Terbuka</span>
        <span className="font-bold flex-1">Economy Management</span>
        <span className="text-sm flex-1 max-md:text-right">
          Jan 2023 - Currently (on hold)
        </span>
      </li>
      <li className="flex md:flex-col flex-wrap justify-between mb-2">
        <span className="text-lg font-bold w-full">SMKN 1 Depok</span>
        <span className="font-bold flex-1">Vocational High School</span>
        <span className="text-sm flex-1 max-md:text-right">2013 - 2016</span>
      </li>
    </ul>
  </>
);

export default function CV() {
  return (
    <BaseLayout logoText="cat ~/Documents/CV.md">
      <main className="post">
        <article className="relative">
          <div className="absolute right-[-11rem] max-xl:right-0 h-full">
            <ul className="flex flex-col gap-3 text-3xl sticky top-16 bottom-0 p-2 bg-header-bg-dark rounded-md">
              <li>
                <a
                  title="Download CV"
                  href="/docs/CV-ridho_azhar.pdf"
                  download
                  className="no-underline flex gap-2 items-center"
                >
                  <BiDownload className="inline-block" />
                  <span className="max-xl:hidden text-base">Download CV</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="desktop max-md:hidden grid grid-cols-3 gap-6">
            <div>
              <Contact />
              <Skills />
              <Languages />
              <Education />
            </div>
            <div className="col-span-2">
              <Profile />
              <WorkExperience />
            </div>
          </div>
          <div className="mobile grid grid-flow-row gap-6 md:hidden">
            <div>
              <Contact />
              <Profile />
              <WorkExperience />
              <Skills />
              <Languages />
              <Education />
            </div>
          </div>
        </article>
      </main>
    </BaseLayout>
  );
}
