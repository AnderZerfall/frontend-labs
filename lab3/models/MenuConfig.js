export class TaskConfig {
  constructor({ id = 1, name = "", run = () => {} }) {
    this.id = id;
    this.name = name;
    this.run = run;
  }
}

export class MenuConfig {
  constructor(tasks = [new TaskConfig()]) {
    this.tasks = tasks;
  }

  run() {
    this.tasks.forEach((task) => {
      console.log(`[===========================================]`);
      console.log(`--- Task ${task.id} ---`);
      console.log(`${task.name} ---`);
      console.log(`--- Result ---`);
      task.run();
      console.log(`[===========================================]`);
    });
  }
}
