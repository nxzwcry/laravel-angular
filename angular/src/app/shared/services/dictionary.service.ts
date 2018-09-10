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
  private lessonTypeList = [
    {label: "外教课", value: 'w'},
    {label: "中教课", value: 'f'},
    {label: "精品课", value: 'j'},
  ];
  private dowList = [
    {label: "周一", value: 'MONDAY'},
    {label: "周二", value: 'TUESDAY'},
    {label: "周三", value: 'WEDNESDAY'},
    {label: "周四", value: 'THURSDAY'},
    {label: "周五", value: 'FRIDAY'},
    {label: "周六", value: 'SATURDAY'},
    {label: "周日", value: 'SUNDAY'},
  ];
  private lessonStatusList = [
    {label: "未上", value: 0},
    {label: "已上", value: 1},
    {label: "待确认", value: 2},
    {label: "请假", value: 3},
    {label: "旷课", value: 4},
  ];

  constructor(private http: _HttpClient, private cacheService: CacheService) { }

  getSex(index: number){
    for(let item of this.sexList){
      if (item.value == index){
        return item.label;
      }
    }
    return "未定义";
  }

  getLessonStatus(index: number){
    for(let item of this.lessonStatusList){
      if (item.value == index){
        return item.label;
      }
    }
    return "未定义";
  }

  getGrade(index: number){
    for(let item of this.gradeList){
      if (item.value == index){
        return item.label;
      }
    }
    return "成人";
  }

  getDow(index: string){
    for(let item of this.dowList){
      if (item.value == index){
        return item.label;
      }
    }
    return "未定义";
  }

  getSexList(){
    return this.sexList;
  }

  getDowList(){
    return this.dowList;
  }

  getGradeList(){
    return this.gradeList;
  }

  getLessonTypeList(){
    return this.lessonTypeList;
  }

  getLessonStatusList(){
    return this.lessonStatusList;
  }

  getCteacherList() : Observable<any> {
    return this.cacheService.get('/cteachers', {mode: 'promise', type: 'm', expire: 1200});
  }


  getFteacherList() : Observable<any> {
    return this.cacheService.get('/fteachers', {mode: 'promise', type: 'm', expire: 1200});
  }

  getAgentList() : Observable<any> {
    return this.cacheService.get('/agents', {mode: 'promise', type: 'm', expire: 1200});
  }

  getRoleList() : Observable<any> {
    return this.cacheService.get('/roles', {mode: 'promise', type: 'm', expire: 1200});
  }

  getPlaceList() : Observable<any> {
    return this.cacheService.get('/places', {mode: 'promise', type: 'm', expire: 1200});
  }

  getStudentList() : Observable<any> {
    return this.http.get('/agents' );
  }

  clear(){
    this.cacheService.clear();
  }

}
