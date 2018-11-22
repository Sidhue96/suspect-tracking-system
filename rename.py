import os
"""path = '/Users/myName/Desktop/directory'"""
path = '/home/sidhue/Documents/Suspect Tracking System/Suspect '
files = os.listdir(path)
i = 0

for file in files:
    os.rename(os.path.join(path, file), os.path.join(path,'subject02.'+str(i)+'.jpg'))
    i = i+1
