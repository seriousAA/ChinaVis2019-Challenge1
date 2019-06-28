import csv
csv_file=csv.reader(open('3333.csv'))
#10019 21505
sid = []
for i in range(10019,21506):
	sid.append(i)
out=open('day3.csv','a',newline='')
csv_write = csv.writer(out,dialect='excel')
csv_write.writerow(sid)
print('write')
for data in csv_file:
	csv_write.writerow(data)
print('over!')
