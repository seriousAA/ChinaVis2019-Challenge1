data=load('timedist_merge8.csv');
H=120000;
res=zeros(H,3);
cnt=1;
[h,w]=size(data);
for i=1:h
    t1=data(i,1);
    [temp,ix]=sort(data(i,2:1:end));
    thistime=1;
    for j=1:w-1
        if ix(j)==i
            continue;
        end
        t2=data(ix(j),1);
        x=temp(j);
        if x>0 && x<1000
            res(cnt,1)=t1;
            res(cnt,2)=t2;
            res(cnt,3)=x;
            if thistime>=10
                break;
            end
            cnt=cnt+1;
            thistime=thistime+1;
        end
    end
    i
end
cnt
length(res);
res_table=table(res(:,1),res(:,2),res(:,3),'VariableNames',{'source','target','value'});
writetable(res_table,'timedist_links9.csv');