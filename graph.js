var getRelation=function(id,key){
    if(key===0) {
        key=10000;
    }
    var dom = document.getElementById(id);
    var myCharts = echarts.init(dom);
    var app = {};
    option = null;
    $.get('graph5.json',function(links){
        console.log(links);
        $.get('graph_dist.json', function (webkitDep) {
            console.log(webkitDep);
            var nds=webkitDep.nodes;
            var ids=webkitDep.ids;
            var res_links=new Array();
            var res_nodes=[];
            res_nodes[0]=nds[ids[key]];
            res_nodes[0].value=100;
            console.log(res_nodes);
            var ncnt=1;
            var lcnt=0;
            var central=0;
            for(var q=0;q<20;q++){
                if(q>=res_nodes.length) break;
                if(q===1) central=ncnt;
                var cnt=0;
                for(var i=0;i<links.length;i++) {
                    if(links[i].source===res_nodes[q].name) {
                        var flag_n=true,flag_l=true;
                        for(var j=0;j<res_nodes.length;j++)
                        {
                            if(links[i].target===res_nodes[j].name)
                            {
                                flag_n=false;
                                if(j<q) flag_l=false;
                                break;
                            }
                        }
                        if(!flag_l) continue;
                        var temp=new Object();
                        temp.source=links[i].source;
                        temp.target=links[i].target;
                        temp.value=links[i].value;
                        var lsty=new Object();
                        if(temp.value<71) {//比其他90%的人关系要近
                            lsty.color='#c3151b';
                        }
                        else if(temp.value<441){//比50%的人关系要近
                            lsty.color='#c3c3c3';
                        }
                        else if(temp.value<790){//比20%的人关系要近
                            lsty.color='#4993c3';
                        }
                        else {
                            lsty.color='#2028c3';
                        }
                        temp.lineStyle=lsty;
                        res_links.push(temp);
                        lcnt++;
                        cnt++;
                        if(!flag_n) continue;
                        res_nodes[ncnt]=nds[ids[links[i].target]];
                        ncnt++;
                        if(cnt>10) break;
                    }
                }
            }
            // for(var i=1;i<central;i++)
            // {
            //     for(var j=0;j<links.length;j++) {
            //         if(links[j].source!==res_nodes[i].name) continue;
            //         for(var k=i+1;k<res_nodes.length;k++) {
            //             if(links[j].target===res_nodes[k].name) {
            //                 // var temp=new Object();
            //                 // temp.source=links[j].source;
            //                 // temp.target=links[j].target;
            //                 // temp.value=links[j].value;
            //                 // res_links.push(temp);
            //                 // lcnt++;
            //             }
            //         }
            //     }
            // }
            var nodes_id=new Object();
            for(var i=0;i<res_nodes.length;i++)
            {
                res_nodes[i].id=i;
                nodes_id[res_nodes[i].name]=i;
            }
            for(var i=0;i<res_links.length;i++)
            {
                res_links[i].source=nodes_id[res_links[i].source];
                res_links[i].target=nodes_id[res_links[i].target];
            }
            option = {
                legend: {
                    type: 'scroll',
                    data: ['服务台', '保安', '迎宾人员','签到处', '参会人员', '专家大咖','晚宴嘉宾','黑客大赛服务','展厅服务','会场服务','黑客大赛选手','酒店主管'],
                    textStyle: {
                        color: '#c3c3c3'
                    }
                },
                series: [{
                    type: 'graph',
                    layout: 'force',
                    animation: false,
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    legendHoverLink: true,
                    draggable: true,
                    roam: 'scale',
                    symbolSize: (value,params) => {
                        if(value===100) return 30;
                        else return 10;
                    },
                    focusNodeAdjacency: true,
                    symbol: 'circle',
                    data: res_nodes.map(function(node){
                        return node;
                    }),
                    categories: webkitDep.categories,
                    force: {
                        initLayout: 'circular',
                        // repulsion: 20,
                        edgeLength: [90,15],
                        repulsion: 25,
                        gravity: 0.2
                    },lineStyle: {
                        width: 2,
                        opacity: 0.5
                    },
                    itemStyle: {
                        borderColor: '#a6ab9e',
                        borderWidth: 1,
                        opacity: 1
                    },
                    edges: res_links,
                    color: ['#af4744','#5d4c66', '#668e9a', '#d48265', '#91c7ae','#3c8a78',  '#ca8622', '#afbd6a','#536069', '#668543', '#d8e0e7','#265e7f']
                }]
            };
            if (option && typeof option === "object") {
                myCharts.clear();
                myCharts.setOption(option, true);
            }
        });
    });
}