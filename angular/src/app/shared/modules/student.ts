
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