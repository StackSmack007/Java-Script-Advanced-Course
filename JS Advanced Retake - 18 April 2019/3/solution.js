class Organization {
  constructor(name, budget) {
    this.name = name;
    this.budget = budget;
    this.employees = [];
  }

  get budget() {
    return this._budget;
  }
  set budget(value) {
    this._budget = value;
  }

  _workersCost(dep) {
    return this.employees
      .filter(x => x.department === dep)
      .reduce((a, b) => a + b.salary, 0);
  }

  get departmentsBudget() {
    return {
      marketing: 0.4 * this.budget - this._workersCost("marketing"),
      finance: 0.25 * this.budget - this._workersCost("finance"),
      production: 0.35 * this.budget - this._workersCost("production")
    };
  }

  add(employeeName, department, salary) {
    if (this.departmentsBudget[department] < salary) {
      return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departmentsBudget[department]}.`;
    }

    this.employees.push({
      employeeName,
      department,
      salary
    });

    return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`;
  }

  _getWorker(employeeName) {
    let employeeFound = this.employees.find(
      x => x.employeeName === employeeName
    );
    if (typeof employeeFound === "undefined") {
      return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
    }
    return employeeFound;
  }

  employeeExists(employeeName) {
    let employeeFound = this._getWorker(employeeName);
    if (typeof employeeFound === "string") {
      return employeeFound;
    }
    return `Mr./Mrs. ${employeeName} is part of the ${employeeFound.department} department.`;
  }

  leaveOrganization(employeeName) {
    let employeeFound = this._getWorker(employeeName);
    if (typeof employeeFound === "string") {
      return employeeFound;
    }

    this.employees = this.employees.filter(x => x !== employeeFound);
    return `"It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}." `;
  }

  status() {
    let info = Object.entries(this.departmentsBudget)
      .map(dep => {
        let employees = this.employees
          .slice()
          .filter(x => x.department === dep[0])
          .sort((a, b) => b.salary - a.salary);
        return `${dep[0]} | Employees: ${employees.length}:${employees
          .map(x =>" "+ x.employeeName)
          .join(",")} | Remaining Budget: ${dep[1]}`;
      })
      .join("\n");
    return `${this.name.toUpperCase()} DEPARTMENTS: \n` + info;
  }
}

let organization = new Organization("SoftUni", 20000);

console.log(organization.add("Peter", "marketing", 1200));
console.log(organization.add("Robert1", "production", 2003));
console.log(organization.add("Robert2", "production", 2002));
console.log(organization.add("Robert3", "production", 2001));
//console.log(organization.leaveOrganization("Peter"));
console.log(organization.status());
