from pprint import pprint
import csv
from os import listdir

direc = "./exports/2011/"
files = listdir(direc)

j = 0
data = []
for filename in files:
    if '.csv' in filename:
        j += 1
        statename = filename.split('.')[0].split('_')[1].strip()
        pprint(statename)
        filepath = direc + filename
        with open(filepath,'r+') as f:
            reader = csv.reader(f)
            i = 0
            for row in reader:
                i += 1
                if (i < 4):
                    continue
                if len(row) > 2:
                    if j == 1 and (i == 4 or i == 5):
                    # if j == 1 and (i == 4):
                        d = ['State']
                        for el in row:
                            d.append(el)
                        data.append(d)
                    else:
                        # if (row[0] == 'Note: Upto District Level'):
                        if (row[0] == 'Total'):
                            d = [statename]
                            for el in row:
                                d.append(el)
                            data.append(d) 
                            break
                        d = [statename]
                        for el in row:
                            d.append(el)
                        data.append(d)        

with open('export_2011.csv','w+') as f:
    writer = csv.writer(f)
    for row in data:
        writer.writerow(row)