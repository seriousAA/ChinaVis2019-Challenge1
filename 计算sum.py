# import csv
# csv_file=csv.reader(open('2019年数据可视分析挑战赛-挑战1-数据/传感器日志数据/day3.csv'))
# print(csv_file)
# #689755 64858 21505
# sum=[]
# sum1=[]
# id=[]
# for i in range(11487):
# 	sum1.append(0)
# for i in range(18095):
# 	sum.append(sum1[:])
# for i in range(20000):
# 	id.append(0)
# last_time=0
# time=0
# for data in csv_file:
# 	if(data[0]=='id'):
# 		continue
# 	data[0]=int(data[0])
# 	data[1]=int(data[1])-10019
# 	data[2]=int(data[2])-27070
# 	if data[2]==last_time:
# 		sum[data[2]][data[1]]+=1
# 		if(id[data[0]]!=0):
# 			sum[data[2]][id[data[0]]]-=1
# 		id[data[0]]=data[1]
# 	else:
# 		for i in range(last_time,data[2]):
# 			for j in range(11487):
# 				sum[i+1][j]=sum[last_time][j]
# 		sum[data[2]][data[1]]+=1
# 		if(id[data[0]]!=0):
# 			sum[data[2]][id[data[0]]]-=1
# 		id[data[0]]=data[1]
# 		last_time=data[2]
# print('output')
# out=open('sum_day3.csv','a',newline='')
# csv_write = csv.writer(out,dialect='excel')
# for i in range(0,18094):
# 	csv_write.writerow(sum[i])
# print('over!')

import csv
csv_file=csv.reader(open('2019年数据可视分析挑战赛-挑战1-数据/传感器日志数据/day3.csv'))
print(csv_file)
#689755 64858 21505
sum=[]
sum1=[]
id=[]
for i in range(11487):
	sum1.append(0)
for i in range(18095):
	sum.append(sum1[:])
for i in range(20000):
	id.append(0)
last_time=0
time=0
for data in csv_file:
	if(data[0]=='id'):
		continue
	data[0]=int(data[0])
	data[1]=int(data[1])-10019
	data[2]=int(data[2])-27070
	if data[2]==last_time:
		sum[data[2]][data[1]]+=1
		if(id[data[0]]!=0):
			sum[data[2]][id[data[0]]]-=1
		id[data[0]]=data[1]
	else:
		for i in range(last_time,data[2]):
			for j in range(11486):
				sum[i+1][j]=sum[last_time][j]
		sum[data[2]][data[1]]+=1
		if(id[data[0]]!=0):
			sum[data[2]][id[data[0]]]-=1
		id[data[0]]=data[1]
		last_time=data[2]
print('output')
out=open('sum_day3_new.csv','a',newline='')
csv_write = csv.writer(out,dialect='excel')
for i in range(0,45043):
	csv_write.writerow(sum[i])
print('over!')