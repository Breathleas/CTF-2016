s1="sorry,please try again!\n"
s2="Congratulation! you got a right flag!\n"
check1=[0x72,0x65,0x74,0x73,0x74,0x24,0x79,0x67,0x5e,0x5e,0x66,0x5c,0x17,0x6a,0x65]
check2=[0x40,0x6a,0x6b,0x63,0x75,0x6c,0x77,0x79,0x77,0x6f,0x81,0x79,0x74,0x7a,0x30]
flag=""

for i in range(15):
    flag_low=(check1[i]+i)^ord(s1[i])
    flag_high=(check2[i]-i)^ord(s2[i])
    print i
    print "flag_low",flag_low
    print "flag_high",flag_high
    flag += chr(flag_high*16+flag_low)
print flag    
