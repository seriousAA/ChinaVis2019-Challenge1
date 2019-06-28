import json

fo=open("timedist_links9.csv","r")
ls=[]
for line in fo:
    line=line.replace("\n","")
    ls.append(line.split(","))
fo.close()  #关闭文件流
fw=open("graph6.json","w")  #打开json文件
for i in range(1,len(ls)):  #遍历文件的每一行内容，除了列名
    for j in range(0,len(ls[i])):
        ls[i][j]=int(ls[i][j])
    ls[i]=dict(zip(ls[0],ls[i]))
    #zip()是一个内置函数，将两个长度相同的列表组合成一个关系对
json.dump(ls[1:],fw)
#将Python数据类型转换成json格式，编码过程
# 默认是顺序存放，sort_keys是对字典元素按照key进行排序
#indet参数用语增加数据缩进，使文件更具有可读性
fw.close()