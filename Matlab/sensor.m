data=load('sensor.txt');
[h,w]=size(data);
res=[data(:,1),zeros(h,1)];
for i=1:h
    floor=data(i,2);
    x=data(i,3);
    y=data(i,4);
    if floor==1 && 13<=x && x<14 && 2<=y && y<6
        res(i,2)=1;%res(i,3)='签到处';
    else if floor==1 && 2<=x && x<4 && 1<=y && y<6
            res(i,2)=2;%res(i,3)='分会场A';
       else if floor==1 && 4<=x && x<6 && 1<=y && y<6
            res(i,2)=3;%res(i,3)='分会场B';
        else if floor==1 && 6<=x && x<8 && 1<=y && y<6
            res(i,2)=4;%res(i,3)='分会场C';
        else if floor==1 && 8<=x && x<10 && 1<=y && y<6
            res(i,2)=5;%res(i,3)='分会场D';
        else if floor==1 && 3<=x && x<10 && 7<=y && y<9
                res(i,2)=6;%res(i,3)='海报区';
            else if floor==1 && 6<=x && x<10 && 10<=y && y<12
                    res(i,2)=7;%res(i,3)='room1';
                else if floor==1 && 10<=x && x<12 && 10<=y && y<12
                    res(i,2)=8;%res(i,3)='room2';
                else if floor==1 && 14<=x && x<16 && 21<=y && y<25
                        res(i,2)=9;%res(i,3)='room3';
                    else if floor==1 && 14<=x && x<16 && 25<=y && y<27
                        res(i,2)=10;%res(i,3)='room4';
                    else if floor==1 && (4<=x && x<6 && 10<=y && y<12 || 14<=x && x<16 && 27<=y && y<29)
                            res(i,2)=11;%res(i,3)='一楼厕所';
                        else if (1<=x && x<2 || 14<=x && x<15) && 10<=y && y<12
                                res(i,2)=12;%res(i,3)='扶梯';
                            else if floor==1 && 14<=x && x<16 && 19<=y && y<21
                                    res(i,2)=13;%res(i,3)='服务台';
                                else if floor==1 && 2<=x && x<12 && 15<=y && y<19
                                        res(i,2)=14;%res(i,3)='展厅';
                                    else if floor==1 && 2<=x && x<12 && 19<=y && y<29
                                            res(i,2)=15;%res(i,3)='主会场';
                                        else if floor==2 && 13<=x && x<16 && 0<=y && y<6
                                                res(i,2)=18;%res(i,3)='休闲区';
                                            else if floor==2 && 10<=x && x<12 && 1<=y && y<6
                                                    res(i,2)=19;%res(i,3)='room5';
                                                else if floor==2 && 2<=x && x<10 && 1<=y && y<6
                                                        res(i,2)=20;%res(i,3)='餐厅';
                                                    else if floor==2 && 6<=x && x<8 && 10<=y && y<12
                                                            res(i,2)=21;%res(i,3)='room6';
                                                        else if floor==2 && 4<=x && x<6 && 10<=y && y<12
                                                                res(i,2)=22;%res(i,3)='二楼厕所';
                                                           else if res(i,1)==11301||res(i,1)==11402||res(i,1)==11404||res(i,1)==11405||res(i,1)==11407||res(i,1)==11415||res(i,1)==11417||res(i,1)==10119
                                                                res(i,2)=16;%res(i,3)='保安';
                                                               else if floor==1 && 12<=x && x<13 && 2<=y && y<6
                                                                       res(i,2)=17;%res(i,3)='签到工作人员';
                                                                   else
                                                                       res(i,2)=23;%res(i,3)='走廊';
                                                            end
                                                        end
                                                    end
                                                end
                                            end
                                        end
                                    end
                                end
                            end
                        end
                    end
                end
            end
        end
    end
                end
            end
            end
            end
           end
        end
    end
end
various={'sid','label'};
result_table=table(res(:,1),res(:,2),'VariableNames',various);
writetable(result_table,'coord2pos2.csv');
