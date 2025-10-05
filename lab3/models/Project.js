export class Project {
  constructor({ id = crypto.randomUUID(), name = "", country = "", team = "", duration = "", cost = 0 }) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.team = team; 
    this.duration = duration;
    this.cost = cost; 
  }
}
