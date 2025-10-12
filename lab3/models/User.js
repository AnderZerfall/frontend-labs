export class User {
  #id;

  constructor({
    id = crypto.randomUUID(),
    name = "",
    surname = "",
    age = 0,
    education = "",
    detailsLength = 0,
    dateOfRequest = new Date(),
    timeOfRequest = "00:00",
  }) {
    this.#id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.education = education;
    this.detailsLength = detailsLength;
    this.dateOfRequest = dateOfRequest;
    this.timeOfRequest = timeOfRequest;
  }

  getId() {
    return this.#id;
  }
}
