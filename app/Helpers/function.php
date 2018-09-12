<?php

function numToWeek($dow){
    switch ($dow)
    {
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2:
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        case 6:
            return "周六";
    }
}

function lessonType($type){
    switch ($type)
    {
        case 'w':
            return "外教课";
        case 'b':
            return "班课";
        case 'f':
            return "中教课";
        case 'j':
            return "精品课";
        case 'bu':
            return "补课";
        case 's':
            return "试听";
        case 'bt':
            return "班课";
    }
}