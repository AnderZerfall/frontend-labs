import { Project } from "./models/Project.js";

const projects = [
  new Project({
    name: "Alpha",
    country: "Ukraine",
    team: 5,
    duration: 12,
    cost: 10000,
  }),
  new Project({
    name: "Beta",
    country: "USA",
    team: 3,
    duration: 8,
    cost: 15000,
  }),
  new Project({
    name: "Gamma",
    country: "Japan",
    team: 7,
    duration: 18,
    cost: 20000,
  }),
  new Project({
    name: "Delta",
    country: "France",
    team: 5,
    duration: 10,
    cost: 12000,
  }),
  new Project({
    name: "Epsilon",
    country: "Germany",
    team: 4,
    duration: 9,
    cost: 11000,
  }),
  new Project({
    name: "Zeta",
    country: "Brazil",
    team: 6,
    duration: 15,
    cost: 13000,
  }),
  new Project({
    name: "Eta",
    country: "USA",
    team: 5,
    duration: 20,
    cost: 14000,
  }),
  new Project({
    name: "Theta",
    country: "Ukraine",
    team: 3,
    duration: 7,
    cost: 9000,
  }),
  new Project({
    name: "Iota",
    country: "Japan",
    team: 8,
    duration: 14,
    cost: 22000,
  }),
  new Project({
    name: "Kappa",
    country: "France",
    team: 5,
    duration: 11,
    cost: 12500,
  }),
];

// Task 1.1
const sortByCountryAndMeanCost = () =>
  [...projects].sort((first, second) =>
    first.country.localeCompare(second.country)
  );

// Task 1.2
const findAvarageCostByTeam = () => {
  const groupCostByTeam = projects.reduce((acc, current) => {
    acc[current.team] = acc[current.team] ?? [];
    acc[current.team].push(current.cost);

    return acc;
  }, {});

  return Object.keys(groupCostByTeam).map((key) => ({
    team: key,
    meanCost:
      groupCostByTeam[key].length > 0
        ? groupCostByTeam[key].reduce((acc, current) => acc + current, 0) /
          groupCostByTeam[key].length
        : 0,
  }));
};

// Task 1.3
const findProjectWithMaxTeam = () => {
  const maxTeamSize = Math.max(...projects.map((p) => p.team));

  const project =
    projects.filter((project) => project.team === maxTeamSize) ?? [];

  return project[0];
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
  let multiplier = 1;

  for (const currentProject of projects) {
    if (project.id === currentProject.id) continue;

    const isInTheSameContinent =
      Continents[currentProject.country] === Continents[project.country];
    const isInTheSameCountry = currentProject.country === project.country;
    const hasBiggerTeam = currentProject.team > project.team;
    const hasLowerCost = project.cost > currentProject.cost;

    if (
      isInTheSameContinent &&
      !isInTheSameCountry &&
      hasBiggerTeam &&
      hasLowerCost
    ) {
      multiplier = 1.4;
      break;
    }

    if (!isInTheSameContinent && hasBiggerTeam && hasLowerCost) {
      multiplier = 1.6;
      break;
    }

    if (!isInTheSameContinent && hasBiggerTeam && !hasLowerCost) {
      multiplier = 2;
      break;
    }

    if (isInTheSameCountry && hasLowerCost) {
      multiplier = 0.8;
      break;
    }
  }

  return project.cost * multiplier;
};

const main = () => {
  const task1Result = sortByCountryAndMeanCost();
  const task2Result = findAvarageCostByTeam();
  const task3Result = findProjectWithMaxTeam();
  const task4Result = addProject(
    new Project({
      name: "Test",
      country: "Ukraine",
      team: 4,
      cost: 16000,
      duration: 2,
    })
  );

  const task42Result = addProject(
    new Project({
      team: 4,
      cost: 16000,
      duration: 2,
    })
  );

  console.log("--- Task 1 ---");
  console.log(task1Result);

  console.log("--- Task 2 ---");
  console.log(task2Result);

  console.log("--- Task 3 ---");
  console.log(
    `Max Team Size (${task3Result.team}) has Project #: ${task3Result.id}`
  );

  console.log("--- Task 4 ---");
  console.log("--- Add full project Supposed to appear as the 3rd object) ---");
  console.log(task4Result);
  console.log("--- Add partial project (Supposed to appear in the end) ---");
  console.log(task42Result);
};

main();
