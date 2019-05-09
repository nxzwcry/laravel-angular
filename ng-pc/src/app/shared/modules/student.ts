
export class Student {
  /**
   *
   * @param {number} id
   * @param {string} ename
   * @param {string} name
   * @param {number} cteacher_user_id
   * @param {number} agent_user_id
   * @param {any} sex
   * @param {any} grade
   */

  age: number;
  lessonstage: string;
  agent: string;
  cteacher: string;
  team: string;
  score: number;
  waijiaocost: number;
  waijiaototal: number;
  zhongjiaocost: number;
  zhongjiaototal: number;
  jingpincost: number;
  jingpintotal: number;
  email: string;
  address: string;
  phones: any[];
  desc: string;
  newlessons: any[];
  courses: any[];
  oldlessons: any[];
  recharges: any[];

  constructor(
    public id: number,
    public ename: string,
    public name: string,
    public cteacher_user_id: number,
    public agent_user_id: number,
    public sex: any,
    public grade: any,
  ){  }
}