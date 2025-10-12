import { MenuConfig, TaskConfig } from "./models/MenuConfig.js";
import { Project } from "./models/Project.js";

const projects = [
  new Project({
    name: "Alpha",
    country: "UA",
    team: 5,
    duration: 12,
    cost: 10000,
  }),
  new Project({
    name: "Beta",
    country: "US",
    team: 3,
    duration: 8,
    cost: 15000,
  }),
  new Project({
    name: "Gamma",
    country: "JP",
    team: 7,
    duration: 18,
    cost: 20000,
  }),
  new Project({
    name: "Delta",
    country: "FR",
    team: 5,
    duration: 10,
    cost: 12000,
  }),
  new Project({
    name: "Epsilon",
    country: "DE",
    team: 4,
    duration: 9,
    cost: 11000,
  }),
  new Project({
    name: "Zeta",
    country: "BR",
    team: 6,
    duration: 15,
    cost: 13000,
  }),
  new Project({
    name: "Eta",
    country: "US",
    team: 5,
    duration: 20,
    cost: 14000,
  }),
  new Project({
    name: "Theta",
    country: "UA",
    team: 3,
    duration: 7,
    cost: 9000,
  }),
  new Project({
    name: "Iota",
    country: "JP",
    team: 8,
    duration: 14,
    cost: 22000,
  }),
  new Project({
    name: "Kappa",
    country: "FR",
    team: 5,
    duration: 11,
    cost: 12500,
  }),
];

const CONTINENTS = {
  Europe: ["FR", "DE", "IT", "ES", "UA"],
  Asia: ["CN", "IN", "JP", "KR", "VN"],
  Africa: ["NG", "EG", "ZA", "KE", "MA"],
  NorthAmerica: ["US", "CA", "MX"],
  SouthAmerica: ["BR", "AR", "CO", "CL"],
  Oceania: ["AU", "NZ"],
  Antarctica: [],
};

// Task 1.1
const sortByCountryAndMeanCost = () => {
  const sorted = [...projects].sort((first, second) =>
    first.country.localeCompare(second.country)
  );

  console.log(sorted);
};

// Task 1.2
const findAvarageCostByTeam = () => {
  const groupCostByTeam = projects.reduce((acc, current) => {
    acc[current.team] = acc[current.team] ?? [];
    acc[current.team].push(current.cost);

    return acc;
  }, {});

  const result = Object.keys(groupCostByTeam).map((key) => ({
    team: key,
    meanCost:
      groupCostByTeam[key].length > 0
        ? groupCostByTeam[key].reduce((acc, current) => acc + current, 0) /
          groupCostByTeam[key].length
        : 0,
  }));

  console.log(result);
};

// Task 1.3
const findProjectWithMaxTeam = () => {
  const maxTeamSize = Math.max(...projects.map((p) => p.team));

  const project =
    projects.filter((project) => project.team === maxTeamSize) ?? [];

  console.log(
    `Max Team Size (${project[0].team}) has Project #: ${project[0].id}`
  );
};

// Task 1.4
const addProject = (project) => {
  const listProjects = [...projects];

  const isFull = Object.values(project).every(Boolean);

  const index = listProjects.findIndex((p) => p.cost > project.cost);

  if (!isFull || index === -1) {
    listProjects.push(project);
    return listProjects;
  }

  listProjects.splice(index, 0, project);

  return listProjects;
};

// Task 1.5

const calculateNewCost = (project) => {
  for (const currentProject of projects) {
    if (project.getId() === currentProject.getId()) continue;

    const isInTheSameContinent =
      CONTINENTS[currentProject.country] === CONTINENTS[project.country];
    const isInTheSameCountry = currentProject.country === project.country;
    const hasBiggerTeam = currentProject.team > project.team;
    const hasLowerCost = project.cost > currentProject.cost;

    if (hasBiggerTeam) {
      if (!isInTheSameContinent) {
        project.cost *= hasLowerCost ? 1.6 : 2;
        break;
      }

      if (!isInTheSameCountry && hasLowerCost) {
        project.cost *= 1.4;
        break;
      }
    }

    if (isInTheSameCountry && hasLowerCost) {
      project.cost *= 0.8;
      break;
    }
  }

  return project;
};

export const main = () => {
  const config = new MenuConfig([
    new TaskConfig({
      id: 1,
      name: "Sort projrect by country and fine the mean cost",
      run: sortByCountryAndMeanCost,
    }),
    new TaskConfig({
      id: 2,
      name: "Find Avarage project const by team size",
      run: findAvarageCostByTeam,
    }),
    new TaskConfig({
      id: 3,
      name: "Find the project with the biggest team size",
      run: findProjectWithMaxTeam,
    }),
    new TaskConfig({
      id: 4,
      name: "Add Project in the end or in between depending on the condition",
      run: () => {
        const result1 = addProject(
          new Project({
            name: "Test",
            country: "Ukraine",
            team: 4,
            cost: 16000,
            duration: 2,
          })
        );

        console.log(
          "--- Add full project Supposed to appear as the 3rd object) ---"
        );
        console.log(result1);

        const result2 = addProject(
          new Project({
            team: 4,
            cost: 16000,
            duration: 2,
          })
        );

        console.log(
          "--- Add partial project (Supposed to appear in the end) ---"
        );
        console.log(result2);
      },
    }),
    new TaskConfig({
      id: 5,
      name: "Calculate new Project cost depending on the condition",
      run: () => {
        const updatedProject = calculateNewCost(
          new Project({
            name: "Kappa",
            country: "France",
            team: 5,
            duration: 11,
            cost: 12500,
          })
        );

        console.log(updatedProject);
      },
    }),
  ]);

  config.run();
};
