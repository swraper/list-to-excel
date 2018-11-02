# list-to-excel

> A npm component project

## Build Setup

## 说明

    该项目为list导出为后缀为.xlsx的excel表格插件，其中string可通过download导出为txt文件。

## 使用
> npm install list-to-excel --save

# 导出excel
    import {tableToExcel,download} from list-to-excel;

    const nav = [{
        key:'id'
    },{
        key:'name'
    },{
        key:'age'
    }];

    const data = [{
        id:'id_0001',
        name:'tom',
        age:'26'
    },{
        id:'id_0001',
        name:'lucy',
        age:'23'
    }]

    tableToExcel(nav,data,'实例表格导出');

# 导出txt

    const str = '这是一个文本文档实例。';

    download(str,'文本文档');

# Github地址：(https://github.com/swraper/tableToExcel.git).
# npm地址：(https://www.npmjs.com/package/list-to-excel).

# version 1.0.0
    excel导出，支持单文件最大6000条list数据，多余6000条的数据会进入第二个excel文件，因此，可支持大量数据，多文件导出。



