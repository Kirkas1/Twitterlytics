#!/usr/bin/python3
# -*- coding: utf-8 -*-
# Author: Ian Kirk
# Date: 11/11/15
# Description: For CMSC491 Big Data project to get rid of superfluous data gathered 
import string

exclude = set(string.punctuation)
origFile = open('HopkinsTweetStream.txt', encoding = "ISO-8859-1")
newFile = open('hopkinsFixed.txt', 'w')

for line in origFile:
        afterSplit = line.split('|')
        afterFilter = ''.join(filter(lambda x: x in string.printable, afterSplit[2]))
        afterPunFilter = ''.join(ch for ch in afterFilter if ch not in exclude)
        if afterPunFilter:
                newFile.write(afterPunFilter + "\n")	
