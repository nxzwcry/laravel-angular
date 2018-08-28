import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import {CacheService} from "@delon/cache";

@Injectable()
export class DictionaryService {

  private sexList = [
    {label: "男", value: 1},
    {label: "女", value: 2},
  ];
  private gradeList = [
    {label: "学龄前0", value: 0},
    {label: "学龄前1", value: 1},
    {label: "学龄前2", value: 2},
    {label: "学龄前3", value: 3},
    {label: "学龄前4", value: 4},
    {label: "学龄前5", value: 5},
    {label: "学龄前6", value: 6},
    {label: "一年级", value: 7},
    {label: "二年级", value: 8},
    {label: "三年级", value: 9},
    {label: "四年级", value: 10},
    {label: "五年级", value: 11},
    {label: "六年级", value: 12},
    {label: "初一", value: 13},
    {label: "初二", value: 14},
    {label: "初三", value: 15},
    {label: "高一", value: 16},
    {label: "高二", value: 17},
    {label: "高三", value: 18},
    {label: "成人", value: 19},
  ];

  constructor(private http: _HttpClient, private cacheService: CacheService) { }

  getSex(index: number){
    this.sexList.forEach(item => {
      if (item.value == index){
        return item.label;
      }
    });
    return "未定义";
  }

  getGrade(index: number){
    this.gradeList.forEach(item => {
      if (item.value == index){
        return item.label;
      }
    });
    return "成人";
  }

  getSexList(){
    return this.sexList;
  }

  getGradeList(){
    return this.gradeList;
  }

  getCteacherList() : Observable<any> {
    return this.cacheService.get('/cteachers', {mode: 'promise', type: 'm'});
  }

  getAgentList() : Observable<any> {
    return this.cacheService.get('/agents', {mode: 'promise', type: 'm'});
  }

  getRoleList() : Observable<any> {
    return this.cacheService.get('/roles', {mode: 'promise', type: 'm'});
  }

  getStudentList() : Observable<any> {
    return this.http.get('/agents' );
  }

  clear(){
    this.cacheService.clear();
  }

}
