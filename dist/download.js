const tableToExcel = (nav, data, Sheet) => {
    //要导出的列标题、json数据
    let items = [];
    if (data.length > 6000) {
        const num = parseInt(data.length / 6000);
        console.log(num, items);
        for (let i = 0; i < num; i++) {
            items = data.slice(6000 * i, 6000 * (i + 1));
            new toExcel(nav, items, Sheet);
        }
        items = data.slice(6000 * num, data.length);
        new toExcel(nav, items, Sheet);
    } else {
        items = data;
        new toExcel(nav, items, Sheet);
    }

};

const toExcel = (nav, data, Sheet) => {
    const str = creatNav(nav) + createBody(nav, data);
    const uri = 'data:application/vnd.ms-excel;base64,';

    let template = createTemp(nav, data, Sheet, str);

    const stap = base64(template);
    //下载模板
    getDom(uri, stap, Sheet, template);
}

const getDom = (uri, stap, Sheet, template) => {
    if (stap) {
        // console.log(stap);
        const dom = document.createElement('a');
        const body = document.querySelector('body');
        dom.id = 'dlink';
        dom.style = 'display:none';
        body.appendChild(dom);

        const down = document.getElementById('dlink');
        down.href = uri + stap;
        down.download = Sheet + '.xls';

        down.click();

        setTimeout(() => {
            body.removeChild(down);
        }, 3000)
    } else {
        setTimeout(() => {
            getDom(uri, stap, Sheet, template);
        }, 100);
    }
};

const createTemp = (nav, data, Sheet, str) => {
    if (!str) {
        setTimeout(() => {
            createTemp(nav, data, Sheet, str);
        }, 100);
    } else {
        //下载的表格模板数据
        return `<html xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:x="urn:schemas-microsoft-com:office:excel"
        xmlns="http://www.w3.org/TR/REC-html40">
        <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${Sheet}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            </head><body><table>${str}</table></body></html>`;
    }
};

//输出base64编码
const base64 = (s) => {
    return window.btoa(unescape(encodeURIComponent(s)))
};

const creatNav = (nav) => {
    let str = '<tr>';
    nav.map((item, index) => {
        if (item.title && item.key) {
            str += `<td>${item.title}</td>`;
        }
    });
    str += '</tr>';
    return str;
};
const createBody = (nav, data) => {
    let str = '';
    for (const type of data) {
        str += '<tr>';
        nav.map((item, index) => {
            if (item.key == 'imgUrl' && type.imgurlArrer) {
                str += `<td>${type.imgurlArrer[0]}</td>`;
            } else if (type[item.key] && item.key != 'imgUrl') {
                //增加\t为了不让表格显示科学计数法或者其他格式
                str += `<td>${type[item.key] + '\t'}</td>`;
            } else {
                str += `<td></td>`;
            }
        });
        str += '</tr>';
    }
    return str;
};

//导出
const Download = (content, filename)=> { // 创建隐藏的可***链接
    let eleLink = document.createElement('a');
    eleLink.download = filename + '.txt';
    eleLink.style.display = 'none'; // 字符内容转变成blob地址
    const blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob); // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click(); // 然后移除
    document.body.removeChild(eleLink);
};

export { tableToExcel, Download };
