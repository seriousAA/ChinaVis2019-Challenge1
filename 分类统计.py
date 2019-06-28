import xlrd
import csv
attend_id=[]
book=xlrd.open_workbook('人员移动频次.xlsx')
book2=xlrd.open_workbook('停留时间.xlsx')
csv_file=csv.reader(open('参会人员.csv'))
for data in csv_file:
    if data[0]=='id':
        continue
    attend_id.append(int(data[0]))
print('0')
sheet=book2.sheets()[1]
sheet1=book.sheets()[0]
sheet2=book.sheets()[1]
sheet3=book.sheets()[2]
sheet4=book.sheets()[3]
id_day1=[]
id_day2=[]
id_day3=[]
id_sum=[]
dict={}
for i in range(1,sheet1.nrows):
    id_day1.append(sheet1.row_values(i)[0])
for i in range(1,sheet2.nrows):
    id_day2.append(sheet2.row_values(i)[0])
for i in range(1,sheet3.nrows):
    id_day3.append(sheet3.row_values(i)[0])
for i in range(len(id_day1)):
    id_sum.append([id_day1[i],1])
for i in range(len(id_day2)):
    flag=0
    for j in range(len(id_sum)):
        if(id_sum[j][0]==id_day2[i]):
            id_sum[j][1]=4
            flag=1
            break
    if(flag!=1):
        id_sum.append([id_day2[i],2])
for i in range(len(id_day3)):
    flag=0
    for j in range(len(id_sum)):
        if(id_sum[j][0]==id_day3[i]):
            id_sum[j][1]=4
            flag=1
            break
    if(flag!=1):
        id_sum.append([id_day3[i],3])
print('1')
for i in range(sheet.nrows):
    for j in range(len(id_sum)):
        if(id_sum[j][0]==sheet.row_values(i)[0]):
            id_sum[j].extend(sheet.row_values(i)[1:3])
            break
print('2')
out=open('id_label.csv','a',newline='')
csv_writer=csv.writer(out,dialect='excel')
for i in range(1,sheet4.nrows):
    dict[sheet4.row_values(i)[0]]=int(sheet4.row_values(i)[1])
print('3')
for i in range(len(id_sum)):
    if(id_sum[i][0] in attend_id):
        a=id_sum[i]
        a.extend([a[1]*10000+dict[a[2]]*100+dict[a[3]]])
        csv_writer.writerow(a)

dict2={}
for i in range(len(id_sum)):
    if (id_sum[i][0] in attend_id):
        dict2[id_sum[i][4]] = 0

for i in range(len(id_sum)):
    if (id_sum[i][0] in attend_id):
        dict2[id_sum[i][4]] = dict2[id_sum[i][4]] + 1

out2=open('leave_weight.csv','a',newline='')
csv_writer2=csv.writer(out2,dialect='excel')
for i in dict2:
    csv_writer2.writerow([i,dict2[i]])
print(id_sum)

