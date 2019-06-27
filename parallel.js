var lb2pos={"0.5":"主会场","1.5":"分会场A","2.5":"分会场B","3.5":"分会场C","4.5":"分会场D","5.5":"展厅","6.5":"海报区","7.5":"一楼厕所","8.5":"签到处","9.5":"服务台","10.5":"room1","11.5":"room2","12.5":"room3","13.5":"room4","14.5":"room5","15.5":"room6","16.5":"签到管理","17.5":"餐厅","18.5":"二楼厕所","19.5":"走廊","20.5":"扶梯","21.5":"保安","22.5":"休闲区"};
function showSelected(){
    var option=myChart.getOption();
    console.log(option["legend"][0]["selected"]);
    var html='<table border="1"><tr><td>id</td><td>frequency</td><td>deviation</td><td>staytime</td><td>arrive</td><td>leave</td><td>position1</td><td>position2</td><td>position3</td><td>day</td></tr>';
    if(option["legend"][0]["selected"]["day1"]!==false){
        for(var i=0;i<indices0.length;i++)
        {
            html+='<tr><td>'+data_1[indices0[i]][0]+'</td><td>'+data_1[indices0[i]][1]+'</td><td>'+data_1[indices0[i]][2]+'</td>';
            html+='<td>'+data_1[indices0[i]][3]+'</td><td>'+data_1[indices0[i]][9]+'</td><td>'+data_1[indices0[i]][10]+'</td><td>'+data_1[indices0[i]][6]+'</td><td>'+lb2pos[data_1[indices0[i]][7]]+'</td><td>'+lb2pos[data_1[indices0[i]][8]]+'</td>';
            html+='<td>day1</td></tr>';
        }
    }
    if(option["legend"][0]["selected"]["day2"]!==false){
        for(var i=0;i<indices1.length;i++)
        {
            html+='<tr><td>'+data_2[indices1[i]][0]+'</td><td>'+data_2[indices1[i]][1]+'</td><td>'+data_2[indices1[i]][2]+'</td>';
            html+='<td>'+data_2[indices1[i]][3]+'</td><td>'+data_2[indices1[i]][9]+'</td><td>'+data_2[indices1[i]][10]+'</td><td>'+data_2[indices1[i]][6]+'</td><td>'+lb2pos[data_2[indices1[i]][7]]+'</td><td>'+lb2pos[data_2[indices1[i]][8]]+'</td>';
            html+='<td>day2</td></tr>';
        }
    }
    if(option["legend"][0]["selected"]["day3"]!==false){
        for(var i=0;i<indices2.length;i++)
        {
            html+='<tr><td>'+data_3[indices2[i]][0]+'</td><td>'+data_3[indices2[i]][1]+'</td><td>'+data_3[indices2[i]][2]+'</td>';
            html+='<td>'+data_3[indices2[i]][3]+'</td><td>'+data_3[indices2[i]][9]+'</td><td>'+data_3[indices2[i]][10]+'</td><td>'+data_3[indices2[i]][6]+'</td><td>'+lb2pos[data_3[indices2[i]][7]]+'</td><td>'+lb2pos[data_3[indices2[i]][8]]+'</td>';
            html+='<td>day3</td></tr>';
        }
    }
    html+='</table>';
    layer.open({
        type: 1 //Page层类型
        ,area: ['800px', '600px']
        ,title: 'Data'
        ,shade: 0.6 //遮罩透明度
        ,maxmin: true //允许全屏最小化
        ,anim: 1 //0-6的动画形式，-1不开启
        ,content: html
    });
}
function json2array(datasrc,x){
    var data=[];
    var cnt=0;
    for(var i=0;i<datasrc.length;i++)
    {
        if(x!==0&&x!==datasrc[i]["id"]) continue;
        var temp=[];
        temp[0]=datasrc[i]["id"];
        temp[1]=datasrc[i]["frequency"];
        temp[2]=datasrc[i]["deviation"];
        temp[3]=datasrc[i]["staytime-top1(h)"];
        temp[4]=datasrc[i]["arrive"];
        temp[5]=datasrc[i]["leave"];
        temp[6]=datasrc[i]["pos1"];
        temp[7]=datasrc[i]["pos2"];
        temp[8]=datasrc[i]["pos3"];
        temp[9]=datasrc[i]["a"];
        temp[10]=datasrc[i]["l"];
        data[cnt++]=temp;
    }
    return data;
}
var indices0=[],indices1=[],indices2=[],data_1=[],data_2=[],data_3=[];
var getParallel=function(one){
    $.getJSON("day1.json",function(datasrc_1){
        $.getJSON("day2.json",function(datasrc_2){
            $.getJSON("day3.json",function(datasrc_3){
                data_1=json2array(datasrc_1,one);
                data_2=json2array(datasrc_2,one);
                data_3=json2array(datasrc_3,one);
                console.log(data_1);
                var app = {};
                option = null;

                var schema = [
                    {name: 'frequency', index: 0, text: '频次'},
                    {name: 'deviation', index: 1, text: '标准差'},
                    {name: 'staytime', index: 2, text: '最长停留时间'},
                    {name: 'arrive', index: 3, text: '到达时间'},
                    {name: 'leave', index: 4, text: '离开时间'},
                    {name: 'pos1', index: 5, text: '地点1'},
                    {name: 'pos2', index: 6, text: '地点2(label)'},
                    {name: 'pos3', index: 7, text: '地点3(label)'}
                ];

                var lineStyle = {
                    normal: {
                        width: 1,
                        opacity: 0.5
                    }
                };
                option = {
                    color: [
                        '#c23531', '#91c7ae', '#dd8668'
                    ],
                    legend: {
                        top: 10,
                        data: ['day1', 'day2', 'day3'],
                        itemGap: 20,
                        textStyle: {
                            color: '#fff',
                            fontSize: 14
                        }
                    },
                    parallelAxis: [
                        {dim: 1, name: schema[0].text, inverse:true, nameLocation:'start'},
                        {dim: 2, name: schema[1].text, maxInterval: 1000},
                        {dim: 3, name: schema[2].text, maxInterval: 1.0},
                        {dim: 4, name: schema[3].text, type: 'value', max: 18, min: 6, maxInterval: 1.0},
                        {dim: 5, name: schema[4].text, type: 'value', max: 21, min: 8, maxInterval: 1.0},
                        {dim: 6, name: schema[5].text, type: 'category', data: ['主会场','分会场A','分会场B','分会场C','分会场D','展厅','海报区','一楼厕所','签到处','服务台','room1','room2','room3','room4','room5','room6','签到管理','餐厅','二楼厕所','走廊','扶梯','保安','休闲区']},
                        {dim: 7, name: schema[6].text, type: 'value', maxInterval: 1, max: 23, axisLabel:{verticalAlign:'top'}}
                    ],
                    parallel: {
                        left: '5%',
                        right: '13%',
                        bottom: '10%',
                        top: '20%',
                        parallelAxisDefault: {
                            nameGap: 20,
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 12
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#aaa'
                                }
                            },
                            axisTick: {
                                lineStyle: {
                                    color: '#777'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: 'day1',
                            type: 'parallel',
                            smooth: true,
                            lineStyle: lineStyle,
                            inactiveOpacity:0.0,
                            activeOpacity:1,
                            data: data_1,
                        },
                        {
                            name: 'day2',
                            type: 'parallel',
                            smooth: true,
                            lineStyle: lineStyle,
                            inactiveOpacity:0.0,
                            activeOpacity:1,
                            data: data_2
                        },
                        {
                            name: 'day3',
                            type: 'parallel',
                            smooth: true,
                            lineStyle: lineStyle,
                            inactiveOpacity:0.0,
                            activeOpacity:1,
                            data: data_3
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                myChart.on('axisareaselected', function () {
                    var series0 = myChart.getModel().getSeries()[0];
                    var series1 = myChart.getModel().getSeries()[1];
                    var series2 = myChart.getModel().getSeries()[2];
                    indices0 = series0.getRawIndicesByActiveState('active');
                    indices1 = series1.getRawIndicesByActiveState('active');
                    indices2 = series2.getRawIndicesByActiveState('active');
                    console.log(indices0);
                });
            })
        })
    })
};