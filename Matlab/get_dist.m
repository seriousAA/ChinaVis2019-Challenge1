data=cell(3);
data{1}=load('timetrack_day1.txt');
data{2}=load('timetrack_day2.txt');
data{3}=load('timetrack_day3.txt');
filter=zeros(21505,1);
H=10000;
dist=zeros(H,H+5);
for D=1:3
[h,w]=size(data{D});
for i=1:h
    for j=i+1:h
        cnt=0;
        for k=2:w
            if data{D}(i,k)~=data{D}(j,k)
                cnt=cnt+1;
            end
        end
        t1=data{D}(i,1)-H+1;
        t2=data{D}(j,1)-H+1;
        dist(t1,1)=t1+H-1;
        dist(t2,1)=t2+H-1;
        dist(t1,t2+1)=dist(t1,t2+1)+cnt;
        dist(t2,t1+1)=dist(t1,t2+1);
    end
    D
    i
end
end
res_table=table(dist);
writetable(res_table,'timedist_H_3.csv');
s1=load('s1.csv');
s2=load('s2.csv');
s3=load('s3.csv');
f1=load('f1.csv');
f2=load('f2.csv');
f3=load('f3.csv');
[hs1,ws1]=size(s1);
[hs2,ws2]=size(s2);
[hs3,ws3]=size(s3);
[hf1,wf1]=size(f1);
[hf2,wf2]=size(f2);
[hf3,wf3]=size(f3);
for i=1:hs1
    t1=s1(i,1)-H+1;
    x=s1(i,2);
    for j=1:hf1
        t2=f1(j)-H+1;
        dist(t1,t2+1)=dist(t1,t2+1)+x;
        dist(t2,t1+1)=dist(t1,t2+1);
    end
end
for i=1:hs2
    t1=s2(i,1)-H+1;
    x=s2(i,2);
    for j=1:hf2
        t2=f2(j)-H+1;
        dist(t1,t2+1)=dist(t1,t2+1)+x;
        dist(t2,t1+1)=dist(t1,t2+1);
    end
end
for i=1:hs3
    t1=s3(i,1)-H+1;
    x=s3(i,2);
    for j=1:hf3
        t2=f3(j)-H+1;
        dist(t1,t2+1)=dist(t1,t2+1)+x;
        dist(t2,t1+1)=dist(t1,t2+1);
    end
end
fin=table(dist);
writetable(fin,'timedist_merge7.csv');