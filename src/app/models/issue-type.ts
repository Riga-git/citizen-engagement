export class IssueType {
    readonly id: string;
    readonly href: string;
    name: string;
    description?: string;

    constructor(name : string = ""){
      this.name = name;
    }
  }