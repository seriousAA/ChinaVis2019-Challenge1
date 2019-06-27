
function getRadar(id,key) {
    if(key===0) {
        key=10000;
    }
    var dom = document.getElementById(id);
    var myChart1 = echarts.init(dom);
    option = null;
    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };
    $.getJSON('radar.json',function (data) {
        var idcr=[],data_k=[];
        for(var i=0;i<data.length;i++)
        {
            if(data[i].id===key)
            {
                idcr[0]=new Object();
                idcr[0].name=data[i].pos_1+"（1）";
                idcr[0].max=25;
                data_k[0]=data[i].stay_1/3600;
                idcr[1]=new Object();
                idcr[1].name=data[i].pos_2+"（2）";
                idcr[1].max=7;
                data_k[1]=data[i].stay_2/3600;
                idcr[2]=new Object();
                idcr[2].name=data[i].pos_3+"（3）";
                idcr[2].max=5;
                data_k[2]=data[i].stay_3/3600;
                if(data[i].pos_4=="#N/A")
                    break;
                idcr[3]=new Object();
                idcr[3].name=data[i].pos_4+"（4）";
                idcr[3].max=3;
                data_k[3]=data[i].stay_4/3600;
                idcr[4]=new Object();
                idcr[4].name=data[i].pos_5+"（5）";
                idcr[4].max=3;
                data_k[4]=data[i].stay_5/3600;
                break;
            }
        }
        var t=0;
        console.log(data_k);
        console.log(idcr);
        option = {
            // visualMap: {
            //     show: true,
            //     min: 0,
            //     max: 20,
            //     dimension: 6,
            //     inRange: {
            //         colorLightness: [0.5, 0.8]
            //     }
            // },
            radar: {
                indicator: idcr,
                shape: 'circle',
                radius: '80%',
                splitNumber: 5,
                tooltip: {trigger: 'axis'},
                name: {
                    textStyle: {
                        color: 'rgb(238, 197, 102)'
                    },
                    rich: {
                        a: {
                        },
                        b: {
                            color: '#fff',
                            align: 'center',
                            backgroundColor: '#666',
                            padding: 2,
                            borderRadius: 4
                        }
                    },
                    formatter: (a,b)=>{
                        var arr=[0,25,7,5,3,3];
                        t++;
                        return `{b|${arr[t]}} {a|${a}}`;
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                        ].reverse()
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(238, 197, 102, 0.5)'
                    }
                }
            },
            series: [
                {
                    type: 'radar',
                    lineStyle: lineStyle,
                    data: [{
                        value: data_k,
                        label: {
                            normal: {
                                show: true,
                                formatter:function(params) {
                                    return params.value.toFixed(1);
                                }
                            }
                        }
                    }],
                    symbol: 'circle',
                    symbolSize: 5,
                    itemStyle: {
                        normal: {
                            color: '#F9713C'
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.1
                        }
                    }
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart1.clear();
            myChart1.setOption(option, true);
        }
    })
}