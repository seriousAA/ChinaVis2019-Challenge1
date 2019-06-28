data=load('toandfrom_day3.txt');
[h,w]=size(data);
Person_cnt=[3564,4434,2930];
P=Person_cnt(3);%此处填入人员的个数
cid=cell(P);
cur_id=data(1,1);
cnt=1;
cid{cnt}=data(1,:);
for i=2:h
    if data(i,1)==cur_id
        cid{cnt}=[cid{cnt};data(i,:)];
    else
        cur_id=data(i,1);
        cnt=cnt+1;
        cid{cnt}=data(i,:);
    end
end
start_time=450;%此处填入最早的时间
end_time=752;%此处填入最晚的时间
span=end_time-start_time+2;
time_pos=zeros(P,span);
for i=1:P
    pre=1;
    time_pos(i,1)=cid{i}(1,1);
    for j=2:span
        t=j+start_time-2;
        [h,w]=size(cid{i});
        if cid{i}(pre,6)>t
            if pre==1
                time_pos(i,j)=0;
            else
                time_pos(i,j)=cid{i}(pre,5);
            end
        else
            time_pos(i,j)=cid{i}(pre,5);
            pre=pre+1;
            if pre>h break;
            end
        end
    end
end
res_table=table(time_pos);
writetable(res_table,'timetrack_day3_label4.txt');