a="TW5650Y - 0TS UZ50S S0V LZW UZ50WKW 9505KL4G 1X WVMUSL510 S001M0UWV 910VSG S0 WFLW0K510 1X LZW54 WF5KL50Y 2S4L0W4KZ52 L1 50U14214SLW X5L0WKK S0V TSK7WLTS88 VWNW8129W0L 50 W8W9W0LS4G, 95VV8W S0V Z5YZ KUZ118K SU41KK UZ50S.LZW S001M0UW9W0L ESK 9SVW SL S K5Y050Y UW4W910G L1VSG TG 0TS UZ50S UW1 VSN5V KZ1W9S7W4 S0V FM LS1, V54WUL14 YW0W4S8 1X LZW 50LW40SL510S8 U112W4SL510 S0V WFUZS0YW VW2S4L9W0L 1X LZW 9505KL4G 1X WVMUSL510.\
EW S4W WFU5LWV L1 T41SVW0 1M4 2S4L0W4KZ52 E5LZ LZW 9505KL4G 1X WVMUSL510 L1 9S7W S 810Y-8SKL50Y 592SUL 10 LZW 85NWK 1X UZ50WKW KLMVW0LK LZ41MYZ S 6150L8G-VWK5Y0WV TSK7WLTS88 UM445UM8M9 S0V S E5VW 4S0YW 1X KUZ118 TSK7WLTS88 241Y4S9K, KS5V KZ1W9S7W4. LZ5K U1995L9W0L 9S47K S01LZW4 958WKL10W 50 LZW 0TS'K G1MLZ S0V TSK7WLTS88 VWNW8129W0L WXX14LK 50 UZ50S. X8SY { YK182V9ZUL9STU5V}"


for i in range(65,91):
    try:
        a.index(chr(i))
    except Exception:
        print chr(i)
        
    
b = "ABCDHIJOPQR"
temp = ""
for i in b:
    temp += chr(65+(ord(i)-65-18)%26)
print temp
data = ""
for i in a:
    if i == 'E':
        data += 'W'
    elif i == 'F':
        data += 'X'
    elif i == 'G':
        data += 'Y'
    elif i >= 'A' and i <= 'Z':
        data += chr(65+(ord(i)-65-18)%26)
    elif i == '1':
        data += 'O'
    elif i == '2':
        data += 'P'
    elif i == '4':
        data += 'R'
    elif i == '5':
        data += 'I'
    elif i == '6':
        data += 'J'
    elif i == '7':
        data += 'K'
    elif i == '8':
        data += 'L'
    elif i == '9':
        data += 'M'
    elif i == '0':
        data += 'N'
    else:
        data += i
print data
