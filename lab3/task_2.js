import { User } from "./models/User.js";
import { MenuConfig, TaskConfig } from "./models/MenuConfig.js";
import { Filter } from "./models/Filter.js";

const users = [
  new User({
    name: "John",
    surname: "Smith",
    age: 28,
    education: "Higher",
    detailsLength: 120,
    dateOfRequest: new Date("2025-10-12"),
    timeOfRequest: "09:15",
  }),
  new User({
    name: "Emily",
    surname: "Clark",
    age: 22,
    education: "Secondary",
    detailsLength: 80,
    dateOfRequest: new Date("2025-10-11"),
    timeOfRequest: "14:45",
  }),
  new User({
    name: "Michael",
    surname: "Johnson",
    age: 35,
    education: "Higher",
    detailsLength: 200,
    dateOfRequest: new Date("2025-10-10"),
    timeOfRequest: "11:30",
  }),
  new User({
    name: "Sophia",
    surname: "Davis",
    age: 26,
    education: "College",
    detailsLength: 95,
    dateOfRequest: new Date("2025-10-09"),
    timeOfRequest: "08:00",
  }),
  new User({
    name: "David",
    surname: "Brown",
    age: 40,
    education: "Higher",
    detailsLength: 150,
    dateOfRequest: new Date("2025-10-08"),
    timeOfRequest: "13:20",
  }),
  new User({
    name: "Olivia",
    surname: "Wilson",
    age: 19,
    education: "Secondary",
    detailsLength: 60,
    dateOfRequest: new Date("2025-10-07"),
    timeOfRequest: "10:05",
  }),
  new User({
    name: "James",
    surname: "Miller",
    age: 31,
    education: "Higher",
    detailsLength: 135,
    dateOfRequest: new Date("2025-10-06"),
    timeOfRequest: "15:40",
  }),
  new User({
    name: "Ava",
    surname: "Taylor",
    age: 24,
    education: "College",
    detailsLength: 70,
    dateOfRequest: new Date("2025-10-05"),
    timeOfRequest: "17:25",
  }),
  new User({
    name: "William",
    surname: "Anderson",
    age: 37,
    education: "Higher",
    detailsLength: 180,
    dateOfRequest: new Date("2025-10-04"),
    timeOfRequest: "16:10",
  }),
  new User({
    name: "Isabella",
    surname: "Thomas",
    age: 29,
    education: "Higher",
    detailsLength: 90,
    dateOfRequest: new Date("2025-10-03"),
    timeOfRequest: "12:55",
  }),
];

const MIDDLE_AGE = {
  min: 35,
  max: 55,
};
const SUMMER = [5, 6, 7];

// Task 2.1
const listUsersByDate = (filter) => {
  const onlyDate = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const filtered = users.filter(
    (user) =>
      onlyDate(user.dateOfRequest) >= onlyDate(filter.dateFrom) &&
      onlyDate(user.dateOfRequest) <= onlyDate(filter.dateTo) &&
      user.timeOfRequest === filter.time
  );

  console.log(filtered);
};

// Task 2.2
const getUserByMaxDetails = () => {
  const user = users.reduce((maxUser, currentUser) =>
    currentUser.detailsLength > maxUser.detailsLength ? currentUser : maxUser
  );

  console.log(
    `Target User: length: ${user.detailsLength}, age: ${user.age}, education: ${user.education}`
  );
};

// Task 2.3
const arrangeUsersByType = () => {
  const stats = {
    activeMiddleAge: 0,
    passiveSenior: 0,
    other: 0,
  };

  users.forEach((user) => {
    const age = user.age;
    const month = user.dateOfRequest.getMonth();

    const isSummer = SUMMER.includes(month);
    const isMiddleAge = age >= MIDDLE_AGE.min && age <= MIDDLE_AGE.max;

    if (isMiddleAge && !isSummer) {
      stats.activeMiddleAge++;
    } else if (isSummer) {
      stats.passiveSenior++;
    } else {
      stats.other++;
    }
  });

  console.log(
    `Active Middle Age Users (${stats.activeMiddleAge}), 
    Passive Senior Users (${stats.passiveSenior}),
    Other Users (${stats.other})`
  );
};

// Task 2.4
const listUsersWithBirthDate = () => {
  const currentYear = new Date().getFullYear();

  const sortedUsers = [...users].sort((firstUser, secondUser) => {
    const surnameComprasion = firstUser.surname.localeCompare(
      secondUser.surname
    );
    const nameComparison = firstUser.name.localeCompare(secondUser.name);

    return surnameComprasion == 0 ? nameComparison : surnameComprasion;
  });

  const mappedUsers = sortedUsers.map((user) => ({
    ...user,
    dateOfBirth: currentYear - user.age,
  }));

  console.log(mappedUsers);
};

export const main = () => {
  const config = new MenuConfig([
    new TaskConfig({
      id: 1,
      name: "List users By certain date and time",
      run: () => {
        const filter = new Filter({
          dateFrom: new Date("2025-09-09"),
          dateTo: new Date("2025-10-09"),
          time: "08:00",
        });
        console.log(
          `Filter: dateFrom${filter.dateFrom.getDate()}, dateTo: ${filter.dateTo.getDate()}, time: ${
            filter.time
          }`
        );
        listUsersByDate(filter);
      },
    }),
    new TaskConfig({
      id: 2,
      name: "Get user with max details length. Retrive their age and education",
      run: getUserByMaxDetails,
    }),
    new TaskConfig({
      id: 3,
      name: "Group users by type and count",
      run: arrangeUsersByType,
    }),
    new TaskConfig({
      id: 4,
      name: "Sort users by name and calculate their birthdays",
      run: listUsersWithBirthDate,
    }),
  ]);

  config.run();
};
