class Computer {
  constructor(ramMemory, cpuGHz, hddMemory) {
    this.ramMemory = ramMemory;
    this.cpuGHz = cpuGHz;
    this.hddMemory = hddMemory;
    this.taskManager = [];
    this.installedPrograms = [];
  }

  installAProgram(name, requiredSpace) {
    if (requiredSpace > this.hddMemory) {
      throw new Error("There is not enough space on the hard drive");
    }
    let newProgram = { name, requiredSpace };
    this.hddMemory -= requiredSpace;
    this.installedPrograms.push(newProgram);
    return newProgram;
  }

  uninstallAProgram(name) {
    let foundProgram = this.installedPrograms.find(x => x.name === name);
    if (!foundProgram) {
      throw new Error("Control panel is not responding");
    }
    this.hddMemory += foundProgram.requiredSpace;
    this.installedPrograms = this.installedPrograms.filter(
      x => x !== foundProgram
    );
    return this.installedPrograms;
  }

  openAProgram(name) {
    let foundProgram = this.installedPrograms.find(x => x.name === name);
    if (!foundProgram) {
      throw new Error(`The ${name} is not recognized`);
    }

    if (this.taskManager.find(x => x.name === name)) {
      throw new Error(`The ${name} is already open`);
    }

    let newOpenedProgram = {
      name,
      ramUsage: (1.5 * foundProgram.requiredSpace) / this.ramMemory,
      cpuUsage: (foundProgram.requiredSpace / this.cpuGHz / 500) * 1.5
    };
    this.taskManager.push(newOpenedProgram);
    if (this.taskManager.reduce((a, b) => a + b.ramUsage, 0) >= 100) {
      throw new Error(`${name} caused out of memory exception`);
    }
    if (this.taskManager.reduce((a, b) => a + b.cpuUsage, 0) >= 100) {
      throw new Error(`${name} caused out of cpu exception`);
    }

    return newOpenedProgram;
  }

  taskManagerView() {
    if (this.taskManager.length === 0) {
      return "All running smooth so far";
    }

    return this.taskManager
      .map(
        x =>
          `Name - ${x.name} | Usage - CPU: ${x.cpuUsage.toFixed(
            0
          )}%, RAM: ${x.ramUsage.toFixed(0)}%`
      )
      .join("\n");
  }
}

let computer = new Computer(4096, 7.5, 250000);

computer.installAProgram("Word", 7300);
computer.installAProgram("Excel", 10240);
computer.installAProgram("PowerPoint", 12288);
computer.installAProgram("Solitare", 1500);

computer.openAProgram("Word");
computer.openAProgram("Excel");
computer.openAProgram("PowerPoint");
computer.openAProgram("Solitare");

console.log(computer.taskManagerView());
