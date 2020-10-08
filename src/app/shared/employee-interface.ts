/*
Title: WEB450 NodeBucket
Author: Professor Krasso
Date: October 2020
Modified By: Kimberly Pierce
Description: NodeBucket
*/

import { Item } from "./item.interface";

export interface Employee{
    empId: string;
    todo: Item[];
    done: Item[];
}